import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// StringValue হলো string-এর একটি alias, এখানে সরাসরি string ব্যবহার করা যেতে পারে
type StringValue = string; 

// ১. 🔑 গোপন চাবি: এটি Secret টাইপ, যা string অথবা Buffer হতে পারে
const JWT_SECRET: Secret = process.env.JWT_SECRET as string;

// ২. ⏱️ মেয়াদের সময়কাল: এটি number (সেকেন্ড) অথবা string (যেমন '7d') হতে পারে
// যেহেতু || '7d' ব্যবহার করা হয়েছে, এটি undefined হবে না।
const JWT_EXPIRES_IN: number | StringValue = process.env.JWT_EXPIRES_IN || '7d';

// গুরুত্বপূর্ণ যাচাই, যা কোডটিকে নিশ্চিত করে
if (!JWT_SECRET) throw new Error('JWT_SECRET not set in env');


// ৩. ✍️ টোকেন তৈরি ফাংশন (signToken)
export function signToken(payload: object) {
    // jwt.sign() কল করার সময় নিশ্চিত (assertion) করা হলো যে secret-টি আছে
    // expiresIn অপশনটি সরাসরি পাস করা হলো
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
}


// ৪. ✅ টোকেন যাচাই ফাংশন (verifyToken)
export function verifyToken(token: string) {
    try {
        // এখানেও JWT_SECRET-কে নিশ্চিত করা হলো
        return jwt.verify(token, JWT_SECRET) as any;
    } catch (err) {
        return null;
    }
}


// ৫. 🔍 রিকোয়েস্ট থেকে টোকেন বের করা ফাংশন (getTokenFromReq)
export function getTokenFromReq(req: Request | NextRequest) {
    // support Authorization header or cookie named token
    const authHeader = (req as any).headers?.get?.('authorization') || (req as any).headers?.get?.('Authorization');
    if (authHeader?.startsWith('Bearer ')) return authHeader.replace('Bearer ', '');

    // If using cookies in server components, user may put token in cookie header
    const cookieHeader = (req as any).headers?.get?.('cookie');
    if (cookieHeader) {
        const match = cookieHeader.match(/token=([^;]+)/);
        if (match) return match[1];
    }
    return null;
}