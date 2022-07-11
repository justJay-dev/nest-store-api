import { Cart } from '../entities/cart.entity';
export const mockCarts: Cart[] = [
  {
    id: '217859dd-38e3-4cb3-a6c3-201334f15a7b',
    userId: 0,
    products: [
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
      {
        id: 'b4c3c33b-302a-40bd-a06d-f5badc5cb4c7',
        title: 'Cargo Skirt',
        price: 86.99,
        description: 'All the storage you could ever want ',
        image:
          'https://cdn11.bigcommerce.com/s-c7qlm8a06j/images/stencil/original/products/1110/7535/egirl-punk-a-line-pocket-chain-mini-skirt-cosmique-studio__31512.1643984453.jpg?c=1',
        category: 'Skirt',
      },
    ],
  },
  {
    id: 'c6a4ba57-13c1-4732-bc48-6a129a0be7bf',
    userId: 1,
    products: [
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
    ],
  },
];
