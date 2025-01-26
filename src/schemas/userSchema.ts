import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({          // SCHEMA FOR USERs TABLE
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER'} // ROLE FIELD TO DISTINGUISH WHICH USER IS ADMIN OR NOT
    
});

export const User = mongoose.model('User', UserSchema);