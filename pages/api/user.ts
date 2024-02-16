// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/connectToDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const username = req.query.user;
    // console.log(username);
    const { db } = await connectToDatabase();
    const users = db.collection('users');
    let user = await users.find({ name: username }).toArray();
    user = user.map((el: any) => {
        return { ...el, _id: new ObjectId(el._id).toString() };
    });
    res.status(200).json(user);
}
