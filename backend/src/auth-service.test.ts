import { loginUser, registerUser } from "./auth-service";
import bcrypt from "bcryptjs";

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
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

  it("should return 400 if the user does not exist", async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [] });
    
    const result = await loginUser("nonexistent@example.com", "password123", mockPool, mockSession);
    
    expect(result).toEqual({ status: 400, json: { message: "Invalid email/password" } });
  });

  it("should return 400 if the password is incorrect", async () => {
    const hashedPassword = await bcrypt.hash("correctpassword", 10);
    const mockUser = { id: 1, username: "testuser", email: "test@example.com", password: hashedPassword };
    mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });

    const result = await loginUser("test@example.com", "wrongpassword", mockPool, mockSession);
    
    expect(result).toEqual({ status: 400, json: { message: "Invalid email/password" } });
  });

  it("should return 200 and set session if credentials are correct", async () => {
    const hashedPassword = await bcrypt.hash("correctpassword", 10);
    const mockUser = { id: 1, username: "testuser", email: "test@example.com", password: hashedPassword };
    mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });
    
    const result = await loginUser("test@example.com", "correctpassword", mockPool, mockSession);
    
    expect(result).toEqual({ status: 200, json: { user: "testuser" } });
    expect(mockSession.user).toEqual({ id: 1, username: "testuser", email: "test@example.com" });
  });

  it("should return 500 on server error", async () => {
    mockPool.query.mockRejectedValueOnce(new Error("Database error"));
    
    const result = await loginUser("test@example.com", "password123", mockPool, mockSession);
    
    expect(result).toEqual({ status: 500, json: { message: "Server error" } });
  });
});

describe("registerUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return 400 if any field is missing", async () => {
        const response = await registerUser("", "test@example.com", "password", mockPool);
        expect(response).toEqual({
          status: 400,
          json: { message: "Username, email, and password are required" },
        });
    });

    it("should return 400 if the user already exists", async () => {
        (mockPool.query as jest.Mock).mockResolvedValueOnce({ rows: [{}] });
        
        const response = await registerUser("testuser", "test@example.com", "password", mockPool);
        
        expect(response).toEqual({
            status: 400,
            json: { message: "User already exists" },
        });
        expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE email = $1", ["test@example.com"]);
    });

    it("should return 201 and register a user successfully", async () => {
        (mockPool.query as jest.Mock)
            .mockResolvedValueOnce({ rows: [] }) // First call (checking if user exists)
            .mockResolvedValueOnce({ rows: [{ id: 1, username: "testuser", email: "test@example.com" }] });
        
        const response = await registerUser("testuser", "test@example.com", "password", mockPool);
        
        expect(response).toEqual({
            status: 201,
            json: {
              user: { id: 1, username: "testuser", email: "test@example.com" },
            },
        });
        expect(mockPool.query).toHaveBeenCalledTimes(2);
    });

    it("should return 500 on server error", async () => {
        (mockPool.query as jest.Mock).mockRejectedValue(new Error("Database error"));
        
        const response = await registerUser("testuser", "test@example.com", "password", mockPool);
        
        expect(response).toEqual({
            status: 500,
            json: { message: "Server error" },
        });
    });
});