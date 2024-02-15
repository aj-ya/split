import { MongoClient, Db, ServerApiVersion } from 'mongodb';
if (!process.env.MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}
const uri: string = process.env.MONGODB_URI;
// console.log(uri);

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    //connect to cluster
    await client.connect();
    let db = client.db('Split');

    //set cache
    cachedClient = client;
    cachedDb = db;
    return {
        client: client,
        db: db,
    };
}
