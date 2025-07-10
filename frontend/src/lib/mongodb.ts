import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db();
  return { client, db };
}