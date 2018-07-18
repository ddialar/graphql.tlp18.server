import 'jest';
import * as graphql from 'graphql';
import MovieType    from '../../../src/graphql/models/movie.type';
import ActorType    from '../../../src/graphql/models/actor.type';
import DirectorType from '../../../src/graphql/models/director.type';
import WriterType   from '../../../src/graphql/models/writer.type';
import GenreType    from '../../../src/graphql/models/genre.type';

const allowedFields = [
    'id',
    'title',
    'description',
    'poster_image',
    'duration',
    'rating',
    'classification',
    'year',
    'directors',
    'writers',
    'actors',
    'genres',
    'genresAsArray'
];

describe('[ GraphQL ] - Testing \'MovieType\' ...', () => {
    test('fields integrity.', () => {
        let roleFields = MovieType.getFields();

        expect(MovieType).toBeInstanceOf(graphql.GraphQLObjectType);

        expect(Object.keys(roleFields)).toHaveLength(allowedFields.length);

        expect(roleFields).toHaveProperty('id');
        expect(roleFields.id.type).toMatchObject(graphql.GraphQLInt);
        expect(roleFields).toHaveProperty('title');
        expect(roleFields.title.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('description');
        expect(roleFields.description.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('poster_image');
        expect(roleFields.poster_image.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('duration');
        expect(roleFields.duration.type).toMatchObject(graphql.GraphQLInt);
        expect(roleFields).toHaveProperty('rating');
        expect(roleFields.rating.type).toMatchObject(graphql.GraphQLFloat);
        expect(roleFields).toHaveProperty('classification');
        expect(roleFields.classification.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('year');
        expect(roleFields.year.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('directors');
        expect(roleFields.directors.type).toMatchObject(new graphql.GraphQLList(DirectorType));
        expect(roleFields).toHaveProperty('writers');
        expect(roleFields.writers.type).toMatchObject(new graphql.GraphQLList(WriterType));
        expect(roleFields).toHaveProperty('actors');
        expect(roleFields.actors.type).toMatchObject(new graphql.GraphQLList(ActorType));
        expect(roleFields).toHaveProperty('genres');
        expect(roleFields.genres.type).toMatchObject(new graphql.GraphQLList(GenreType));
        expect(roleFields).toHaveProperty('genresAsArray');
        expect(roleFields.genresAsArray.type).toMatchObject(new graphql.GraphQLList(graphql.GraphQLString));
    });
});