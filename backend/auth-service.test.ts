import { loginUser, registerUser } from "./auth-service";
import bcrypt from "bcrypt";

// Mock dependencies
const mockPool = {
  query: jest.fn(),
};

interface MockSession {
    user?: {
      id: number;
      username: string;
      email: string;
    };
}

const mockSession: MockSession = {};

describe("loginUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if the user does not exist", async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [] });
    
    const result = await loginUser("nonexistent@example.com", "password123", mockPool, bcrypt, mockSession);
    
    expect(result).toEqual({ status: 400, json: { message: "Invalid email/password" } });
  });

  it("should return 400 if the password is incorrect", async () => {
    const mockUser = { id: 1, username: "testuser", email: "test@example.com", password: "hashedPassword" };
    mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });
    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);
    
    const result = await loginUser("test@example.com", "wrongpassword", mockPool, bcrypt, mockSession);
    
    expect(result).toEqual({ status: 400, json: { message: "Invalid email/password" } });
  });

  it("should return 200 and set session if credentials are correct", async () => {
    const mockUser = { id: 1, username: "testuser", email: "test@example.com", password: "hashedPassword" };
    mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });
    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
    
    const result = await loginUser("test@example.com", "correctpassword", mockPool, bcrypt, mockSession);
    
    expect(result).toEqual({ status: 200, json: { message: "Login successful", user: "testuser" } });
    expect(mockSession.user).toEqual({ id: 1, username: "testuser", email: "test@example.com" });
  });

  it("should return 500 on server error", async () => {
    mockPool.query.mockRejectedValueOnce(new Error("Database error"));
    
    const result = await loginUser("test@example.com", "password123", mockPool, bcrypt, mockSession);
    
    expect(result).toEqual({ status: 500, json: { message: "Server error" } });
  });
});

describe("registerUser", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return 400 if any field is missing", async () => {
        const response = await registerUser("", "test@example.com", "password", mockPool, bcrypt);
        expect(response).toEqual({
          status: 400,
          json: { message: "Username, email, and password are required" },
        });
      });
    
      it("should return 400 if the user already exists", async () => {
        (mockPool.query as jest.Mock).mockResolvedValueOnce({ rows: [{}] });
        
        const response = await registerUser("testuser", "test@example.com", "password", mockPool, bcrypt);
        
        expect(response).toEqual({
          status: 400,
          json: { message: "User already exists" },
        });
        expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE email = $1", ["test@example.com"]);
      });
    
      it("should return 201 and register a user successfully", async () => {
        (mockPool.query as jest.Mock).mockResolvedValueOnce({ rows: [] }); // No existing user
        (mockPool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: 1, username: "testuser", email: "test@example.com" }] });
        jest.spyOn(bcrypt, "genSalt").mockResolvedValue("fakeSalt");
        jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
        
        const response = await registerUser("testuser", "test@example.com", "password", mockPool, bcrypt);
        
        expect(response).toEqual({
          status: 201,
          json: {
            message: "User registered successfully",
            user: { id: 1, username: "testuser", email: "test@example.com" },
          },
        });
        expect(mockPool.query).toHaveBeenCalledTimes(2);
        expect(bcrypt.hash).toHaveBeenCalledWith("password", "fakeSalt");
      });
    
      it("should return 500 on server error", async () => {
        (mockPool.query as jest.Mock).mockRejectedValue(new Error("Database error"));
        
        const response = await registerUser("testuser", "test@example.com", "password", mockPool, bcrypt);
        
        expect(response).toEqual({
          status: 500,
          json: { message: "Server error" },
        });
      });
});