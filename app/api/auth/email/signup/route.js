import { NextResponse } from 'next/server';
import { db } from '../../../db';

export async function POST(request) {
    const data = await request.json();
    const {username, email} = data;
    try {
        const emailResult = await db.query('SELECT * FROM blog_user WHERE email=$1',
            [email],
        );
        if (emailResult.rowCount === 1) {
            return NextResponse.json({success: false, error: 'email already taken'}, {status: 401});
        }
        const usernameResult = await db.query('SELECT * FROM blog_user WHERE username=$1',
            [username],
        );
        if (usernameResult.rowCount === 1) {
            return NextResponse.json({success: false, error: 'username already taken'}, {status: 401});
        }
        await db.query('INSERT INTO blog_user (username, email) VALUES ($1, $2)',
            [username, email],
        );
        return NextResponse.json({success: true,});
    } catch (e) {
        console.error('DB error:', e);
        return NextResponse.json({success: false, error: e.message}, {status: 500});
    }
}