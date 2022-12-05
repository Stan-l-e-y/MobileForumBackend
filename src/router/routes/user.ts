import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send({ message: 'Hello user!' });
});

export { userRouter };
