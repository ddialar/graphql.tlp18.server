import 'jest';

import axios                    from 'axios';
import { serverConf }           from '../../../../src/config';

import { graphql, GraphQLList } from 'graphql';
import gqlSchema                from '../../../../src/graphql/schema';
import DirectorType                from '../../../../src/graphql/models/director.type';
import { directorsById }           from '../../../../src/graphql/queries/directors.queries';

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
        console.log(`[ERROR] - (directorsById) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

const mockedParentValues = {};
const mockedContext = {};

const getValidQuery = () => {
    return `
        query ($id: [Int]) {
            directorsById(id: $id) {
                id
                name
                picture
            }
        }
    `;
};

const getWrongQuery = () => {
    return `
        query ($id: [Int]) {
            directorsById(id: $id) {
                id
                testingWrongField
            }
        }
    `;
};

describe('[ GraphQL ] - Testing \'Director\' queries ...', () => {
    describe('Testing \'directorsById\' ...', () => {
        describe('Working directly with the \'resolve\' method ...', () => {
            const parentValues = mockedParentValues;
            const astData = {
                fieldName: 'directorsById',
                returnType: new GraphQLList(DirectorType),
                path: { key: 'directorsById' },
                schema: gqlSchema
            };
            let context = mockedContext;
            
            test('with \'args\' set to null, it must return an error.', async (done) => {
                let args = null;
                let expectedError = new Error('Cannot read property \'id\' of null');
                let obtainedError;
                
                try { 
                    await directorsById.resolve(parentValues, args, context, astData);
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
                    await directorsById.resolve(parentValues, args, context, astData);
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
                let obtainedResult = await directorsById.resolve(parentValues, args, context, astData);

                expect(obtainedResult).toMatchObject(expectedResult);

                done();
            });
            test('with \'args.id\' set to an array of values Integer type, it must returns an empty array due to IDs doesn\'t work with letters.', async (done) => {
                let args = {
                    id: [1, 2, 3]
                };
                let expectedResult = getPersistedDirectors().filter(director => args.id.includes(director.id));
                let obtainedResult = await directorsById.resolve(parentValues, args, context, astData);

                expect(obtainedResult).toHaveLength(expectedResult.length);

                expectedResult.map(expectedDirector => {
                    let obtainedDirector = obtainedResult.filter(director => director.id === expectedDirector.id)[0];

                    expect(obtainedDirector).not.toBeNull();
                    expect(obtainedDirector.name).toBe(expectedDirector.name);
                    expect(obtainedDirector.picture).toBe(expectedDirector.picture);
                    expect(obtainedDirector.born).toBe(expectedDirector.born);
                    expect(obtainedDirector.height).toBe(expectedDirector.height);
                    expect(obtainedDirector.country).toBe(expectedDirector.country);
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
                    let expectedDataObject = { directorsById: null };
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
                    let expectedDataObject = { directorsById: null };
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
                test('with \'variables.id\' set to single Integer value, it must return the director\'s data with the defined ID.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: 1
                    };
                    let expectedResult = getPersistedDirectors().find(director => director.id === variables.id);
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data.directorsById).not.toBeNull();
                    expect(obtainedResult.data.directorsById).not.toBeUndefined();
                    expect(obtainedResult.data.directorsById).toHaveLength(1);
                    expect(obtainedResult.data.directorsById[0].id).toBe(expectedResult.id);
                    expect(obtainedResult.data.directorsById[0].name).toBe(expectedResult.name);
                    expect(obtainedResult.data.directorsById[0].picture).toBe(expectedResult.picture);
                    expect(obtainedResult.data.directorsById[0].born).toBe(expectedResult.born);
                    expect(obtainedResult.data.directorsById[0].height).toBe(expectedResult.height);
                    expect(obtainedResult.data.directorsById[0].country).toBe(expectedResult.country);

                    done();
                });
                test('with \'variables.id\' set to Array of Integer values, it must return the director\'s data with the defined ID.', async (done) => {
                    let query = getValidQuery();
                    const variables = {
                        id: [1, 2, 3]
                    };
                    let expectedResult = getPersistedDirectors().filter(director => variables.id.includes(director.id));
                    let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    expect(obtainedResult).not.toBeNull();
                    expect(obtainedResult).not.toBeUndefined();
                    expect(obtainedResult.data).not.toBeNull();
                    expect(obtainedResult.data).not.toBeUndefined();
                    expect(obtainedResult.data.directorsById).not.toBeNull();
                    expect(obtainedResult.data.directorsById).not.toBeUndefined();
                    expect(obtainedResult.data.directorsById).toHaveLength(expectedResult.length);

                    expectedResult.map(expectedDirector => {
                        let obtainedDirector = obtainedResult.data.directorsById.filter(director => director.id === expectedDirector.id)[0];

                        expect(obtainedDirector).not.toBeNull();

                        expect(obtainedDirector.name).toBe(expectedDirector.name);
                        expect(obtainedDirector.picture).toBe(expectedDirector.picture);
                        expect(obtainedDirector.born).toBe(expectedDirector.born);
                        expect(obtainedDirector.height).toBe(expectedDirector.height);
                        expect(obtainedDirector.country).toBe(expectedDirector.country);
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
                    expect(obtainedResult.data.directorsById).not.toBeNull();
                    expect(obtainedResult.data.directorsById).not.toBeUndefined();
                    expect(obtainedResult.data.directorsById).toMatchObject(expectedResult);

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
                    expect(obtainedResult.data.directorsById).not.toBeNull();
                    expect(obtainedResult.data.directorsById).not.toBeUndefined();
                    expect(obtainedResult.data.directorsById).toMatchObject(expectedResult);

                    done();
                });
            });

            describe('and a wrong query ...', () => {
                test('with \'variables\' set to null, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = null;
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
                test('with \'variables.id\' set to null, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: null
                    };
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
                test('with \'variables.id\' set to String value, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: 'testingValue'
                    };
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
                test('with \'variables.id\' set to Array of Strings, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: ['a', 'b', 'c']
                    };
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
                test('with \'variables.id\' set to single Integer value, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: 1
                    };
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
                test('with \'variables.id\' set to Array of Integer values, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: [1, 2, 3]
                    };
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
                test('with \'variables.id\' set to single Integer value out of range, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: 999
                    };
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
                test('with \'variables.id\' set to Array of Integer values out of range, it must return an error due to wrong field.', async (done) => {
                    let query = getWrongQuery();
                    const variables = {
                        id: [999, 1001, 2002]
                    };
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
});