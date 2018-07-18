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
            // TODO: Define the parent values for the query.
            // const parentValues = mockedParentValues;
            // TODO: Define the AST object structure.
            // const astData = {
            //     fieldName: 'actorsById',
            //     returnType: new GraphQLList(ActorType),
            //     path: { key: 'actorsById' },
            //     schema: gqlSchema
            // };
            // TODO: Define the GraphQL API context.
            // let context = mockedContext;
            
            test.skip('with \'args\' set to null, it must return an error.', async (done) => {
                // TODO: Define the query arguments as NULL.
                // let args = null;
                // TODO: Define the expected error.
                // let expectedError = new Error('Cannot read property \'id\' of null');
                // TODO: Define the variable that will store the obtained error.
                // let obtainedError;
                
                // TODO: Run the query and get the obtained error, using a TRY/CATCH block.
                // try { 
                //     await actorsById.resolve(parentValues, args, context, astData);
                // } catch (error) {
                //     obtainedError = error;
                // }

                // TODO: Check that obtained error matches with the expected one.
                // expect(obtainedError).toMatchObject(expectedError);

                done();
            });
            test.skip('with \'args.id\' set to value different that array of values, it must return an error.', async (done) => {
                // TODO: Define the query arguments to the willed testing value.
                // let args = {
                //     id: 1
                // };
                // TODO: Define the expected error.
                // let expectedError = new Error('It\'s needed a list of values in order to create a query params string.');
                // TODO: Define the variable that will store the obtained error.
                // let obtainedError;
                
                // TODO: Run the query and get the obtained error, using a TRY/CATCH block.
                // try { 
                //     await actorsById.resolve(parentValues, args, context, astData);
                // } catch (error) {
                //     obtainedError = error;
                // }

                // TODO: Check that obtained error matches with the expected one.
                // expect(obtainedError).toMatchObject(expectedError);

                done();
            });
            test.skip('with \'args.id\' set to an array of values String type, it must returns an empty array due to IDs doesn\'t work with letters.', async (done) => {
                // TODO: Define the query arguments to the willed testing value.
                // let args = {
                //     id: ['a', 'b', 'c']
                // };
                // TODO: Define the expected result.
                // let expectedResult = [];
                // TODO: Run the query and store the obtained result into a variable.
                // let obtainedResult = await actorsById.resolve(parentValues, args, context, astData);

                // TODO: Check that obtained result matches with the expected one.
                // expect(obtainedResult).toMatchObject(expectedResult);

                done();
            });
            test.skip('with \'args.id\' set to an array of values Integer type, it must returns an empty array due to IDs doesn\'t work with letters.', async (done) => {
                // TODO: Define the query arguments to the willed testing value.
                // let args = {
                //     id: [1, 2, 3]
                // };
                // TODO: Define the expected result.
                // let expectedResult = getPersistedActors().filter(actor => args.id.includes(actor.id));
                // TODO: Run the query and store the obtained result into a variable.
                // let obtainedResult = await actorsById.resolve(parentValues, args, context, astData);

                // TODO: Check that we have obtained the same amount of results that we expect.
                // expect(obtainedResult).toHaveLength(expectedResult.length);

                // TODO: Check that every obtained object matches with the expected result.
                // expectedResult.map(expectedActor => {
                //     let obtainedActor = obtainedResult.filter(actor => actor.id === expectedActor.id)[0];

                //     expect(obtainedActor).not.toBeNull();
                //     expect(obtainedActor.name).toBe(expectedActor.name);
                //     expect(obtainedActor.picture).toBe(expectedActor.picture);
                //     expect(obtainedActor.born).toBe(expectedActor.born);
                //     expect(obtainedActor.height).toBe(expectedActor.height);
                //     expect(obtainedActor.country).toBe(expectedActor.country);
                // });

                done();
            });
        });
        
        describe('Working with the \'graphql\' method ...', () => {
            // TODO: Define the parent values for the query.
            // const parentValues = mockedParentValues;
            // TODO: Define the GraphQL API context.
            // const context = mockedContext;

            describe('and a valid query ...', () => {
                test.skip('with \'variables\' set to null, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query. It must be equal to NULL.
                    // const variables = null;
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'It\'s needed a list of values in order to create a query params string.';
                    // TODO: Define the expected data object.
                    // let expectedDataObject = { actorsById: null };
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);
                    // TODO: Check that we have received a 'data' field and it's not null nor undefined and
                    //       it matches with the defined one.
                    // expect(obtainedResult.data).not.toBeNull();
                    // expect(obtainedResult.data).not.toBeUndefined();
                    // expect(obtainedResult.data).toMatchObject(expectedDataObject);

                    done();
                });
                test.skip('with \'variables.id\' set to null, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: null
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'It\'s needed a list of values in order to create a query params string.';
                    // TODO: Define the expected data object.
                    // let expectedDataObject = { actorsById: null };
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);
                    // TODO: Check that we have received a 'data' field and it's not null nor undefined and
                    //       it matches with the defined one.
                    // expect(obtainedResult.data).not.toBeNull();
                    // expect(obtainedResult.data).not.toBeUndefined();
                    // expect(obtainedResult.data).toMatchObject(expectedDataObject);

                    done();
                });
                test.skip('with \'variables.id\' set to String value, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: 'testingValue'
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Variable \"$id\" got invalid value \"testingValue\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);
                    // TODO: Check that we have not received any 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Strings, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: ['a', 'b', 'c']
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Variable \"$id\" got invalid value [\"a\",\"b\",\"c\"].';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);
                    // TODO: Check that we have not received any 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value, it must return the actor\'s data with the defined ID.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: 1
                    // };
                    // TODO: Define the expected result.
                    // let expectedResult = getPersistedActors().find(actor => actor.id === variables.id);
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // expect(obtainedResult.data).not.toBeNull();
                    // expect(obtainedResult.data).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it contains an element.
                    // expect(obtainedResult.data.actorsById).not.toBeNull();
                    // expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    // expect(obtainedResult.data.actorsById).toHaveLength(1);
                    // TODO: Check that the obtained element matches with the expected result.
                    // expect(obtainedResult.data.actorsById[0].id).toBe(expectedResult.id);
                    // expect(obtainedResult.data.actorsById[0].name).toBe(expectedResult.name);
                    // expect(obtainedResult.data.actorsById[0].picture).toBe(expectedResult.picture);
                    // expect(obtainedResult.data.actorsById[0].born).toBe(expectedResult.born);
                    // expect(obtainedResult.data.actorsById[0].height).toBe(expectedResult.height);
                    // expect(obtainedResult.data.actorsById[0].country).toBe(expectedResult.country);

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values, it must return the actor\'s data with the defined ID.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: [1, 2, 3]
                    // };
                    // TODO: Define the expected result.
                    // let expectedResult = getPersistedActors().filter(actor => variables.id.includes(actor.id));
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // expect(obtainedResult.data).not.toBeNull();
                    // expect(obtainedResult.data).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it contains an element.
                    // expect(obtainedResult.data.actorsById).not.toBeNull();
                    // expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    // expect(obtainedResult.data.actorsById).toHaveLength(expectedResult.length);

                    // TODO: Check that all obtained results match with the expected ones.
                    // expectedResult.map(expectedActor => {
                    //     let obtainedActor = obtainedResult.data.actorsById.filter(actor => actor.id === expectedActor.id)[0];

                    //     expect(obtainedActor).not.toBeNull();

                    //     expect(obtainedActor.name).toBe(expectedActor.name);
                    //     expect(obtainedActor.picture).toBe(expectedActor.picture);
                    //     expect(obtainedActor.born).toBe(expectedActor.born);
                    //     expect(obtainedActor.height).toBe(expectedActor.height);
                    //     expect(obtainedActor.country).toBe(expectedActor.country);
                    // });

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value out of range, it must return an empty array.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: 999
                    // };
                    // TODO: Define the expected result.
                    // let expectedResult = [];
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // expect(obtainedResult.data).not.toBeNull();
                    // expect(obtainedResult.data).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it matches with the expected result.
                    // expect(obtainedResult.data.actorsById).not.toBeNull();
                    // expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    // expect(obtainedResult.data.actorsById).toMatchObject(expectedResult);

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values out of range, it must return an empty array.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getValidQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: [999, 1001, 2002]
                    // };
                    // TODO: Define the expected result.
                    // let expectedResult = [];
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // expect(obtainedResult.data).not.toBeNull();
                    // expect(obtainedResult.data).not.toBeUndefined();
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it matches with the expected result.
                    // expect(obtainedResult.data.actorsById).not.toBeNull();
                    // expect(obtainedResult.data.actorsById).not.toBeUndefined();
                    // expect(obtainedResult.data.actorsById).toMatchObject(expectedResult);

                    done();
                });
            });

            describe('and a wrong query ...', () => {
                test.skip('with \'variables\' set to null, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getWrongQuery();
                    // TODO: Define the variables for the query.
                    // const variables = null;
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                    done();
                });
                test.skip('with \'variables.id\' set to null, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getWrongQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: null
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                    done();
                });
                test.skip('with \'variables.id\' set to String value, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getWrongQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: 'testingValue'
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Strings, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getWrongQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: ['a', 'b', 'c']
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);;

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getWrongQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: 1
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getWrongQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: [1, 2, 3]
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value out of range, it must return an error due to wrong field.', async (done) => {
                    // let query = getWrongQuery();
                    // const variables = {
                    //     id: 999
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values out of range, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // let query = getWrongQuery();
                    // TODO: Define the variables for the query.
                    // const variables = {
                    //     id: [999, 1001, 2002]
                    // };
                    // TODO: Define the expected error.
                    // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                    // TODO: Run the query and store the obtained result into a variable.
                    // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                    // TODO: Check that the obtained result is not null nor undefined.
                    // expect(obtainedResult).not.toBeNull();
                    // expect(obtainedResult).not.toBeUndefined();
                    // TODO: Check that we have not received eny 'data' field.
                    // expect(obtainedResult.data).toBeUndefined();
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // expect(obtainedResult.errors).not.toBeNull();
                    // expect(obtainedResult.errors).not.toBeUndefined();
                    // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // expect(obtainedResult.errors[0].message).not.toBeNull();
                    // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                    // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                    done();
                });
            });
        });
    });
});