import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client.js';


console.log(process.env.DATABASE_URL)
console.log(process.env.DATABASE_HOST)
console.log(process.env.DATABASE_PORT)


const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT),
  connectionLimit: 5
}); 
const prisma = new PrismaClient({ adapter });

export { prisma }