import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interior-insight');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    try {
      const usersCollection = conn.connection.db.collection('users');
      const indexes = await usersCollection.indexes();
      const hasLegacyUsernameIndex = indexes.some((i) => i.name === 'username_1');
      if (hasLegacyUsernameIndex) {
        await usersCollection.dropIndex('username_1');
        console.log('Dropped legacy users.username_1 index');
      }
    } catch (e) {
      console.log(`Index check error: ${e.message}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
