import { Router } from 'express';

const postRouter = Router();

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
  res.send({ message: 'Hello post post!' });
});

export default postRouter;
