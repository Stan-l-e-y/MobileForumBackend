import { userRouter } from './routes/user.js';
import { json, Router } from 'express';
import postRouter from './routes/post.js';
import commentRouter from './routes/comment.js';
import subcommentRouter from './routes/subcomment.js';

const router = Router();
router.use(json());

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/subcomment', subcommentRouter);

export { router };
