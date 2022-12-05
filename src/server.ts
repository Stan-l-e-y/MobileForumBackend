import express from 'express';
import { createServer } from 'http';
import { router } from './router/router.js';

const app = express();

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello yep!');
});

const server = createServer(app);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
