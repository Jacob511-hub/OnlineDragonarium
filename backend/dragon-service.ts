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

export { initializeTraits };