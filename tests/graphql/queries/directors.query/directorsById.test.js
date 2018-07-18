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
            // TODO: Define the parent values for the query.
            // TODO: Define the AST object structure.
            // TODO: Define the GraphQL API context.
            
            test.skip('with \'args\' set to null, it must return an error.', async (done) => {
                // TODO: Define the query arguments as NULL.
                // TODO: Define the expected error.
                // TODO: Define the variable that will store the obtained error.
                // TODO: Run the query and get the obtained error, using a TRY/CATCH block.
                // TODO: Check that obtained error matches with the expected one.
                
                done();
            });
            test.skip('with \'args.id\' set to value different that array of values, it must return an error.', async (done) => {
                // TODO: Define the query arguments to the willed testing value ('id' equal to a single Integer value).
                // TODO: Define the expected error.
                // TODO: Define the variable that will store the obtained error.
                // TODO: Run the query and get the obtained error, using a TRY/CATCH block.
                // TODO: Check that obtained error matches with the expected one.

                done();
            });
            test.skip('with \'args.id\' set to an array of values String type, it must returns an empty array due to IDs doesn\'t work with letters.', async (done) => {
                // TODO: Define the query arguments to the willed testing value ('id' equal to array of characters).
                // TODO: Define the expected result.
                // TODO: Run the query and store the obtained result into a variable.
                // TODO: Check that obtained result matches with the expected one.

                done();
            });
            test.skip('with \'args.id\' set to an array of values Integer type, it must returns an empty array due to IDs doesn\'t work with letters.', async (done) => {
                // TODO: Define the query arguments to the willed testing value ('id' equal to array of Integers).
                // TODO: Define the expected result.
                // TODO: Run the query and store the obtained result into a variable.
                // TODO: Check that we have obtained the same amount of results that we expect.
                // TODO: Check that every obtained object matches with the expected result.

                done();
            });
        });
        
        describe('Working with the \'graphql\' method ...', () => {
            // TODO: Define the parent values for the query (use the mocked objects).
            // TODO: Define the GraphQL API context (use the mocked objects).

            describe('and a valid query ...', () => {
                test.skip('with \'variables\' set to null, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query. It must be equal to NULL.
                    // TODO: Define the expected error.
                    // TODO: Define the expected data object.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // TODO: Check that we have received a 'data' field and it's not null nor undefined and
                    //       it matches with the defined one.

                    done();
                });
                test.skip('with \'variables.id\' set to null, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to NULL).
                    // TODO: Define the expected error.
                    // TODO: Define the expected data object.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // TODO: Check that we have received a 'data' field and it's not null nor undefined and
                    //       it matches with the defined one.

                    done();
                });
                test.skip('with \'variables.id\' set to String value, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to any random string).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // TODO: Check that we have not received any 'data' field.

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Strings, it must return an error.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to an array of characters).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.
                    // TODO: Check that we have not received any 'data' field.

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value, it must return the director\'s data with the defined ID.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to a single Integer value).
                    // TODO: Define the expected result.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it contains an element.
                    // TODO: Check that the obtained element matches with the expected result.

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values, it must return the director\'s data with the defined ID.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to array of Integers).
                    // TODO: Define the expected result.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it contains an element.
                    // TODO: Check that all obtained results match with the expected ones.

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value out of range, it must return an empty array.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to a huge Integer value, for example, 999).
                    // TODO: Define the expected result.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it matches with the expected result.

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values out of range, it must return an empty array.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to an array of huge Integer values, for example, 999, 1001 and 2050).
                    // TODO: Define the expected result.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data' field and it's not null nor undefined.
                    // TODO: Check that the obtained result contains a 'data.actorsById' field, it's not null nor undefined and
                    //       it matches with the expected result.

                    done();
                });
            });

            describe('and a wrong query ...', () => {
                test.skip('with \'variables\' set to null, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables to NULL.
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
                test.skip('with \'variables.id\' set to null, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to NULL).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
                test.skip('with \'variables.id\' set to String value, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to random string).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Strings, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to array of charts).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to single Integer value).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to array of Integers).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
                test.skip('with \'variables.id\' set to single Integer value out of range, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to huge Integer value, for example, 999).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
                test.skip('with \'variables.id\' set to Array of Integer values out of range, it must return an error due to wrong field.', async (done) => {
                    // TODO: Get the query to be run.
                    // TODO: Define the variables for the query ('id' equal to array fo huge Integer values. Free your mind).
                    // TODO: Define the expected error.
                    // TODO: Run the query and store the obtained result into a variable.
                    // TODO: Check that the obtained result is not null nor undefined.
                    // TODO: Check that we have not received eny 'data' field.
                    // TODO: Check that the obtained result contains an 'errors' field and it's not null nor undefined 
                    //       and in addition, it contains one object.
                    // TODO: Check that the obtained error message is not null nor undefined and in addition, it
                    //       matches with the expected one.

                    done();
                });
            });
        });
    });
});