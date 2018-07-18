import 'jest';

// NOTE: We need this modules in order to get reference data.
import axios                    from 'axios';
import { serverConf }           from '../../../../src/config';

// NOTE: These modules will be needed in order to test the query.
import { graphql, GraphQLList } from 'graphql';
import gqlSchema                from '../../../../src/graphql/schema';
import DirectorType                from '../../../../src/graphql/models/actor.type';
import { allDirectors }            from '../../../../src/graphql/queries/directors.queries';

// NOTE: This is the URL to the API where the reference data are persisted.
const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/directors`;

// NOTE: This script is designed in order to avoid unnecessary persisted data into the DD.BB.
var persistedDirectors;

const getPersistedDirectors = () => {
    return persistedDirectors;
};

const setPersistedDirectors = (persistedDirectorsData) => {
    persistedDirectors = persistedDirectorsData;
};

// NOTE: We get the reference data in order to be used on the testing suite.
beforeAll(async (done) => {
    try {
        setPersistedDirectors((await axios.get(API_REST_URL)).data);
    } catch (error) {
        console.log(`[ERROR] - (allDirectors) - Creating error: ${error.message}`);
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
            allDirectors {
                id
                name
                picture
            }
        }
    `;
};

// NOTE: This query is wrong defined in order to check that we cannot send any field name.
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
            // TODO: Define the parent values for the query.
            // TODO: Define the AST structure.
            // TODO: Define the arguments provided to the query.
            // TODO: Define the context of the GraphQL API.

            test('this test must return all persisted directors.', async (done) => {
                // TODO: Define what results we expect to receive.
                // TODO: Run the reolve function and store its result into a variable.
                
                // TODO: Check that the obtained result contains the same amount of results that we expect.

                // TODO: Check that all obtained results match with the expected ones.

                done();
            });
        });
        
        describe('Working with the \'graphql\' method ...', () => {
            // TODO: Define the parent values for the query.
            // TODO: Define the context of the GraphQL API.
            // TODO: Define the variables for the query. It will be equal NULL.

            test('with a valid query, it must be returned all persisted directors.', async (done) => {
                // TODO: Get the query to be run.
                // TODO: Obtain the expected result.
                // TODO: Run the query and store the result into a variable.

                // TODO: Check that the obtained result is not null nor undefined.
                // TODO: Check that obtained data is not null nor undefined.
                // TODO: Check that query result is not null nor undefined and in addition, it contains the expected amount of data.

                // TODO: Check that the whole obtained data match with the expected ones.

                done();
            });
            test('with a wrong query, it must be returned an error.', async (done) => {
                // TODO: Get the query to be run.
                // TODO: Define the error message that it's expected.
                // TODO: Run the query and store the result into a variable.

                // TODO: Check that the obtained result is not null nor undefined.
                // TODO: Check that we have not received the 'data' field.
                // TODO: Check that the 'errors' field is defined and have a length of one element.
                // TODO: Check that the error message is defined and it maches with the expected one.

                done();
            });
        });
    });
});