import { NextResponse } from 'next/server';
import { db } from '../../../db';

export async function validateEmail(email) {
    try {
        const result = await db.query('SELECT * FROM blog_user WHERE email=$1',
            [email],
        );
        if (result.rowCount === 0) {
            return {success: false, error: 'Invalid email'};
        }
        return {success: true, username: result.rows[0].username, email: result.rows[0].email};
    } catch (e) {
        console.error('DB error:', e);
        return {success: false, error: e.message};
    }
}