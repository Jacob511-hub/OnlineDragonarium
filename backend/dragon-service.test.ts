import { getDragons, getTraits, initializeTraits, getUserTraits, setUserTraits, patchUserTraits } from "./dragon-service";

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
      expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM dragons ORDER BY id ASC");
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

describe("getTraits", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return traits from the database", async () => {
      const mockTraits = [{ id: 1, name: "Fire" }, { id: 2, name: "Water" }];
      mockPool.query.mockResolvedValueOnce({ rows: mockTraits });

      const result = await getTraits(mockPool);

      expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM traits");
      expect(result).toEqual({ status: 200, json: mockTraits });
    });

    it("should handle database errors gracefully", async () => {
      mockPool.query.mockRejectedValue(new Error("DB error"));

      const result = await getTraits(mockPool);

      expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM traits");
      expect(result).toEqual({ status: 500, json: { error: "Server Error" } });
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

describe("getUserTraits", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user traits if user_id matches session user_id", async () => {
    const mockRows = [{ id: 1, trait: "Fire" }];
    mockPool.query.mockResolvedValueOnce({ rows: mockRows });

    const result = await getUserTraits("1", "101", "201", 1, mockPool);

    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM user_traits"),
      ["1", "101", "201"]
    );
    expect(result).toEqual({ status: 200, json: mockRows });
  });

  it("should return 403 if user_id does not match session user_id", async () => {
    const result = await getUserTraits("1", "101", "201", 2, mockPool);

    expect(mockPool.query).not.toHaveBeenCalled();
    expect(result).toEqual({ status: 403, json: { error: "Unauthorized access" } });
  });

  it("should return 404 if no traits are found", async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [] });

    const result = await getUserTraits("1", "101", "201", 1, mockPool);

    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM user_traits"),
      ["1", "101", "201"]
    );
    expect(result).toEqual({ status: 404, json: { message: "Trait not found" } });
  });

  it("should return 500 on database error", async () => {
    mockPool.query.mockRejectedValue(new Error("DB error"));

    const result = await getUserTraits("1", "101", "201", 1, mockPool);

    expect(mockPool.query).toHaveBeenCalled();
    expect(result).toEqual({ status: 500, json: { message: "Server error" } });
  });
});

describe("setUserTraits", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set user traits successfully", async () => {
    const mockRows = [{ id: 1, trait: "Fire" }];
    mockPool.query.mockResolvedValueOnce({ rows: mockRows });

    const result = await setUserTraits("1", "101", "201", true, mockPool);

    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO user_traits"),
      ["1", "101", "201", true]
    );
    expect(result).toEqual({ status: 201, json: mockRows[0] });
  });

  it("should return 400 if required fields are missing", async () => {
    const result = await setUserTraits(null, "101", "201", true, mockPool);

    expect(mockPool.query).not.toHaveBeenCalled();
    expect(result).toEqual({ status: 400, json: { message: "Missing required fields" } });
  });

  it("should return 500 on database error", async () => {
    mockPool.query.mockRejectedValue(new Error("DB error"));

    const result = await setUserTraits("1", "101", "201", true, mockPool);

    expect(mockPool.query).toHaveBeenCalled();
    expect(result).toEqual({ status: 500, json: { message: "Server error" } });
  });
});

describe("patchUserTraits", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should patch user traits successfully", async () => {
    const mockRows = [{ id: 1, trait: "Fire" }];
    mockPool.query.mockResolvedValueOnce({ rows: mockRows });

    const result = await patchUserTraits("1", "101", "201", true, mockPool);

    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE user_traits"),
      [true, "1", "101", "201"]
    );
    expect(result).toEqual({ status: 200, json: mockRows[0] });
  });

  it("should return 404 if trait entry is not found", async () => {
    mockPool.query.mockResolvedValueOnce({ rowCount: 0 });

    const result = await patchUserTraits("1", "101", "201", true, mockPool);

    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE user_traits"),
      [true, "1", "101", "201"]
    );
    expect(result).toEqual({ status: 404, json: { message: "Trait entry not found" } });
  });
  
  it("should return 500 on database error", async () => {
    mockPool.query.mockRejectedValue(new Error("DB error"));

    const result = await patchUserTraits("1", "101", "201", true, mockPool);

    expect(mockPool.query).toHaveBeenCalled();
    expect(result).toEqual({ status: 500, json: { message: "Server error" } });
  });
});