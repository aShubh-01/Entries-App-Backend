import { Entry } from "../schemas/entrySchema";
import { Request, Response } from 'express';

export const getEntry = async (req: Request, res: Response) => {    // GET ENTRY BY ID
    const entryId = req.params.id;
    try {
        if(!entryId) {
            res.status(400).json({ message: 'Entry Id required '});
            return
        }

        const existingEntry = await Entry.findById(entryId, { _id: false, name: true });
        
        if(!existingEntry) {
            res.status(404).json({ message: 'Entry not found' });
            return
        }

        res.status(200).json({ 
            message: 'Entry fetched',
            entry: existingEntry
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to fetch entry '});
    }
}

export const getAll = async (req: Request, res: Response) => {  // GET ALL ENTRIES
    try {
        const entries = await Entry.find({}, { _id: false, name: true});
        
        if(entries.length == 0) {
            res.status(404).json({ message: 'No entries found' });
            return
        }

        res.status(200).json({ 
            message: 'Entries fetched',
            entries
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to fetch all entries '});
    }
}

export const addEntry = async (req: Request, res: Response) => {    // CREATE ENTRY
    const { name } = req.body;
    try {
        if(!name || name.length > 255) {
            res.status(400).json({ message: 'Entry name cannot be empty or more than 255 characters' });
            return
        }

        const newEntry = await Entry.create({ name: name });

        res.status(200).json({ 
            message: 'Entry created succesfully',
            entryId: newEntry._id
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to create entry' });
    }
}

export const updateEntry = async (req: Request, res: Response) => {     // UPDATE ENTRY
    const entryId = req.params.id;
    const { newName } = req.body;
    try {
        if(!entryId) {
            res.status(400).json({ message: 'Entry Id required '});
            return
        }

        if(!newName || newName.length > 255) {
            res.status(400).json({ message: 'Entry name cannot be empty or more than 255 characters' });
            return
        }

        const entry = await Entry.findById(entryId);
        if(!entry) {
            res.status(404).json({ message: 'Cannot find entry '});
            return
        }

        entry.name = newName;
        entry.save();

        res.status(200).json({ message: 'Entry updated' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to update entry '});
    }
}

export const deleteEntry = async (req: Request, res: Response) => {     // DELETE ENTRY
    const entryId = req.params.id;
    try {
        if(!entryId) {
            res.status(400).json({ message: 'Entry Id required '});
            return
        }
        await Entry.findByIdAndDelete(entryId);
        res.status(200).json({ message: 'Entry deleted' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to delete entry '});
    }
}