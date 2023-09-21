import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL!);
export default client.connect();
