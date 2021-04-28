import { Quote } from './quote';

export const QUOTES: Quote[] = [
  'Always do right',
  'It is time to reflect',
  'Get your facts first',
].map((q, i) => ({ id: i + 1, quote: q }));
