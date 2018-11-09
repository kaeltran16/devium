import { extractFragmentReplacements } from 'prisma-binding';
import Mutation from './Mutation';
import Query from './Query';

const resolvers = {
    Query,
    Mutation
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
