import express, { Request, Response } from 'express';
import { Product } from './types/Product';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ test: 'Ok' });
});

app.get('/products/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  const products: Product[] = [
    {
      id: '1',
      category: 'product',
      namespaceId: '1',
      name: 'Test Product',
      capacityAvailable: ['1, 2, 3, 4, 5, 6'],
      capacity: '1',
      priceRegular: 100,
      priceDiscount: 80,
      colorsAvailable: ['Red', 'Blue', 'Green'],
      color: 'Red',
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      description: [
        {
          title: 'Product Description',
          text: ['Lorem ipsum dolor sit amet', 'consectetur adipiscing elit'],
        },
        {
          title: 'Product Specifications',
          text: [
            'Screen: 6.5 inches',
            'Resolution: 1080x2340 pixels',
            'Processor: Snapdragon 865',
            'RAM: 8GB',
            'Camera: 64MP',
            'Zoom: 10x',
            'Cell: Lithium-ion',
          ],
        },
      ],
      screen: '6.5 inches',
      resolution: '1080x2340 pixels',
      processor: 'Snapdragon 865',
      ram: '8GB',
      camera: '64MP',
      zoom: '10x',
      cell: ['Lithium-ion'],
    },
  ];

  const product = products.find(product => product.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('server has started on port');
  console.log('http://localhost:' + PORT);
});
