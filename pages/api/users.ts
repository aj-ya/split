// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/connectToDB';
import { ObjectId } from 'mongodb';
type docType = {
    name: string;
    id: string;
    _id: ObjectId;
    vpa?: string;
    password?: string;
};
// Call an external API endpoint to get posts.
// You can use any data fetching library
type usersType = {
    name: string;
    id: string;
    _id: string;
    vpa?: string;
    pass?: string;
}[];
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<usersType>
) {
    const { db } = await connectToDatabase();
    const users = await db.collection('users');
    let all_users = users.find().toArray();
    all_users = (await all_users).map((el: any) => {
        delete el.pass;
        return { ...el, _id: new ObjectId(el._id).toString() };
    });
    res.status(200).json(all_users);
}
