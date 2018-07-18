import {
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import WriterType from '../models/writer.type';
import * as WritersService from '../../services/writers.service';

import * as utils from '../../common/utils';

const allWriters = {
    type: new GraphQLList(WriterType),
    description: 'List of all stored writers.',
    resolve: async (parentValues, args) => {
        return await WritersService.getWritersData();
    }
};

const writersById = {
    type: new GraphQLList(WriterType),
    description: 'List of all stored writers, filtered by their IDs.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return await WritersService.getWritersData(queryParams);
    }
};

export {
    allWriters,
    writersById
};