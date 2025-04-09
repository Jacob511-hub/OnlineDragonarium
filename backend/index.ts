import express from 'express';
import pool from './pool';
import cors from 'cors';
import sessionConfig from "./session-config";
import dotenv from "dotenv";
const { loginUser, registerUser } = require("./auth-service");
const { getDragons, addDragons, initializeCounts, getUserCounts, patchUserCounts, getTraits, initializeTraits, getUserTraits, setUserTraits, patchUserTraits, getUserDragonTraits } = require("./dragon-service");

dotenv.config();

const app = express();
const port = 5000;

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

app.post("/add-dragons", async (req, res) => {
  const user_id_session = req.session.user ? req.session.user.id : null;
  const user_is_admin = req.session.user ? req.session.user.is_admin : false;
  
  if (!user_id_session || !user_is_admin) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const { user_id, dragon_id, name, can_be_traited, is_only_traited, elements } = req.body;

  const result = await addDragons(user_id, user_id_session, dragon_id, name, can_be_traited, is_only_traited, elements, pool);
  res.status(result.status).json(result.json);
});

app.get('/traits', async (req, res) => {
  const result = await getTraits(pool);
  res.status(result.status).json(result.json);
});

app.use(sessionConfig);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await registerUser(username, email, password, pool);
  res.status(result.status).json(result.json);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password, pool, req.session);
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

app.post("/initialize-counts", async (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;
  const dragonsResult = await pool.query('SELECT id FROM dragons');
  const dragonIds = dragonsResult.rows.map(row => row.id);

  const result = await initializeCounts(userId, dragonIds, pool);
  res.status(result.status).json(result.json);
});

app.get("/user-counts", async (req, res) => {
  const { user_id, dragon_id } = req.query;
  const userIdSession = req.session.user ? req.session.user.id : null;

  const result = await getUserCounts(user_id, dragon_id, userIdSession, pool);
  res.status(result.status).json(result.json);
});

app.patch('/user-counts', async (req, res) => {
  const user_id = req.session.user ? req.session.user.id : null;
  const { dragon_id, count_normal, count_traited, count_twin, count_traited_twin } = req.body;

  const result = await patchUserCounts(user_id, dragon_id, count_normal, count_traited, count_twin, count_traited_twin, pool);
  res.status(result.status).json(result.json);
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

app.get("/user-dragon-traits", async (req, res) => {
  const { user_id, dragon_id } = req.query;
  const userIdSession = req.session.user ? req.session.user.id : null;

  const result = await getUserDragonTraits(user_id, dragon_id, userIdSession, pool);
  res.status(result.status).json(result.json);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
