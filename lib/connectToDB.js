const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
// console.log(uri);
if (!uri) {
    throw new Error('Define the MONGODB_URI environmental variable');
}
let cachedClient = null;
let cachedDb = null;
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
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
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
