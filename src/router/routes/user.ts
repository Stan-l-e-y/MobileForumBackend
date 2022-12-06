import { Router } from 'express';
import { prisma } from '../../server.js';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send({ message: 'Hello user!' });
});

userRouter.post('/login', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: 'stanley@tsonev.com',
      username: 'Stanley',
      password: '123456',
      posts: {
        create: {
          title: 'Hello world!',
          content: 'This is my first post!',
        },
      },
    },
  });
  res.send(user);
});

userRouter.post('/register', (req, res) => {
  res.send({ message: 'Hello user!' });
});

export { userRouter };
