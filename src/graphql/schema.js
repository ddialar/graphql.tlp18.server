import { GraphQLSchema } from 'graphql';

import RootQueryType from './queries/root.queries';
import MutationType from './mutations/mutation';

export default new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});