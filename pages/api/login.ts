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
    console.log(await users.countDocuments(user_pass));
    res.status(200).send({ present: true });
}
