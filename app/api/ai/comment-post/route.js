import { NextResponse } from "next/server";
import { db } from "../../db";
import { buildCommentPrompt } from "./prompt_builder";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function GET() {
    
}

export async function POST(request) {
    const data = await request.json();
    const post = data.post;
    const email = post.email;

    try {
        const aiFriendResult = await db.query('SELECT name, character, relation_to_user FROM ai '
            + 'JOIN blog_user ON ai.id=blog_user.ai_id WHERE blog_user.email=$1;',
            [email],
        );
        const aiFriend = aiFriendResult.rows[0];
        const prompt = buildCommentPrompt(aiFriend.name, aiFriend.character, aiFriend.relationToUser,
            post.title + '\n' + post.content
        );
        // call the gemini api using post info and aiFriend info
        const aiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        console.log('post id is', post.id);
        
        const aiComment = aiResponse.candidates[0].content.parts[0].text; // fixme
        console.log('ai response is', aiResponse.candidates[0].content);
        await db.query('INSERT INTO comment (post_id, content, ai_id) '
            + 'VALUES ($1, $2, $3);',
            [post.id, aiComment, aiFriend.id],
        );
        return NextResponse.json({success: true});
    } catch(e) {
        console.log(e);
        return NextResponse.json({success: false}, {status: 500});
    }
}

export async function DELETE() {
    
}