import { Pool } from "pg";

const db = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    ssl: { rejectUnauthorized: false },
});

export {db};
