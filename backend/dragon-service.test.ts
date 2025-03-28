import { initializeTraits } from "./dragon-service";

const mockPool = {
    query: jest.fn(),
};

describe("initializeTraits", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should insert traits for each dragon when userId is provided", async () => {
        mockPool.query.mockResolvedValue({});

        const userId = 1;
        const dragonIds = [101, 102];
        const traitIds = [201, 202];

        const result = await initializeTraits(userId, dragonIds, traitIds, mockPool);

        expect(mockPool.query).toHaveBeenCalledTimes(4);
        expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO user_traits"),
        expect.any(Array)
        );
        expect(result).toEqual({ status: 200, json: { message: "Traits initialized successfully" } });
    });

    it("should not insert traits if userId is not provided", async () => {
        const result = await initializeTraits(null, [101], [201], mockPool);

        expect(mockPool.query).not.toHaveBeenCalled();
        expect(result).toEqual({ status: 200, json: { message: "Traits initialized successfully" } });
    });

    it("should handle database errors gracefully", async () => {
        mockPool.query.mockRejectedValue(new Error("DB error"));

        const result = await initializeTraits(1, [101], [201], mockPool);

        expect(mockPool.query).toHaveBeenCalled();
        expect(result).toEqual({ status: 500, json: { message: "Server error" } });
    });
});  