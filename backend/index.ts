import express from 'express';
import pool from './pool';
import cors from 'cors';
import multer from 'multer';
import stream from 'stream';
import sessionConfig from "./session-config";
import dotenv from "dotenv";
import { getDragonImageService, getDragonImages } from './dragon-image-service';
const { loginUser, registerUser } = require("./auth-service");
const { getDragons, getDragonBySlug, addDragons, initializeCounts, getUserCounts, patchUserCounts, getTraits, initializeTraits, getUserTraits, setUserTraits, patchUserTraits, getUserDragonTraits } = require("./dragon-service");

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

const upload = multer({ storage: multer.memoryStorage() });
const imageService = getDragonImageService();

if (imageService.getBasePath) {
  app.use('/images', express.static(imageService.getBasePath()));
}

app.get('/dragons/:id/image', async (req, res) => {
  const id = req.params.id;
  const result = await pool.query('SELECT image FROM dragons WHERE id = $1', [id]);
  const dragon = result.rows[0];

  if (!dragon) {
    return res.status(404).json({ message: 'Dragon not found' });
  }

  const imageFileName = dragon.image;
  
  try {
    const result = await getDragonImages(imageService, imageFileName);

    if (result.found) {
      res.sendFile(result.filePath);
    } else {
      res.status(result.error.status).json(result.error.json);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'No image file uploaded.' });
      }

      const readableImageStream = new stream.PassThrough();
      readableImageStream.end(req.file.buffer);

      await imageService.saveImage(req.file.originalname, readableImageStream);

      res.status(200).json({ message: 'Image uploaded successfully.', filename: req.file.originalname });
  } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload image.' });
  }
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

app.get("/dragon-slug", async (req, res) => {
  const { slug } = req.query;

  const result = await getDragonBySlug(slug, pool);
  res.status(result.status).json(result.json);
});

app.get("/is-admin", (req, res) => {
  if (req.session.user) {
    res.json({ is_admin: req.session.user.is_admin });
  } else {
    res.status(200).json({ is_admin: false });
  }
});

app.post("/add-dragons", async (req, res) => {
  const user_is_admin = req.session.user ? req.session.user.is_admin : false;

  if (!user_is_admin) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const { name, can_be_traited, is_only_traited, elements } = req.body;

  const result = await addDragons(name, can_be_traited, is_only_traited, elements, pool);
  res.status(result.status).json(result.json);
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
