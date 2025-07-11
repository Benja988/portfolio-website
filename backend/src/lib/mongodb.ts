import mongoose from 'mongoose';

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export async function connectToDatabase() {
  if (connection.isConnected) {
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://benjaminokumu12:P2EBuvrWsZXZzf43@cluster0.uybmn.mongodb.net/portfolio');
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export function getConnectionStatus(): number | undefined {
  return connection.isConnected;
}