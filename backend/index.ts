import express from 'express';
import pool from './pool';
import cors from 'cors';
import sessionConfig from "./session-config";
import dotenv from "dotenv";
const { loginUser, registerUser } = require("./auth-service");
const { getDragons, initializeTraits, getUserTraits, setUserTraits, patchUserTraits } = require("./dragon-service");

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

  const result = await getUserTraits(user_id, dragon_id, trait_id, userIdSession, pool);
  res.status(result.status).json(result.json);
});

app.post('/user-traits', async (req, res) => {
  const user_id = req.session.user ? req.session.user.id : null;
  const { dragon_id, trait_id, unlocked } = req.body;

  const result = await setUserTraits(user_id, dragon_id, trait_id, unlocked, pool);
  res.status(result.status).json(result.json);
});

app.patch('/user-traits', async (req, res) => {
  const user_id = req.session.user ? req.session.user.id : null;
  const { dragon_id, trait_id, unlocked } = req.body;

  const result = await patchUserTraits(user_id, dragon_id, trait_id, unlocked, pool);
  res.status(result.status).json(result.json);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
