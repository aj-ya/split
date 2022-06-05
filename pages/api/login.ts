// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/connectToDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ present: boolean }>
) {
    const user_pass = JSON.parse(req.body);
    console.log(user_pass);
    const { db } = await connectToDatabase();
    const users = await db.collection('users');
    const n = await users.countDocuments(user_pass);
    console.log(n);
    if (n > 0) res.status(200).json({ present: true });
    else res.status(400).json({ present: false });
}
