import express from 'express';
import prisma from './prisma/prisma';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const user = await prisma.user.findMany();
  console.log(user);
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
