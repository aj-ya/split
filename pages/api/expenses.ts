// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/connectToDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db } = await connectToDatabase();
    const expeneses = await db.collection('expenses');
    try {
        if (req.method == 'POST') {
            const BSONObject = JSON.parse(req.body);
            if (BSONObject.creator !== 'guest')
                await expeneses.insertOne(BSONObject);
            res.status(200).send('yes');
        }
        if (req.method == 'GET') {
            let all_expenses = await expeneses
                .find({
                    creator: req.query.user,
                })
                .sort({ date: -1 })
                .toArray();
            all_expenses = (await all_expenses).map((el: any) => {
                return { ...el, _id: new ObjectId(el._id).toString() };
            });

            res.status(200).json(all_expenses);
        }
        if (req.method == 'DELETE') {
            let objID = req.body;
            // console.log(objID);
            await expeneses.deleteOne({ _id: new ObjectId(objID) });
            // console.log(objID);
            res.status(200).send('yes');
        }
    } catch {
        res.status(400).send('no');
    }
}
