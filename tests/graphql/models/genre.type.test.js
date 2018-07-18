import 'jest';
import * as graphql from 'graphql';
import GenreType    from '../../../src/graphql/models/genre.type';
import MovieType    from '../../../src/graphql/models/movie.type';

const allowedFields = [
    'id',
    'name',
    'movies'
];

describe('[ GraphQL ] - Testing \'GenreType\' ...', () => {
    test('fields integrity.', () => {
        let roleFields = GenreType.getFields();

        expect(GenreType).toBeInstanceOf(graphql.GraphQLObjectType);

        expect(Object.keys(roleFields)).toHaveLength(allowedFields.length);

        expect(roleFields).toHaveProperty('id');
        expect(roleFields.id.type).toMatchObject(graphql.GraphQLInt);
        expect(roleFields).toHaveProperty('name');
        expect(roleFields.name.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('movies');
        expect(roleFields.movies.type).toMatchObject(new graphql.GraphQLList(MovieType));
    });
});