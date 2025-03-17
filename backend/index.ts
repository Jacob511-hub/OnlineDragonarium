import express from 'express';
import pool from './pool';
import cors from 'cors';

const app = express();
const port = 5000;

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
