import type { Book } from '../types';
import bookImg from '../asset/books.png';

export const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 5.99,
    description: `The Great Gatsby is a timeless novel by F. Scott Fitzgerald that delves into the glitz, glamour, and moral decay of 1920s America, often referred to as the Jazz Age. Set in the fictional towns of West Egg and East Egg on Long Island, the story follows Nick Carraway, a Yale graduate and World War I veteran, who moves next door to the enigmatic and fabulously wealthy Jay Gatsby. Gatsby is known for hosting lavish, mysterious parties in hopes of reuniting with Daisy Buchanan, a woman he once loved and who now lives across the bay with her wealthy, arrogant husband, Tom.

Through Nick’s eyes, readers witness the stark contrast between appearances and reality, the illusion of the American Dream, and the emptiness that often accompanies material wealth. The novel explores themes of love, obsession, class, and disillusionment, all set against a backdrop of jazz music, extravagant lifestyles, and social upheaval. Gatsby’s tragic pursuit of an idealized past ultimately reveals the fragility of dreams and the moral rot beneath the surface of high society.

Widely regarded as one of the greatest works of American literature, The Great Gatsby captures the spirit of an era while offering a poignant critique of its values.`,
    image: bookImg,
    category: 'Fiction',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    price: 4.99,
    description: 'A dystopian novel about totalitarianism.',
    image: bookImg,
    category: 'Fiction',
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 3.99,
    description: 'A romantic novel about the Bennet family.',
    image: bookImg,
    category: 'Romance',
  },
  {
    id: 4,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 6.99,
    description: 'A story of racial injustice in the South.',
    image: bookImg,
    category: 'Fiction',
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 5.49,
    description: 'A story of teenage angst and rebellion.',
    image: bookImg,
    category: 'Fiction',
  },
];