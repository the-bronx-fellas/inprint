import { Blog } from './inprint';

export const connectBlog = () => {
  const blog = new Blog("http://127.0.0.1:8545");
  blog.connectToBlogAddress('0x5FbDB2315678afecb367f032d93F642f64180aa3');

  return blog;
}
