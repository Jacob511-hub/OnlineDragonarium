import express from 'express';
import pool from './pool';
import cors from 'cors';
const bcrypt = require("bcryptjs");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

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

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.rows[0].id, username: newUser.rows[0].username, email: newUser.rows[0].email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to login a user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: user.rows[0].username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
