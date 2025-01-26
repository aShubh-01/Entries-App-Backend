import express from 'express';
import { authenticateAdmin, authenticateUser } from '../middlewares/auth';
import { rateLimit } from 'express-rate-limit';
import { addEntry, deleteEntry, getAll, getEntry, updateEntry } from '../controllers/entryControllers';

export const entryRouter = express.Router();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 60,
    standardHeaders: 'draft-8',
    legacyHeaders: false
})

entryRouter.use(limiter);

entryRouter.use(authenticateUser);     // ROUTES CAN BE ACCESSED BY NORMAL USER & ADMINS

entryRouter.get('/byId/:id', getEntry);
entryRouter.get('/all', getAll);

entryRouter.use(authenticateAdmin);   // ROUTES CAN BE ONLY ACCESSED BY ADMINS

entryRouter.post('/create', addEntry);                               
entryRouter.put('/update/:id', updateEntry);
entryRouter.delete('/delete/:id', deleteEntry);