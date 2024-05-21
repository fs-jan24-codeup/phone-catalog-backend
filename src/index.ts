import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ test: 'Ok' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
