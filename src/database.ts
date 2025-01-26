import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL || '')
        console.log('Connected to database')
    } catch (e) {
        console.log('Unable to connect to mongo db');
        console.error(e);
        process.exit(1);
    }
}