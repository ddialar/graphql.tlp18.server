import 'jest';
import * as graphql from 'graphql';
import ActorType    from '../../../src/graphql/models/actor.type';
import MovieType    from '../../../src/graphql/models/movie.type';

const allowedFields = [
    'id',
    'name',
    'picture',
    'born',
    'height',
    'country',
    'movies'
];

describe('[ GraphQL ] - Testing \'ActorType\' ...', () => {
    test('fields integrity.', () => {
        let roleFields = ActorType.getFields();

        expect(ActorType).toBeInstanceOf(graphql.GraphQLObjectType);

        expect(Object.keys(roleFields)).toHaveLength(allowedFields.length);

        expect(roleFields).toHaveProperty('id');
        expect(roleFields.id.type).toMatchObject(graphql.GraphQLInt);
        expect(roleFields).toHaveProperty('name');
        expect(roleFields.name.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('picture');
        expect(roleFields.picture.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('born');
        expect(roleFields.born.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('height');
        expect(roleFields.height.type).toMatchObject(graphql.GraphQLFloat);
        expect(roleFields).toHaveProperty('country');
        expect(roleFields.country.type).toMatchObject(graphql.GraphQLString);
        expect(roleFields).toHaveProperty('movies');
        expect(roleFields.movies.type).toMatchObject(new graphql.GraphQLList(MovieType));
    });
});