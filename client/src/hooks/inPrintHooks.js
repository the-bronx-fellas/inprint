import { Blog } from './inprint';

export const connectBlog = () => {
  const blog = new Blog("http://127.0.0.1:8545");
  blog.connectToBlogAddress('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');

  return blog ;
}
