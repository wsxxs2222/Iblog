import { NextResponse } from "next/server";
import { db } from "../db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    try {
        const result = await db.query('SELECT name, character, relation_to_user FROM ai  '
            + 'JOIN blog_user ON ai.id=blog_user.ai_id WHERE blog_user.email=$1;',
            [email],
        );
        return NextResponse.json({success: true, aiFriend: result.rows[0]});
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false}, {status: 500});
    }
}

export async function POST(request) {
    const data = await request.json();
    const newAiFriend = data.newAiFriend;
    const email = data.email;
    try {
        const result = await db.query('INSERT INTO ai (name, character, relation_to_user) VALUES ($1, $2, $3) '
            + 'RETURNING id;',
            [newAiFriend.name, newAiFriend.character, newAiFriend.relationToUser],
        );
        const aiId = result.rows[0]?.id;
        await db.query('UPDATE blog_user SET ai_id=$1 WHERE email=$2;',
            [aiId, email],
        );
        return NextResponse.json({success: true});
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false}, {status: 500});
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    try {
        const result = await db.query(
            'SELECT ai_id FROM blog_user WHERE email=$1;',
            [email],
            );
        const aiId = result.rows[0]?.ai_id;
        await db.query('UPDATE blog_user SET ai_id=NULL WHERE email=$1;',
            [email],
        )
        await db.query('DELETE FROM ai WHERE id=$1;',
            [aiId],
        )
        return NextResponse.json({success: true});
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false}, {status: 500});
    }
}