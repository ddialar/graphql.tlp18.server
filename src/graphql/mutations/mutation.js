import { GraphQLObjectType } from 'graphql';

import * as ActorsMutations from './actors.mutations';
import * as DirectorsMutations from './directors.mutations';
import * as WritersMutations from './writers.mutations';
import * as GenresMutations from './genres.mutations';
import * as MoviesMutations from './movies.mutations';

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createDirector: DirectorsMutations.createDirector,
        updateDirector: DirectorsMutations.updateDirector,
        deleteDirector: DirectorsMutations.deleteDirector,
        addMoviesToDirector: DirectorsMutations.addMoviesToDirector,
        deleteDirectorMovies: DirectorsMutations.deleteDirectorMovies,

        createWriter: WritersMutations.createWriter,
        updateWriter: WritersMutations.updateWriter,
        deleteWriter: WritersMutations.deleteWriter,
        addMoviesToWriter: WritersMutations.addMoviesToWriter,
        deleteWriterMovies: WritersMutations.deleteWriterMovies,

        createActor: ActorsMutations.createActor,
        updateActor: ActorsMutations.updateActor,
        deleteActor: ActorsMutations.deleteActor,
        addMoviesToActor: ActorsMutations.addMoviesToActor,
        deleteActorMovies: ActorsMutations.deleteActorMovies,

        createGenre: GenresMutations.createGenre,
        updateGenre: GenresMutations.updateGenre,
        deleteGenre: GenresMutations.deleteGenre,
        addMoviesToGenre: GenresMutations.addMoviesToGenre,
        deleteGenreMovies: GenresMutations.deleteGenreMovies,

        createMovie: MoviesMutations.createMovie,
        updateMovie: MoviesMutations.updateMovie,
        deleteMovie: MoviesMutations.deleteMovie
    })
});

export default MutationType;
