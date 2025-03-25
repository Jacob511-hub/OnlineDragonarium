import express from 'express';
import pool from './pool';
import cors from 'cors';
import sessionConfig from "./session-config";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

const bcrypt = require("bcryptjs");

app.use(
  cors({
    origin: process.env.REACT_APP_FRONTEND_URL,
    credentials: true,
  })
);
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

app.get('/traits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM traits');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching traits:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(sessionConfig);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check for empty fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }
    
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email/password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email/password" });
    }

    const dragonsResult = await pool.query('SELECT id FROM dragons WHERE can_be_traited = true');
    const dragonIds = dragonsResult.rows.map(row => row.id);
    const traitIds = Array.from({ length: 10 }, (_, i) => i + 1);

    for (const dragonId of dragonIds) {
      for (const traitId of traitIds) {
        await pool.query(
          `INSERT INTO user_traits (user_id, dragon_id, trait_id, unlocked)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (user_id, dragon_id, trait_id) DO NOTHING`,
          [user.rows[0].id, dragonId, traitId, false]
        );
      }
    }

    // Save to session
    req.session.user = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
    };

    res.status(200).json({ message: "Login successful", user: user.rows[0].username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(200).json({ message: "Not logged in" });
  }

  res.status(200).json({ message: "Profile loaded", user: req.session.user });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.get("/current-user", (req, res) => {
  if (req.session.user) {
      res.json({ user_id: req.session.user.id });
  } else {
    res.status(200).json({ user_id: "guest" });
  }
});

app.get("/user-traits", async (req, res) => {
  const { user_id, dragon_id, trait_id } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM user_traits WHERE user_id = $1 AND dragon_id = $2 AND trait_id = $3`,
      [user_id, dragon_id, trait_id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows); // Return the trait data for this user, dragon, and trait
    } else {
      res.status(404).json({ message: "Trait not found" });
    }
  } catch (err) {
    console.error('Error fetching user trait:', err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/user-traits', async (req, res) => {
  const { user_id, dragon_id, trait_id, unlocked } = req.body;

  // Check if all required fields are provided
  if (!user_id || !dragon_id || !trait_id || unlocked === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Query to insert the new record into the user_traits table
    const result = await pool.query(`
      INSERT INTO user_traits (user_id, dragon_id, trait_id, unlocked)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [user_id, dragon_id, trait_id, unlocked]);

    // Send the created record as a JSON response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting user trait:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/user-traits', async (req, res) => {
  const { user_id, dragon_id, trait_id, unlocked } = req.body;

  try {
      const query = `
          UPDATE user_traits 
          SET unlocked = $1 
          WHERE user_id = $2 AND dragon_id = $3 AND trait_id = $4
          RETURNING *;
      `;

      const result = await pool.query(query, [unlocked, user_id, dragon_id, trait_id]);

      if (result.rowCount === 0) {
          return res.status(404).json({ error: "Trait entry not found" });
      }

      res.status(200).json(result.rows[0]);
  } catch (err) {
      console.error('Error updating trait state:', err);
      res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
