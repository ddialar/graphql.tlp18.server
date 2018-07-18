import 'jest';
import * as graphql from 'graphql';
import DirectorType from '../../../src/graphql/models/director.type';
import MovieType    from '../../../src/graphql/models/movie.type';

const allowedFields = [
    'id',
    'name',
    'picture',
    'movies'
];

describe('[ GraphQL ] - Testing \'DirectorType\' ...', () => {
    test('fields integrity.', () => {
        let roleFields = DirectorType.getFields();

        expect(DirectorType).toBeInstanceOf(graphql.GraphQLObjectType);

        expect(Object.keys(roleFields)).toHaveLength(allowedFields.length);

        expect(roleFields).toHaveProperty('id');
        expect(roleFields.id.type).toMatchObject(graphql.GraphQLInt);
        expect(roleFields).toHaveProperty('name');
        expect(roleFields.name.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('picture');
        expect(roleFields.picture.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('movies');
        expect(roleFields.movies.type).toMatchObject(new graphql.GraphQLList(MovieType));
    });
});