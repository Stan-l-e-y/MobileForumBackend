import express from 'express';
import { createServer } from 'http';
import { router } from './router/router.js';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

export const prisma = new PrismaClient();
export const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(cookieParser());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello yep!');
});

const server = createServer(app);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
