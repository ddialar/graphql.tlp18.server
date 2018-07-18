import { GraphQLObjectType } from 'graphql';

import * as DirectorsQuery from './directors.queries';
import * as WritersQuery from './writers.queries';
import * as ActorsQuery from './actors.queries';
import * as GenresQuery from './genres.queries';
import * as MoviesQuery from './movies.queries';

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        allDirectors: DirectorsQuery.allDirectors,
        directorsById: DirectorsQuery.directorsById,

        allWriters: WritersQuery.allWriters,
        writersById: WritersQuery.writersById,

        allActors: ActorsQuery.allActors,
        actorsById: ActorsQuery.actorsById,

        allGenres: GenresQuery.allGenres,
        genresById: GenresQuery.genresById,

        allMovies: MoviesQuery.allMovies,
        moviesById: MoviesQuery.moviesById,
    })
});

export default RootQueryType;