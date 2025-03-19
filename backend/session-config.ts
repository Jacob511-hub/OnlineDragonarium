import session from "express-session";
import dotenv from 'dotenv';

dotenv.config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Only secure in production
    httpOnly: true, // Prevents client-side JS from accessing cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'Lax'
  },
});

export default sessionConfig;