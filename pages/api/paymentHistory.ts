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
        if (req.method == 'GET') {
            let all_payments = await expeneses
                .find({
                    breakup: { $elemMatch: { name: req.query.user } },
                    creator: { $ne: req.query.user },
                    paid: { $in: [req.query.user] },
                })
                .toArray();
            console.log(all_payments);
            all_payments = (await all_payments).map((el: any) => {
                for (let i in el.breakup) {
                    // console.log(i);
                    if (el.breakup[i].name === req.query.user) {
                        el.payable = el.breakup[i].payable;
                        break;
                        // console.log(i);
                    }
                }
                delete el.breakup;
                // console.log(all_payments);
                return { ...el, _id: new ObjectId(el._id).toString() };
            });
            res.status(200).json(JSON.stringify({ payments: all_payments }));
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ payments: [{}] });
    }
}
