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

const getTraits = async (pool) => {
  try {
    const result = await pool.query('SELECT * FROM traits');
    return { status: 200, json: result.rows };
  } catch (error) {
    console.error('Error fetching traits:', error);
    return { status: 500, json: { error: 'Server Error' } };
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

const getUserTraits = async (user_id, dragon_id, trait_id, userIdSession, pool) => {
  if (!userIdSession || user_id !== String(userIdSession)) {
    return { status: 403, json: { error: "Unauthorized access" } };
  }

  try {
    const result = await pool.query(
      `SELECT * FROM user_traits WHERE user_id = $1 AND dragon_id = $2 AND trait_id = $3`,
      [user_id, dragon_id, trait_id]
    );

    if (result.rows.length > 0) {
      return { status: 200, json: result.rows }; // Return the trait data for this user, dragon, and trait
    } else {
      return { status: 404, json: { message: "Trait not found" } };
    }
  } catch (err) {
    console.error('Error fetching user trait:', err);
    return { status: 500, json: { message: "Server error" } };
  }
};

const setUserTraits = async (user_id, dragon_id, trait_id, unlocked, pool) => {
  // Check if all required fields are provided
  if (!user_id || !dragon_id || !trait_id || unlocked === undefined) {
    return { status: 400, json: { message: 'Missing required fields' } };
  }

  try {
    // Query to insert the new record into the user_traits table
    const result = await pool.query(`
      INSERT INTO user_traits (user_id, dragon_id, trait_id, unlocked)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [user_id, dragon_id, trait_id, unlocked]);

    // Send the created record as a JSON response
    return { status: 201, json: result.rows[0] };
  } catch (err) {
    console.error('Error inserting user trait:', err);
    return { status: 500, json: { message: 'Server error' } };
  }
};

const patchUserTraits = async (user_id, dragon_id, trait_id, unlocked, pool) => {
  try {
    const query = `
        UPDATE user_traits 
        SET unlocked = $1 
        WHERE user_id = $2 AND dragon_id = $3 AND trait_id = $4
        RETURNING *;
    `;

    const result = await pool.query(query, [unlocked, user_id, dragon_id, trait_id]);

    if (result.rowCount === 0) {
      return { status: 404, json: { message: "Trait entry not found" } };
    }

    return { status: 200, json: result.rows[0] };
} catch (err) {
    console.error('Error updating trait state:', err);
    return { status: 500, json: { message: 'Server error' } };
}
};

const getUserDragonTraits = async (user_id, dragon_id, userIdSession, pool) => {
  if (!userIdSession || user_id !== String(userIdSession)) {
    return { status: 403, json: { error: "Unauthorized access" } };
  }

  try {
    const result = await pool.query(
      `SELECT * FROM user_traits WHERE user_id = $1 AND dragon_id = $2`,
      [user_id, dragon_id]
    );

    if (result.rows.length > 0) {
      return { status: 200, json: result.rows };
    } else {
      return { status: 404, json: { message: "Dragon not found" } };
    }
  } catch (err) {
    console.error('Error fetching user trait:', err);
    return { status: 500, json: { message: "Server error" } };
  }
};

export { getDragons, getTraits, initializeTraits, getUserTraits, setUserTraits, patchUserTraits, getUserDragonTraits };