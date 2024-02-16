// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/connectToDB';
import { ObjectId } from 'mongodb';

type UserType = {
    name: string;
    id: string;
    _id: string;
    vpa?: string;
    pass?: string;
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserType[]>
) {
    const { db } = await connectToDatabase();
    const users = db.collection<UserType>('users');
    const all_users = await users.find().toArray();
    const all_user_ids = all_users.map((el) => {
        return { ...el, pass: undefined, _id: new ObjectId(el._id).toString() };
    });
    res.status(200).json(all_user_ids);
}
