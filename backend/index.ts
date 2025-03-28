import express from 'express';
import pool from './pool';
import cors from 'cors';
import sessionConfig from "./session-config";
import dotenv from "dotenv";
const { loginUser, registerUser } = require("./auth-service");
const { getDragons, initializeTraits } = require("./dragon-service");

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
  const result = await getDragons(pool);
  res.status(result.status).json(result.json);
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
  const result = await registerUser(username, email, password, pool, bcrypt);
  res.status(result.status).json(result.json);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password, pool, bcrypt, req.session);
  res.status(result.status).json(result.json);
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

app.post("/initialize-traits", async (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;
  const dragonsResult = await pool.query('SELECT id FROM dragons WHERE can_be_traited = true');
  const dragonIds = dragonsResult.rows.map(row => row.id);
  const traitIds = Array.from({ length: 10 }, (_, i) => i + 1);

  const result = await initializeTraits(userId, dragonIds, traitIds, pool);
  res.status(result.status).json(result.json);
});

app.get("/user-traits", async (req, res) => {
  const { user_id, dragon_id, trait_id } = req.query;
  const userIdSession = req.session.user ? req.session.user.id : null;

  if (!userIdSession || user_id !== String(userIdSession)) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

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
  const user_id = req.session.user ? req.session.user.id : null;
  const { dragon_id, trait_id, unlocked } = req.body;

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
  const user_id = req.session.user ? req.session.user.id : null;
  const { dragon_id, trait_id, unlocked } = req.body;

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
