import dotenv from 'dotenv';
import { Prisma } from 'prisma-binding';

dotenv.config();

const environment = {
   development: 'development',
   production: 'production',
   test: 'test'
};

let endpoint = '';
let secret = '';

switch (process.env.NODE_ENV) {
   case environment.development:
      endpoint = process.env.PRISMA_ENDPOINT;
      secret = process.env.PRISMA_SECRET;
      break;
   case environment.test:
      endpoint = process.env.TEST_PRISMA_ENDPOINT;
      secret = process.env.TEST_PRISMA_SECRET;
      break;
}


const prisma = new Prisma({
   typeDefs: 'src/generated/prisma.graphql',
   endpoint,
   secret
});


export default prisma;
