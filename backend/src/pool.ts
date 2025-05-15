import { Pool } from 'pg';
import dotenv from 'dotenv';
const fs = require('fs');

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  ssl: {
    ca: fs.readFileSync(__dirname + '/us-east-2-bundle.pem').toString()
  },
});

export default pool;