import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { productRouterApp } from './routes/product.routes';
import { userRouterApp } from './routes/user.routes';
import { homeRouterApp } from './routes/home.routes';
import { favouritesRouterApp } from './routes/favourites.routes';

import { getAllFiles } from './utils/getAllFiles';

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/all-images', (req, res) => {
  const directoryPath = path.join(__dirname, 'images');
  const allFiles = getAllFiles(directoryPath);

  const imageFiles = allFiles.filter(file =>
    /\.(jpg|jpeg|png|gif|webp)$/.test(file),
  );

  const imageUrls = imageFiles.map(file =>
    file.replace(__dirname, '').replace(/\\/g, '/'),
  );

  res.send(imageUrls);
});

app.use('/products', productRouterApp);
app.use('/users', userRouterApp);
app.use('/home', homeRouterApp);
app.use('/favourites', favouritesRouterApp);

app.get('/', (req: Request, res: Response) => {
  res.send({ test: 'Ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
