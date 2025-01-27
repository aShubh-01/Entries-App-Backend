"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.addEntry = exports.getAll = exports.getEntry = void 0;
const entrySchema_1 = require("../schemas/entrySchema");
const getEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entryId = req.params.id;
    try {
        if (!entryId) {
            res.status(400).json({ message: 'Entry Id required ' });
            return;
        }
        const existingEntry = yield entrySchema_1.Entry.findById(entryId, { _id: false, name: true });
        if (!existingEntry) {
            res.status(404).json({ message: 'Entry not found' });
            return;
        }
        res.status(200).json({
            message: 'Entry fetched',
            entry: existingEntry
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to fetch entry ' });
    }
});
exports.getEntry = getEntry;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entries = yield entrySchema_1.Entry.find({}, { _id: false, name: true });
        if (entries.length == 0) {
            res.status(404).json({ message: 'No entries found' });
            return;
        }
        res.status(200).json({
            message: 'Entries fetched',
            entries
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to fetch all entries ' });
    }
});
exports.getAll = getAll;
const addEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        if (!name || name.length > 255) {
            res.status(400).json({ message: 'Entry name cannot be empty or more than 255 characters' });
            return;
        }
        const newEntry = yield entrySchema_1.Entry.create({ name: name });
        res.status(200).json({
            message: 'Entry created succesfully',
            entryId: newEntry._id
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to create entry' });
    }
});
exports.addEntry = addEntry;
const updateEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entryId = req.params.id;
    const { newName } = req.body;
    try {
        if (!entryId) {
            res.status(400).json({ message: 'Entry Id required ' });
            return;
        }
        if (!newName || newName.length > 255) {
            res.status(400).json({ message: 'Entry name cannot be empty or more than 255 characters' });
            return;
        }
        const entry = yield entrySchema_1.Entry.findById(entryId);
        if (!entry) {
            res.status(404).json({ message: 'Cannot find entry ' });
            return;
        }
        entry.name = newName;
        entry.save();
        res.status(200).json({ message: 'Entry updated' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to update entry ' });
    }
});
exports.updateEntry = updateEntry;
const deleteEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entryId = req.params.id;
    try {
        if (!entryId) {
            res.status(400).json({ message: 'Entry Id required ' });
            return;
        }
        yield entrySchema_1.Entry.findByIdAndDelete(entryId);
        res.status(200).json({ message: 'Entry deleted' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to delete entry ' });
    }
});
exports.deleteEntry = deleteEntry;
