// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/connectToDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { db } = await connectToDatabase();
    const { txid } = req.query;
    const transactions = await db.collection('transactions');
    try {
        await transactions.insertOne({ tx_id: txid });
        res.status(200).json({ job: 'done.' });
    } catch (e) {
        console.log(e);
        res.status(400).send({ payments: [{}] });
    }
}
