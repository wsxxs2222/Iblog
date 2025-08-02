// app/api/test-db/route.js
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM post');
    return NextResponse.json({ success: true, posts: result.rows });
  } catch (err) {
    console.error('DB error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}