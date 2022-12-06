import { Router } from 'express';
import { prisma } from '../../server.js';
import bcyprt from 'bcrypt';
import { JWT_SECRET } from '../../server.js';
import jwt from 'jsonwebtoken';
import { validateAndDecodeJWT } from '../../functions.js';
import { DecodedJWT } from '../../types.js';

const userRouter = Router();

//get user profile, down the line maybe include the users posts and comments
userRouter.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { email } = validateAndDecodeJWT<DecodedJWT>(token);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).json({ username: user.username });
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: 'Missing email or password' });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(400).send({ message: 'User not found' });
  } else {
    const passwordMatch = await bcyprt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ email }, JWT_SECRET!, {
        expiresIn: '1h',
        algorithm: 'HS256',
      });
      res
        .cookie('JWT', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .send(`Logged in as ${user.username} token: ${token}`);
    } else {
      res.status(400).send({ message: 'Wrong password' });
    }
  }
});

userRouter.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(400).send({ message: 'Missing email, password or username' });
  }

  const hashedPassword = bcyprt.hashSync(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
  } catch (error) {
    res.status(400).send({ message: 'User already exists' });
  }
  res.send({ message: 'User created' });
});

export { userRouter };
