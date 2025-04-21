import path from 'path';
import { promises as fsPromises } from 'fs';
import { send } from 'process';

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

const getDragonImages = async (imageDirectory, imageFileName) => {
  try {
      const filePath = path.join(imageDirectory, `${imageFileName}`);
      try {
        await fsPromises.access(filePath);
        return { found: true, filePath };
      } catch {
        // File not found, try next extension
      }

      return { status: 404, json: { message: "Image not found" } };
  } catch (error) {
      console.error('Error serving image:', error);
      return { status: 500, json: { message: 'Server error' } };
  }
};

const addDragons = async (name, can_be_traited, is_only_traited, elements, pool) => {
  try {
    const image = name.replace(/ /g, '_') + '.webp';
    const query = `
      INSERT INTO dragons (id, name, can_be_traited, is_only_traited, image)
      VALUES (
        DEFAULT,
        $1,
        $2,
        $3,
        $4
      )
      RETURNING *;
    `;

    const result = await pool.query(query, [name, can_be_traited, is_only_traited, image]);
    const newDragon = result.rows[0];

    // Insert elements into dragon_elements table
    for (const element of elements) {
      await pool.query(
        `INSERT INTO dragon_elements (dragon_id, element_id) VALUES ($1, $2)`,
        [newDragon.id, element]
      );
    }

    return { status: 201, json: result.rows[0] };
  } catch (err) {
    console.error('Error adding dragon:', err);
    return { status: 500, json: { message: 'Server error' } };
  }
};

const initializeCounts = async (userId, dragonIds, pool) => {
  if (!userId) {
    return { status: 200, json: { message: 'User not logged in' } };
  }

  try {
      for (const dragonId of dragonIds) {
        if (userId) {
          await pool.query(
            `INSERT INTO user_dragons (user_id, dragon_id, normal_count, traited_count, twin_count, traited_twin_count)
              VALUES ($1, $2, $3, $4, $5, $6)
              ON CONFLICT (user_id, dragon_id) DO NOTHING`,
            [userId, dragonId, 0, 0, 0, 0]
          );
        } else {
          continue;
        }
      }
  
      return { status: 200, json: { message: "Dragon counts initialized successfully" } };
  } catch (err) {
      console.error(err.message);
      return { status: 500, json: { message: "Server error" } };
  }
};

const getUserCounts = async (user_id, dragon_id, userIdSession, pool) => {
  if (!userIdSession || user_id !== String(userIdSession)) {
    return { status: 403, json: { error: "Unauthorized access" } };
  }

  try {
    const result = await pool.query(
      `SELECT * FROM user_dragons WHERE user_id = $1 AND dragon_id = $2`,
      [user_id, dragon_id]
    );

    if (result.rows.length > 0) {
      return { status: 200, json: result.rows }; // Return the count data for this user and dragon
    } else {
      return { status: 404, json: { message: "Dragon not found" } };
    }
  } catch (err) {
    console.error('Error fetching user dragons:', err);
    return { status: 500, json: { message: "Server error" } };
  }
};

const patchUserCounts = async (user_id, dragon_id, count_normal, count_traited, count_twin, count_traited_twin, pool) => {
  try {
    const query = `
        UPDATE user_dragons
        SET normal_count = $1,
            traited_count = $2,
            twin_count = $3,
            traited_twin_count = $4
        WHERE user_id = $5 AND dragon_id = $6
        RETURNING *;
    `;

    const result = await pool.query(query, [count_normal, count_traited, count_twin, count_traited_twin, user_id, dragon_id]);

    if (result.rowCount === 0) {
      return { status: 404, json: { message: "Dragon entry not found" } };
    }

    return { status: 200, json: result.rows[0] };
  } catch (err) {
      console.error('Error updating dragon count:', err);
      return { status: 500, json: { message: 'Server error' } };
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

export { getDragons, getDragonImages, addDragons, initializeCounts, getUserCounts, patchUserCounts, getTraits, initializeTraits, getUserTraits, setUserTraits, patchUserTraits, getUserDragonTraits };