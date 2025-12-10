import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getTokenFromReq, verifyToken } from '@/lib/auth';


export async function GET(req: Request) {
await connectDB();
const token = getTokenFromReq(req);
if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


const decoded = verifyToken(token);
if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });


const user = await User.findById(decoded.id).select('-password');
if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });


return NextResponse.json({ user });
}