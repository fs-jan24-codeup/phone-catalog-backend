import express, { Request, Response } from 'express';
import cors from 'cors';
import { Color, User } from './types/types';

const app = express();

const users: User[] = [
  { id: 1, name: 'Valeriy Zaluzhnyi', carColorId: 5 },
  { id: 2, name: 'Pany Anna', carColorId: 4 },
  { id: 3, name: 'Pan Roman', carColorId: 2 },
];

const colors: Color[] = [
  { id: 1, name: 'Black' },
  { id: 2, name: 'DeepPink' },
  { id: 3, name: 'Red' },
  { id: 4, name: 'Aquamarine' },
  { id: 5, name: 'Gold' },
  { id: 6, name: 'YellowGreen' },
  { id: 7, name: 'Yellow' },
];
app.use(cors({ origin: '*' }));
app.get('/', (req: Request, res: Response) => {
  res.json({ test: 'Ok' });
});

function getColor(colorId: number) {
  return colors.find(color => color.id === colorId);
}

function normalizeUser(user: User) {
  return {
    ...user,
    carColor: getColor(user.carColorId),
  };
}

app.get('/users', (req, res) => {
  res.send(users.map(normalizeUser));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
