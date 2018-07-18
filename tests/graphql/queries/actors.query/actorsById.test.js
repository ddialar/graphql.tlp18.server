import 'jest';

import axios                    from 'axios';
import { serverConf }           from '../../../../src/config';

import { graphql, GraphQLList } from 'graphql';
import gqlSchema                from '../../../../src/graphql/schema';
import ActorType                from '../../../../src/graphql/models/actor.type';
import { actorsById }           from '../../../../src/graphql/queries/actors.queries';

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
        console.log(`[ERROR] - (actorsById) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

const mockedParentValues = {};
const mockedContext = {};

const getValidQuery = () => {
    return `
        query ($id: [Int]) {
            actorsById(id: $id) {
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
        query ($id: [Int]) {
            actorsById(id: $id) {
                id
                testingWrongField
            }
        }
    `;
};

describe('[ GraphQL ] - Testing \'Actor\' queries ...', () => {
    describe('Testing \'actorsById\' ...', () => {
        describe('Working directly with the \'resolve\' method ...', () => {
            const parentValues = mockedParentValues;
            const astData = {
                fieldName: 'actorsById',
                returnType: new GraphQLList(ActorType),
                path: { key: 'actorsById' },
                schema: gqlSchema
            };
            let context = mockedContext;
            
            test('with \'args\' set to null, it must return an error.', async (done) => {
                let args = null;
                let expectedError = new Error('Cannot read property \'id\' of null');
                let obtainedError;
                
                try { 
                    await actorsById.resolve(parentValues, args, context, astData);
                } catch (error) {
                    obtainedError = error;
                }

                expect(obtainedError).toMatchObject(expectedError);

                done();
            });
            test('with \'args.id\' set to value different that array of values, it must return an error.', async (done) => {
                let args = {
                    id: 1
                };
                let expectedError = new Error('It\'s needed a list of values in order to create a query params string.');
                let obtainedError;
                
                try { 
                    await actorsById.resolve(parentValues, args, context, astData);
                } catch (error) {
                    obtainedError = error;
                }

                expect(obtainedError).toMatchObject(expectedError);

                done();
            });
            test('with \'args.id\' set to an array of values String type, it must returns an empty array due to IDs doesn\'t work with letters.', async (done) => {
                let args = {
                    id: ['a', 'b', 'c']
                };
                let expectedResult = [];
                let obtainedResult = await actorsById.resolve(parentValues, args, context, astData);

                expect(obtainedResult).toMatchObject(expectedResult);

                done();
            });
            test('with \'args.id\' set to an array of values Integer type, it must returns an empty array due to IDs doesn\'t work with letters.', async (done) => {
                let args = {
                    id: [1, 2, 3]
                };
                let expectedResult = getPersistedActors().filter(actor => args.id.includes(actor.id));
                let obtainedResult = await actorsById.resolve(parentValues, args, context, astData);

                expect(obtainedResult).toHaveLength(expectedResult.length);

                expectedResult.map(expectedActor => {
                    let obtainedActor = obtainedResult.filter(actor => actor.id === expectedActor.id)[0];

                    expect(obtainedActor).not.toBeNull();
                    expect(obtainedActor.name).toBe(expectedActor.name);
                    expect(obtainedActor.picture).toBe(expectedActor.picture);
                    expect(obtainedActor.born).toBe(expectedActor.born);
                    expect(obtainedActor.height).toBe(expectedActor.height);
                    expect(obtainedActor.country).toBe(expectedActor.country);
                });

                done();
            });
        });
        
        describe('Working with the \'graphql\' method ...', () => {
            const parentValues = mockedParentValues;
            const context = mockedContext;

            describe('and a valid query ...', () => {
                test('with \'variables\' set to null, it must return an error.', async (done) => {
                    let query = getValidQuery();
                    const variables = null;
                    let expectedErrorMessage = 'It\'s needed a list of values in order to create a query params string.';
                    let expectedDataObject = { actorsById: null };
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.errors).not.toBeNull();
                    expect(obtainedResult.errors).not.toBeUndefined();
                    expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    expect(obtainedResult.errors[0].message).not.toBeNull();
                    expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data).toMatchObject(expectedDataObject);

                    done();
                });
                test('with \'variables.id\' set to null, it must return an error.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: null
                    };
                    let expectedErrorMessage = 'It\'s needed a list of values in order to create a query params string.';
                    let expectedDataObject = { actorsById: null };
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.errors).not.toBeNull();
                    expect(obtainedResult.errors).not.toBeUndefined();
                    expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    expect(obtainedResult.errors[0].message).not.toBeNull();
                    expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data).toMatchObject(expectedDataObject);

                    done();
                });
                test('with \'variables.id\' set to String value, it must return an error.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: 'testingValue'
                    };
                    let expectedErrorMessage = 'Variable \"$id\" got invalid value \"testingValue\".';
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.errors).not.toBeNull();
                    expect(obtainedResult.errors).not.toBeUndefined();
                    expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    expect(obtainedResult.errors[0].message).not.toBeNull();
                    expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    expect(obtainedResult.errors[0].message).toMatch(expectedErrorMessage);
                    expect(obtainedResult.data).toBeUndefined();

                    done();
                });
                test('with \'variables.id\' set to Array of Strings, it must return an error.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: ['a', 'b', 'c']
                    };
                    let expectedErrorMessage = 'Variable \"$id\" got invalid value [\"a\",\"b\",\"c\"].';
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.errors).not.toBeNull();
                    expect(obtainedResult.errors).not.toBeUndefined();
                    expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    expect(obtainedResult.errors[0].message).not.toBeNull();
                    expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    expect(obtainedResult.errors[0].message).toMatch(expectedErrorMessage);
                    expect(obtainedResult.data).toBeUndefined();

                    done();
                });
                test('with \'variables.id\' set to single Integer value, it must return the actor\'s data with the defined ID.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: 1
                    };
                    let expectedResult = getPersistedActors().find(actor => actor.id === variables.id);
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).not.toBeNull();
                    expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).toHaveLength(1);
                    expect(obtainedResult.data.actorsById[0].id).toBe(expectedResult.id);
                    expect(obtainedResult.data.actorsById[0].name).toBe(expectedResult.name);
                    expect(obtainedResult.data.actorsById[0].picture).toBe(expectedResult.picture);
                    expect(obtainedResult.data.actorsById[0].born).toBe(expectedResult.born);
                    expect(obtainedResult.data.actorsById[0].height).toBe(expectedResult.height);
                    expect(obtainedResult.data.actorsById[0].country).toBe(expectedResult.country);

                    done();
                });
                test('with \'variables.id\' set to Array of Integer values, it must return the actor\'s data with the defined ID.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: [1, 2, 3]
                    };
                    let expectedResult = getPersistedActors().filter(actor => variables.id.includes(actor.id));
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).not.toBeNull();
                    expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).toHaveLength(expectedResult.length);

                    expectedResult.map(expectedActor => {
                        let obtainedActor = obtainedResult.data.actorsById.filter(actor => actor.id === expectedActor.id)[0];

                        expect(obtainedActor).not.toBeNull();

                        expect(obtainedActor.name).toBe(expectedActor.name);
                        expect(obtainedActor.picture).toBe(expectedActor.picture);
                        expect(obtainedActor.born).toBe(expectedActor.born);
                        expect(obtainedActor.height).toBe(expectedActor.height);
                        expect(obtainedActor.country).toBe(expectedActor.country);
                    });

                    done();
                });
                test('with \'variables.id\' set to single Integer value out of range, it must return an empty array.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: 999
                    };
                    let expectedResult = [];
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).not.toBeNull();
                    expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).toMatchObject(expectedResult);

                    done();
                });
                test('with \'variables.id\' set to Array of Integer values out of range, it must return an empty array.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: [999, 1001, 2002]
                    };
                    let expectedResult = [];
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).not.toBeNull();
                    expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    expect(obtainedResult.data.actorsById).toMatchObject(expectedResult);

                    done();
                });
            });

            describe('and a wrong query ...', () => {
                test('with \'variables\' set to null, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = null;
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
                test('with \'variables.id\' set to null, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: null
                    };
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
                test('with \'variables.id\' set to String value, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: 'testingValue'
                    };
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
                test('with \'variables.id\' set to Array of Strings, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: ['a', 'b', 'c']
                    };
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
                test('with \'variables.id\' set to single Integer value, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: 1
                    };
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
                test('with \'variables.id\' set to Array of Integer values, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: [1, 2, 3]
                    };
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
                test('with \'variables.id\' set to single Integer value out of range, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: 999
                    };
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
                test('with \'variables.id\' set to Array of Integer values out of range, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: [999, 1001, 2002]
                    };
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
});