import {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import DirectorType from '../models/director.type';

import * as DirectorsService from '../../services/directors.service';
import * as MoviesDirectorsService from '../../services/movies-directors.service';

const createDirector = {
    type: DirectorType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString },
        movies: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedDirectorData = await DirectorsService.persistNewDirector(args);

            if (args.movies) {
                await MoviesDirectorsService.addMoviesToDirector(persistedDirectorData.id, args.movies);
            }
            
            return persistedDirectorData;
        } catch (error) {
            return error;
        }
    }
};

const updateDirector = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLString }
    },
    resolve: async (parentValues, args) => {
        try {
            return await DirectorsService.updateDirector(args);
        } catch (error) {
            return error;
        }
    }
};

const deleteDirector = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (parentValues, args) => {
        try {
            return await DirectorsService.deleteDirector(args.id);
        } catch (error) {
            return error;
        }
    }
};

const addMoviesToDirector = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            let persistedDirectorMoviesData = await MoviesDirectorsService.addMoviesToDirector(args.id, args.movies);

            if (persistedDirectorMoviesData) {
                return await DirectorsService.getDirectorsData(args.id);
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }
};

const deleteDirectorMovies = {
    type: DirectorType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        movies: { type:new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (parentValues, args) => {
        try {
            await MoviesDirectorsService.deleteDirectorMovies(args.id, args.movies);
            return await DirectorsService.getDirectorsData(args.id);
        } catch (error) {
            return error;
        }
    }
};

export {
    createDirector,
    updateDirector,
    deleteDirector,
    addMoviesToDirector,
    deleteDirectorMovies
};