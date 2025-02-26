import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dbName: process.env.MONGO_DATABASE,
  uri: process.env.MONGO_URI,
}));
