import { Router } from 'express';
import { prisma } from '../../server.js';
import { validateAndDecodeJWT } from '../../functions.js';
import { DecodedJWT } from '../../types.js';
import { jwtMiddleware } from '../middleware.js';

const postRouter = Router();
postRouter.use(jwtMiddleware);

//get posts for main page
postRouter.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.send(posts);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

postRouter
  .route('/:id')
  .get((req, res) => {
    res.send({ message: 'Hello get single post!' });
  })
  .put((req, res) => {
    res.send({ message: 'Hello put post!' });
  })
  .delete((req, res) => {
    res.send({ message: 'Hello delete post!' });
  });

postRouter.post('/create', async (req, res) => {
  try {
    const token = req.cookies.JWT;
    const { email } = validateAndDecodeJWT<DecodedJWT>(token);

    if (!req.body.title || !req.body.content) {
      res.status(400).send('Missing title or content');
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).send('User not found');
    } else {
      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          author: {
            connect: {
              email,
            },
          },
        },
      });
      res.send(post);
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default postRouter;
