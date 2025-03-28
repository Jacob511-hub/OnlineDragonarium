const getDragons = async (pool) => {
    try {
        const dragonsResult = await pool.query("SELECT * FROM dragons");
        const dragons = dragonsResult.rows;
    
        const dragonIds = dragons.map((d) => d.id);
    
        // Get all elements related to these dragons
        const elementsResult = await pool.query(
          `SELECT de.dragon_id, e.name AS element 
           FROM dragon_elements de
           JOIN elements e ON de.element_id = e.id
           WHERE de.dragon_id = ANY($1)`,
          [dragonIds]
        );
    
        const elementsMap = elementsResult.rows.reduce((acc, row) => {
          if (!acc[row.dragon_id]) acc[row.dragon_id] = [];
          acc[row.dragon_id].push(row.element);
          return acc;
        }, {});
    
        // Attach elements to each dragon
        const dragonsWithElements = dragons.map((dragon) => ({
          ...dragon,
          elements: elementsMap[dragon.id] || [],
        }));
    
        return { status: 200, json: dragonsWithElements };
    } catch (err) {
        console.error(err);
        return { status: 500, json: { message: "Failed to fetch dragons with elements" } };
    }
};

const initializeTraits = async (userId, dragonIds, traitIds, pool) => {
    try {
        for (const dragonId of dragonIds) {
          for (const traitId of traitIds) {
            if (userId) {
              await pool.query(
                `INSERT INTO user_traits (user_id, dragon_id, trait_id, unlocked)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (user_id, dragon_id, trait_id) DO NOTHING`,
                [userId, dragonId, traitId, false]
              );
            } else {
              continue;
            }
          }
        }
    
        return { status: 200, json: { message: "Traits initialized successfully" } };
    } catch (err) {
        console.error(err.message);
        return { status: 500, json: { message: "Server error" } };
    }
};

export { getDragons, initializeTraits };