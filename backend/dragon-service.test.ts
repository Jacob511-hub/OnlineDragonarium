import { getDragons, initializeTraits } from "./dragon-service";

const mockPool = {
    query: jest.fn(),
};

describe("getDragons", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return dragons with their elements", async () => {
        const mockDragons = [
          { id: 1, name: "Fire" },
          { id: 2, name: "Water" },
        ];
    
        const mockElements = [
          { dragon_id: 1, element: "Fire" },
          { dragon_id: 2, element: "Water" },
        ];
    
        mockPool.query
          .mockResolvedValueOnce({ rows: mockDragons }) // First query response (dragons)
          .mockResolvedValueOnce({ rows: mockElements }); // Second query response (elements)
    
        const result = await getDragons(mockPool);
    
        expect(mockPool.query).toHaveBeenCalledTimes(2);
        expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM dragons");
        const normalizeQuery = (query: string) => query.replace(/\s+/g, ' ').trim();

        expect(normalizeQuery(mockPool.query.mock.calls[1][0])).toBe(
            normalizeQuery(`SELECT de.dragon_id, e.name AS element 
                FROM dragon_elements de
                JOIN elements e ON de.element_id = e.id
                WHERE de.dragon_id = ANY($1)`)
        );
        expect(result).toEqual({
          status: 200,
          json: [
            { id: 1, name: "Fire", elements: ["Fire"] },
            { id: 2, name: "Water", elements: ["Water"] },
          ],
        });
      });
    
      it("should return an empty elements array if no elements are found", async () => {
        const mockDragons = [{ id: 1, name: "Fire" }];
    
        mockPool.query
          .mockResolvedValueOnce({ rows: mockDragons }) // First query response (dragons)
          .mockResolvedValueOnce({ rows: [] }); // Second query response (no elements)
    
        const result = await getDragons(mockPool);
    
        expect(mockPool.query).toHaveBeenCalledTimes(2);
        expect(result).toEqual({
          status: 200,
          json: [{ id: 1, name: "Fire", elements: [] }],
        });
      });
    
      it("should return a 500 error if a database error occurs", async () => {
        mockPool.query.mockRejectedValue(new Error("Database error"));
    
        const result = await getDragons(mockPool);
    
        expect(mockPool.query).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
          status: 500,
          json: { message: "Failed to fetch dragons with elements" },
        });
      });
});

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