import 'jest';

import axios                    from 'axios';
import { serverConf }           from '../../../../src/config';

import { graphql, GraphQLList } from 'graphql';
import gqlSchema                from '../../../../src/graphql/schema';
import DirectorType                from '../../../../src/graphql/models/actor.type';
import { allDirectors }            from '../../../../src/graphql/queries/directors.queries';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/directors`;

var persistedDirectors;

const getPersistedDirectors = () => {
    return persistedDirectors;
};

const setPersistedDirectors = (persistedDirectorsData) => {
    persistedDirectors = persistedDirectorsData;
};

beforeAll(async (done) => {
    try {
        setPersistedDirectors((await axios.get(API_REST_URL)).data);
    } catch (error) {
        console.log(`[ERROR] - (allDirectors) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

const mockedParentValues = {};
const mockedArgs = {};
const mockedContext = {};

const getValidQuery = () => {
    return `
        query {
            allDirectors {
                id
                name
                picture
            }
        }
    `;
};

const getWrongQuery = () => {
    return `
        query {
            allDirectors {
                id
                testingWrongField
            }
        }
    `;
};

describe('[ GraphQL ] - Testing \'Director\' queries ...', () => {
    describe('Testing \'allDirectors\' ...', () => {
        describe('Working directly with the \'resolve\' method ...', () => {
            const parentValues = mockedParentValues;
            const astData = {
                fieldName: 'allDirectors',
                returnType: new GraphQLList(DirectorType),
                path: { key: 'allDirectors' },
                schema: gqlSchema
            };
            let args = mockedArgs;
            let context = mockedContext;

            test('this test must return all persisted directors.', async (done) => {
                let expectedResult = getPersistedDirectors();
                let obtainedResult = await allDirectors.resolve(parentValues, args, context, astData);
                
                expect(obtainedResult).toHaveLength(expectedResult.length);

                expectedResult.map(expectedDirector => {
                    let obtainedDirector = obtainedResult.filter(actor => actor.id === expectedDirector.id)[0];

                    expect(obtainedDirector).not.toBeNull();
                    expect(obtainedDirector).toMatchObject(expectedDirector);
                });

                done();
            });
        });
        
        describe('Working with the \'graphql\' method ...', () => {
            const parentValues = mockedParentValues;
            const context = mockedContext;
            const variables = null;

            test('with a valid query, it must be returned all persisted directors.', async (done) => {
                let query = getValidQuery();
                let expectedResult = getPersistedDirectors();
                let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).not.toBeNull();
                expect(obtainedResult.data).not.toBeUndefined();
                expect(obtainedResult.data.allDirectors).not.toBeNull();
                expect(obtainedResult.data.allDirectors).not.toBeUndefined();
                expect(obtainedResult.data.allDirectors).toHaveLength(expectedResult.length);

                expectedResult.map(expectedDirector => {
                    let obtainedDirector = obtainedResult.data.allDirectors.filter(actor => actor.id === expectedDirector.id)[0];

                    expect(obtainedDirector).not.toBeNull();

                    // expect(obtainedDirector).toMatchObject(expectedDirector); It doesn't work 'cos GQL returns fields moved.

                    expect(obtainedDirector.name).toBe(expectedDirector.name);
                    expect(obtainedDirector.picture).toBe(expectedDirector.picture);
                });

                done();
            });
            test('with a wrong query, it must be returned an error.', async (done) => {
                let query = getWrongQuery();
                let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Director\".';
                let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).toBeUndefined();
                expect(obtainedResult.errors).not.toBeNull();
                expect(obtainedResult.errors).not.toBeUndefined();
                expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                expect(obtainedResult.errors[0].message).not.toBeNull();
                expect(obtainedResult.errors[0].message).not.toBeUndefined();
                expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                done();
            });
        });
    });
});