import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
    name: { type: String, require: true }
})

export const Entry = mongoose.model('Entry', EntrySchema);