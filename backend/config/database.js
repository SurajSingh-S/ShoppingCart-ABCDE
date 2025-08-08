import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);


    await mongoose.connection.db.collection('users').dropIndex('username_1')
      .then(() => console.log('Dropped username_1 index'))
      .catch(err => {
        if (err.codeName === 'IndexNotFound') {
          console.log('Index username_1 not found');
        } else {
          console.error('Error dropping index:', err);
        }
      });

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
