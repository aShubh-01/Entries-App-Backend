import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './database';
import { userRouter } from './routers/userRouter';
import { entryRouter } from './routers/entryRouter';

dotenv.config( { path: path.join(__dirname, '../.env')}); // CONFIGURE ENVIRONMENT

const port = Number(process.env.PORT) || 3000;

const app = express();                              // CONFIGURE EXPRESS APP
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send("API Working") });
app.use('/user', userRouter);
app.use('/entry', entryRouter);

connectDB();                                        // CONNECT WITH DATABASE

app.listen(port, () => console.log(`App running on port ${port}`))