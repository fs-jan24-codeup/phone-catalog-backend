import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*' }));

app.get('/', (req: Request, res: Response) => {
  res.json({ test: 'Ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
