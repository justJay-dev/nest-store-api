import { Product } from '../entities/product.entity';
export const mockProducts: Product[] = [
  {
    id: '45a2b57b-fdeb-4c5a-a45f-83c35ee2e6b2',
    title: 'Product 0',
    price: 68.99,
    description: 'Product 0 description',
    image: 'https://example.com/product-2.jpg',
    category: 'clothing',
  },
  {
    id: '2217859dd-38e3-4cb3-a6c3-201334f15a7b',
    title: 'Product 1',
    price: 68.99,
    description: 'Product 1 description',
    image: 'https://example.com/product-3.jpg',
    category: 'clothing',
  },
];

export const malformedProducts: any[] = [
  {
    notTitle: 'Product 0',
    price: 68.99,
    description: 'Product 0 description',
    image: 'https://example.com/product-2.jpg',
    category: 'clothing',
  },
  {
    notTitle: 'Product 1',
    price: 68.99,
    description: 'Product 1 description',
    image: 'https://example.com/product-3.jpg',
    category: 'clothing',
  },
];
