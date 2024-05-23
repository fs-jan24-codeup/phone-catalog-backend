import express, { Request, Response } from 'express';
import { Product } from './types/Product';
import cors from 'cors';
import { Status } from './types/constants';

const app = express();

app.use(cors({ origin: '*' }));

app.get('/', (req: Request, res: Response) => {
  res.json({ test: 'Ok' });
});

app.get('/home', (req: Request, res: Response) => {
  const products: Product[] = [
    {
      id: 1,
      category: 'phones',
      itemId: 'apple-iphone-7-32gb-black',
      name: 'Apple iPhone 7 32GB Black',
      fullPrice: 400,
      price: 375,
      screen: "4.7' IPS",
      capacity: '32GB',
      color: 'black',
      ram: '2GB',
      year: 2016,
      image: 'img/phones/apple-iphone-7/black/00.webp',
    },
  ];

  const phones = products.filter(phone => phone.category === 'phones');

  if (!phones.length) {
    res.status(Status.NOT_FOUND).json({ error: 'Phones not found' });
  }

  res.statusCode = Status.OK;
  res.send(phones);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
