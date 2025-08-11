import { NextResponse } from 'next/server';
import { db } from '../../db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    try {
    const result = await db.query('SELECT comment.id, content, COALESCE(username, ai.name) AS author FROM comment ' + 
        'LEFT JOIN ai on comment.ai_id=ai.id ' +
        'WHERE post_id=$1 ORDER BY comment.id ASC LIMIT 20;',
        [postId],
    );
    console.log('result.rows is', result.rows);
    return NextResponse.json({ success: true, commentList: result.rows });
  } catch (e) {
    console.error('DB error:', e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const data = await request.json();
    const comment = data.comment;
    const {content, username} = comment;
    try {
        await db.query('INSERT INTO comment (post_id, content, username) VALUES ($1, $2, $3)',
            [postId, content, username],
        );
        return NextResponse.json({success: true,});
    } catch (e) {
        console.error('DB error:', e);
        return NextResponse.json({success: false, error: e.message}, {status: 500});
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    console.log('comment id is',commentId)
    try {
        await db.query('DELETE FROM comment WHERE id=$1',
            [commentId,],
        );
        return NextResponse.json({success: true,});
    } catch (e) {
        console.error('DB error:', e);
        return NextResponse.json({success: false, error: e.message}, {status: 500});
    }
}