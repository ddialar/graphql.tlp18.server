import 'jest';

import axios                    from 'axios';
import { serverConf }           from '../../../../src/config';

import { graphql, GraphQLList } from 'graphql';
import gqlSchema                from '../../../../src/graphql/schema';
import ActorType                from '../../../../src/graphql/models/actor.type';
import { allActors }            from '../../../../src/graphql/queries/actors.queries';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/actors`;

var persistedActors;

const getPersistedActors = () => {
    return persistedActors;
};

const setPersistedActors = (persistedActorsData) => {
    persistedActors = persistedActorsData;
};

beforeAll(async (done) => {
    try {
        setPersistedActors((await axios.get(API_REST_URL)).data);
    } catch (error) {
        console.log(`[ERROR] - (allActors) - Creating error: ${error.message}`);
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
            allActors {
                id
                name
                picture
                born
                height
                country
            }
        }
    `;
};

const getWrongQuery = () => {
    return `
        query {
            allActors {
                id
                testingWrongField
            }
        }
    `;
};

describe('[ GraphQL ] - Testing \'Actor\' queries ...', () => {
    describe('Testing \'allActors\' ...', () => {
        describe('Working directly with the \'resolve\' method ...', () => {
            const parentValues = mockedParentValues;
            const astData = {
                fieldName: 'allActors',
                returnType: new GraphQLList(ActorType),
                path: { key: 'allActors' },
                schema: gqlSchema
            };
            let args = mockedArgs;
            let context = mockedContext;

            test('this test must return all persisted actors.', async (done) => {
                let expectedResult = getPersistedActors();
                let obtainedResult = await allActors.resolve(parentValues, args, context, astData);
                
                expect(obtainedResult).toHaveLength(expectedResult.length);

                expectedResult.map(expectedActor => {
                    let obtainedActor = obtainedResult.filter(actor => actor.id === expectedActor.id)[0];

                    expect(obtainedActor).not.toBeNull();
                    expect(obtainedActor).toMatchObject(expectedActor);
                });

                done();
            });
        });
        
        describe('Working with the \'graphql\' method ...', () => {
            const parentValues = mockedParentValues;
            const context = mockedContext;
            const variables = null;

            test('with a valid query, it must be returned all persisted actors.', async (done) => {
                let query = getValidQuery();
                let expectedResult = getPersistedActors();
                let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).not.toBeNull();
                expect(obtainedResult.data).not.toBeUndefined();
                expect(obtainedResult.data.allActors).not.toBeNull();
                expect(obtainedResult.data.allActors).not.toBeUndefined();
                expect(obtainedResult.data.allActors).toHaveLength(expectedResult.length);

                expectedResult.map(expectedActor => {
                    let obtainedActor = obtainedResult.data.allActors.filter(actor => actor.id === expectedActor.id)[0];

                    expect(obtainedActor).not.toBeNull();

                    // expect(obtainedActor).toMatchObject(expectedActor); It doesn't work 'cos GQL returns fields moved.

                    expect(obtainedActor.name).toBe(expectedActor.name);
                    expect(obtainedActor.picture).toBe(expectedActor.picture);
                    expect(obtainedActor.born).toBe(expectedActor.born);
                    expect(obtainedActor.height).toBe(expectedActor.height);
                    expect(obtainedActor.country).toBe(expectedActor.country);
                });

                done();
            });
            test('with a wrong query, it must be returned an error.', async (done) => {
                let query = getWrongQuery();
                let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
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