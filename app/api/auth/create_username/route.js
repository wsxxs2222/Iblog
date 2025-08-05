import { NextResponse } from 'next/server';
import { db } from '../../db';

export async function POST(request) {
    const data = await request.json();
    const username = data.username;
    const email = data.email;

    try {
        const result = await db.query("SELECT * FROM blog_user WHERE username=$1;",
          [username],
        );
        console.log('result.rows is', result.rows);
        if (result.rows.length > 0) {
          return NextResponse.json({success: false, error: 'username already exists'}, {status: 400});
        }
        await db.query("INSERT INTO blog_user (username, email) VALUES ($1, $2);",
            [username, email],
        );
        return NextResponse.json({success: true}, {status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({success: false, error: `${e}`}, {status: 500});
    }
}