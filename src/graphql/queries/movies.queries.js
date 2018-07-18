import {
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import MovieType from '../models/movie.type';
import * as MoviesService from '../../services/movies.service';

import * as utils from '../../common/utils';

const allMovies = {
    type: new GraphQLList(MovieType),
    description: 'List of all stored movies.',
    resolve: async (parentValues, args) => {
        return await MoviesService.getMoviesData();
    }
};

const moviesById = {
    type: new GraphQLList(MovieType),
    description: 'List of all stored movies, filtered by their IDs.',
    args: {
        id: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        let queryParams = utils.createQueryParamsString(args.id, 'id');
        return await MoviesService.getMoviesData(queryParams);
    }
};

export {
    allMovies,
    moviesById
};