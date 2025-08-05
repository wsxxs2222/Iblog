import { NextResponse } from 'next/server';
import { db } from '../db';

export async function GET() {
  try {
    const result = await db.query('SELECT id, title, content, time_created, blog_user.username FROM post ' + 
        'JOIN blog_user ON post.email=blog_user.email;'
    );
    return NextResponse.json({ success: true, posts: result.rows });
  } catch (e) {
    console.error('DB error:', e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
    const data = await request.json();
    const post = data.post;
    const {title, content, timeCreated, email} = post;
    try {
        await db.query('INSERT INTO post (title, content, time_created, email) VALUES ($1, $2, $3, $4)',
            [title, content, timeCreated, email],
        );
        return NextResponse.json({success: true,});
    } catch (e) {
        console.error('DB error:', e);
        return NextResponse.json({success: false, error: e.message}, {status: 500});
    }
}

export async function DELETE(request) {
    const data = await request.json();
    const id = data.id;
    console.log('the id is', id);
    try {
        await db.query('DELETE FROM post WHERE id=$1',
            [id,],
        );
        return NextResponse.json({success: true,});
    } catch (e) {
        console.error('DB error:', err);
        return NextResponse.json({success: false, error: e.message}, {status: 500});
    }
}