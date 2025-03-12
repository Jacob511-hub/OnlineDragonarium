import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

app.use(cors());

app.get("/dragons", async (req, res) => {
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

    res.json(dragonsWithElements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dragons with elements" });
  }
});

app.get('/dragons-by-element', async (req, res) => {
  const { elementName } = req.query;

  try {
    // Step 1: Get the element ID based on the element name
    const elementResult = await pool.query('SELECT id FROM elements WHERE name = $1', [elementName]);
    if (elementResult.rows.length === 0) return res.status(404).json({ error: "Element not found" });

    const elementId = elementResult.rows[0].id;

    // Step 2: Find dragon IDs from the dragon_elements table
    const dragonIdsResult = await pool.query('SELECT dragon_id FROM dragon_elements WHERE element_id = $1', [elementId]);
    if (dragonIdsResult.rows.length === 0) return res.json([]); // No dragons found for this element

    const dragonIds = dragonIdsResult.rows.map(row => row.dragon_id);

    // Step 3: Get dragons that match those IDs
    const dragonsResult = await pool.query('SELECT * FROM dragons WHERE id = ANY($1)', [dragonIds]);

    res.json(dragonsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dragons' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
