// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/connectToDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db } = await connectToDatabase();
    const { tx_id: txid, name: name } = req.query;
    const expenses = await db.collection('expenses');
    var myquery = { _id: new ObjectId(txid as string) };
    var newvalues = [{ $push: { paid: name } }, { $pull: { paid: name } }];
    try {
        const k = await expenses.countDocuments({
            _id: new ObjectId(txid as string),
            paid: name,
        });
        await expenses.updateOne(myquery, newvalues[k === 0 ? 0 : 1]);
        res.status(200).json({ job: 'done.' });
    } catch (e) {
        // console.log(e);
        res.status(400).send({ payments: [{}] });
    }
}
