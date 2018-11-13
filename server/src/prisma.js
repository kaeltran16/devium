import { Prisma } from 'prisma-binding';

console.log(process.env.PRISMA_ENDPOINT);

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET
});


export default prisma;
