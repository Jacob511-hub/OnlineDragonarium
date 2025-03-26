import { loginUser } from "./auth-service";
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
