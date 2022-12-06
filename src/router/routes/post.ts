import { Router } from 'express';
import { prisma } from '../../server.js';
import { validateAndDecodeJWT } from '../../functions.js';
import { DecodedJWT } from '../../types.js';
import { jwtMiddleware } from '../middleware.js';

const postRouter = Router();
postRouter.use(jwtMiddleware);

postRouter.get('/posts', (req, res) => {
  res.send({ message: 'Hello get all post!' });
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

postRouter.post('/create', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { email } = validateAndDecodeJWT<DecodedJWT>(token);
  res.send({ message: 'Hello post post!' });
});

export default postRouter;
