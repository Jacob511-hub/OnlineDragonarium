import session from "express-session";
import dotenv from 'dotenv';

dotenv.config();

declare module "express-session" {
  interface SessionData {
    user: any;
  }
}

const sessionConfig = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true, // Prevents client-side JS from accessing cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'none'
  },
});

export default sessionConfig;