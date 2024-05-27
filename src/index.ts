import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRouterApp } from './routes/product.routes';
import { userRouterApp } from './routes/user.routes';
import { homeRouterApp } from './routes/home.routes';
import { favouritesRouterApp } from './routes/favourites.routes';
import { authRouterApp } from './routes/auth.routes';
import { ordersRouterApp } from './routes/orders.routes';

const app = express();

app.use(cors({ origin: '*' }));

app.use(
  cors({
    // origin: process.env.CLIENT_HOST,
    origin: '*',
    credentials: true,
  }),
);

app.use(express.json());
app.use('/assets', express.static('public'));

app.use('/products', productRouterApp);
app.use('/users', userRouterApp);
app.use('/home', homeRouterApp);
app.use('/favourites', favouritesRouterApp);
app.use('/orders', ordersRouterApp);

app.use('/auth', authRouterApp);
// app.use('/activation/:activationToken', authRouterApp);

app.get('/', (req: Request, res: Response) => {
  res.send({ test: 'Ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
