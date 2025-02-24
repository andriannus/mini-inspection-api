import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dbName: process.env.DATABASE_NAME,
  uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URI}`,
}));
