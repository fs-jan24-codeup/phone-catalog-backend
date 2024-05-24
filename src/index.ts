import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRouterApp } from './routes/product.routes';
import { userRouterApp } from './routes/user.routes';
import { homeRouterApp } from './routes/home.routes';
import { favouritesRouterApp } from './routes/favourites.routes';
// import { tabletsRouterApp } from './routes/tablets.routes';
// import { accessoriesRouterApp } from './routes/accessories.routes';

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use('/products', productRouterApp);
app.use('/users', userRouterApp);
app.use('/home', homeRouterApp);
app.use('/favourites', favouritesRouterApp);
// app.use('/tablets', tabletsRouterApp);
// app.use('/accsessories', accessoriesRouterApp);

app.get('/', (req: Request, res: Response) => {
  res.send({ test: 'Ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
