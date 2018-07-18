import 'jest';

// NOTE: We need this modules in order to get reference data.
import axios                    from 'axios';
import { serverConf }           from '../../../../src/config';

// NOTE: These modules will be needed in order to test the query.
import { graphql, GraphQLList } from 'graphql';
import gqlSchema                from '../../../../src/graphql/schema';
import ActorType                from '../../../../src/graphql/models/actor.type';
import { allActors }            from '../../../../src/graphql/queries/actors.queries';

// NOTE: This is the URL to the API where the reference data are persisted.
const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/actors`;

// NOTE: This script is designed in order to avoid unnecessary persisted data into the DD.BB.
var persistedActors;

const getPersistedActors = () => {
    return persistedActors;
};

const setPersistedActors = (persistedActorsData) => {
    persistedActors = persistedActorsData;
};

// NOTE: We get the reference data in order to be used on the testing suite.
beforeAll(async (done) => {
    try {
        setPersistedActors((await axios.get(API_REST_URL)).data);
    } catch (error) {
        console.log(`[ERROR] - (allActors) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

// NOTE: Default definitions in order to build the query.
const mockedParentValues = {};
const mockedArgs = {};
const mockedContext = {};

// NOTE: We define the valid query that we want to test.
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

// NOTE: This query is wrong defined in order to check that we cannot send any field name.
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
            // TODO: Define the parent values for the query.
            // const parentValues = mockedParentValues;
            // TODO: Define the AST structure.
            // const astData = {
            //     fieldName: 'allActors',
            //     returnType: new GraphQLList(ActorType),
            //     path: { key: 'allActors' },
            //     schema: gqlSchema
            // };
            // TODO: Define the arguments provided to the query.
            // let args = mockedArgs;
            // TODO: Define the context of the GraphQL API.
            // let context = mockedContext;

            test('this test must return all persisted actors.', async (done) => {
                // TODO: Define what results we expect to receive.
                // let expectedResult = getPersistedActors();
                // TODO: Run the reolve function and store its result into a variable.
                // let obtainedResult = await allActors.resolve(parentValues, args, context, astData);
                
                // TODO: Check that the obtained result contains the same amount of results that we expect.
                // expect(obtainedResult).toHaveLength(expectedResult.length);

                // TODO: Check that all obtained results match with the expected ones.
                // expectedResult.map(expectedActor => {
                //     let obtainedActor = obtainedResult.filter(actor => actor.id === expectedActor.id)[0];

                //     expect(obtainedActor).not.toBeNull();
                //     expect(obtainedActor).toMatchObject(expectedActor);
                // });

                done();
            });
        });
        
        describe.skip('Working with the \'graphql\' method ...', () => {
            // TODO: Define the parent values for the query.
            // const parentValues = mockedParentValues;
            // TODO: Define the context of the GraphQL API.
            // const context = mockedContext;
            // TODO: Define the variables for the query.
            // const variables = null;

            test('with a valid query, it must be returned all persisted actors.', async (done) => {
                // TODO: Get the query to be run.
                // let query = getValidQuery();
                // TODO: Obtain the expected result.
                // let expectedResult = getPersistedActors();
                // TODO: Run the query and store the result into a variable.
                // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                // TODO: Check that the obtained result is not null nor undefined.
                // expect(obtainedResult).not.toBeNull();
                // expect(obtainedResult).not.toBeUndefined();
                // TODO: Check that obtained data is not null nor undefined.
                // expect(obtainedResult.data).not.toBeNull();
                // expect(obtainedResult.data).not.toBeUndefined();
                // TODO: Check that query result is not null nor undefined and in addition, it contains the expected amount of data.
                // expect(obtainedResult.data.allActors).not.toBeNull();
                // expect(obtainedResult.data.allActors).not.toBeUndefined();
                // expect(obtainedResult.data.allActors).toHaveLength(expectedResult.length);

                // TODO: Check that the whole obtained data match with the expected ones.
                // expectedResult.map(expectedActor => {
                //     let obtainedActor = obtainedResult.data.allActors.filter(actor => actor.id === expectedActor.id)[0];

                //     expect(obtainedActor).not.toBeNull();

                //     // expect(obtainedActor).toMatchObject(expectedActor); It doesn't work 'cos GQL returns fields moved.

                //     expect(obtainedActor.name).toBe(expectedActor.name);
                //     expect(obtainedActor.picture).toBe(expectedActor.picture);
                //     expect(obtainedActor.born).toBe(expectedActor.born);
                //     expect(obtainedActor.height).toBe(expectedActor.height);
                //     expect(obtainedActor.country).toBe(expectedActor.country);
                // });

                done();
            });
            test('with a wrong query, it must be returned an error.', async (done) => {
                // TODO: Get the query to be run.
                // let query = getWrongQuery();
                // TODO: Define the error message that it's expected.
                // let expectedErrorMessage = 'Cannot query field \"testingWrongField\" on type \"Actor\".';
                // TODO: Run the query and store the result into a variable.
                // let obtainedResult = await graphql(gqlSchema, query, parentValues, context, variables);

                // TODO: Check that the obtained result is not null nor undefined.
                // expect(obtainedResult).not.toBeNull();
                // expect(obtainedResult).not.toBeUndefined();
                // TODO: Check that we have not received the 'data' field.
                // expect(obtainedResult.data).toBeUndefined();
                // TODO: Check that the 'errors' field is defined and have a length of one element.
                // expect(obtainedResult.errors).not.toBeNull();
                // expect(obtainedResult.errors).not.toBeUndefined();
                // expect(obtainedResult.errors.length).toBeGreaterThanOrEqual(1);
                // TODO: Check that the error message is defined and it maches with the expected one.
                // expect(obtainedResult.errors[0].message).not.toBeNull();
                // expect(obtainedResult.errors[0].message).not.toBeUndefined();
                // expect(obtainedResult.errors[0].message).toBe(expectedErrorMessage);

                done();
            });
        });
    });
});