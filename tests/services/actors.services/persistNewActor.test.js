import axios               from 'axios';
import { serverConf }      from '../../../src/config';
import { persistNewActor } from '../../../src/services/actors.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/actors`;

let testingActorMockedData = {
    name: 'Jest Testing Actor',
    picture: 'Jest Testing Actor Picture',
    born: '2018-07-18',
    height: 1.95,
    country: 'Canary Islands'
};

var persistedActor;

const getPersistedActor = () => {
    return persistedActor;
};

const setPersistedActor = (persistedActorData) => {
    persistedActor = persistedActorData;
};

afterEach(async (done) => {
    try {
        if (getPersistedActor()) {
            await axios.delete(`${API_REST_URL}/${getPersistedActor().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (persistNewActor) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Actors\' services ...', () => {
    describe('Testing \'persistNewActor\' ...', () => {
        test.skip('with \'actorData\' set to null, it must return an empty object only with \'id\' field.', async (done) => {
            // Basic operations.
            // TODO: Declare the 'actorData' variable and set it to null.
            // let actorData = null;
            // TODO: Declare the 'obtainedResult' variable.
            // TODO: Obtain the result of running the 'persistNewActor' method and store it into the 'obtainedResult' variable (Warning: This method is asyncronous).
            // let obtainedResult = await persistNewActor(actorData);

            // Testing operations.
            // TODO: Check that the obtained result is not NULL.
            // expect(obtainedResult).not.toBeNull();
            // TODO: Check that the obtained result is not UNDEFINED.
            // expect(obtainedResult).not.toBeUndefined();
            // TODO: Check that the obtained result contains a field named 'id'.
            // expect(Object.keys(obtainedResult).includes('id')).toBeTruthy();
            // TODO: Check that the field 'id' is not NULL.
            // expect(obtainedResult.id).not.toBeNull();
            // TODO: Check that the field 'id' is not UNDEFINED.
            // expect(obtainedResult.id).not.toBeUndefined();
            // TODO: Check that the field 'id' is greater thant zero.
            // expect(obtainedResult.id).toBeGreaterThan(0);

            // Final opreations.
            // TODO: User the 'setPersistedActor' and provide it the obtained result, in order to be
            //       remove from the DD.BB.
            // setPersistedActor(obtainedResult);
            // TODO: Remove the '.skip' parameter from the testing case.
            // TODO: Check the testing console if the test is in green.
            
            done();
        });
        test.skip('with \'actorData.name\' set to null, the actor must be created with this field to null.', async (done) => {
            // Basic operations.
            // TODO: Declare the 'actorData' variable and populate it with the 'testingActorMockedData' content (Warning: Don't assign the mocked data directly).
            // let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            // TODO: Set to null the 'name' field, into the 'actorData' variable.
            // actorData.name = null;
            // TODO: Declare the 'obtainedResult' variable.
            // TODO: Obtain the result of running the 'persistNewActor' method and store it into the 'obtainedResult' variable (Warning: This method is asyncronous).
            // let obtainedResult = await persistNewActor(actorData);

            // Testing operations.
            // TODO: Check that the obtained result is not NULL.
            // expect(obtainedResult).not.toBeNull();
            // TODO: Check that the obtained result is not UNDEFINED.
            // expect(obtainedResult).not.toBeUndefined();
            // TODO: Check that the obtained result contains a field named 'id'.
            // expect(obtainedResult.id).not.toBeNull();
            // TODO: Check that the field 'id' is not NULL.
            // expect(obtainedResult.id).not.toBeUndefined();
            // TODO: Check that the field 'id' is not UNDEFINED.
            // expect(obtainedResult.id).toBeGreaterThan(0);
            // TODO: Check that the field 'id' is greater thant zero.
            // expect(obtainedResult.name).toBeNull();
            // TODO: Check that the field 'name' is NULL.
            // TODO: Check that the field 'picture' is the same that the mocked data field.
            // expect(obtainedResult.picture).toBe(testingActorMockedData.picture);
            // TODO: Check that the field 'born' is the same that the mocked data field.
            // expect(obtainedResult.born).toBe(testingActorMockedData.born);
            // TODO: Check that the field 'height' is the same that the mocked data field.
            // expect(obtainedResult.height).toBe(testingActorMockedData.height);
            // TODO: Check that the field 'country' is the same that the mocked data field.
            // expect(obtainedResult.country).toBe(testingActorMockedData.country);
            
            // Final opreations.
            // TODO: User the 'setPersistedActor' and provide it the obtained result, in order to be
            //       remove from the DD.BB.
            // setPersistedActor(obtainedResult);
            // TODO: Remove the '.skip' parameter from the testing case.
            // TODO: Check the testing console if the test is in green.
            
            done();
        });
        test.skip('with \'actorData.picture\' set to null, the actor must be created with this field to null.', async (done) => {
            // Basic operations.
            // TODO: Declare the 'actorData' variable and populate it with the 'testingActorMockedData' content (Warning: Don't assign the mocked data directly).
            // let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            // TODO: Set to null the 'picture' field, into the 'actorData' variable.
            // actorData.picture = null;
            // TODO: Declare the 'obtainedResult' variable.
            // TODO: Obtain the result of running the 'persistNewActor' method and store it into the 'obtainedResult' variable (Warning: This method is asyncronous).
            // let obtainedResult = await persistNewActor(actorData);

            // Testing operations.
            // TODO: Check that the obtained result is not NULL.
            // expect(obtainedResult).not.toBeNull();
            // TODO: Check that the obtained result is not UNDEFINED.
            // expect(obtainedResult).not.toBeUndefined();
            // TODO: Check that the obtained result contains a field named 'id'.
            // expect(obtainedResult.id).not.toBeNull();
            // TODO: Check that the field 'id' is not NULL.
            // expect(obtainedResult.id).not.toBeUndefined();
            // TODO: Check that the field 'id' is not UNDEFINED.
            // expect(obtainedResult.id).toBeGreaterThan(0);
            // TODO: Check that the field 'id' is greater thant zero.
            // expect(obtainedResult.name).toBe(testingActorMockedData.name);
            // TODO: Check that the field 'name' is the same that the mocked data field.
            // expect(obtainedResult.picture).toBeNull();
            // TODO: Check that the field 'picture' is NULL.
            // expect(obtainedResult.picture).not.toBeUndefined();
            // TODO: Check that the field 'born' is the same that the mocked data field.
            // expect(obtainedResult.born).toBe(testingActorMockedData.born);
            // TODO: Check that the field 'height' is the same that the mocked data field.
            // expect(obtainedResult.height).toBe(testingActorMockedData.height);
            // TODO: Check that the field 'country' is the same that the mocked data field.
            // expect(obtainedResult.country).toBe(testingActorMockedData.country);

            // Final opreations.
            // TODO: User the 'setPersistedActor' and provide it the obtained result, in order to be
            //       remove from the DD.BB.
            // setPersistedActor(obtainedResult);
            // TODO: Remove the '.skip' parameter from the testing case.
            // TODO: Check the testing console if the test is in green.

            done();
        });
        test.skip('with \'actorData.born\' set to null, the actor must be created with this field to null.', async (done) => {
            // Basic operations.
            // TODO: Declare the 'actorData' variable and populate it with the 'testingActorMockedData' content (Warning: Don't assign the mocked data directly).
            // TODO: Set to null the 'born' field, into the 'actorData' variable.
            // TODO: Declare the 'obtainedResult' variable.
            // TODO: Obtain the result of running the 'persistNewActor' method and store it into the 'obtainedResult' variable (Warning: This method is asyncronous).

            // Testing operations.
            // TODO: Check that the obtained result is not NULL.
            // TODO: Check that the obtained result is not UNDEFINED.
            // TODO: Check that the obtained result contains a field named 'id'.
            // TODO: Check that the field 'id' is not NULL.
            // TODO: Check that the field 'id' is not UNDEFINED.
            // TODO: Check that the field 'id' is greater thant zero.
            // TODO: Check that the field 'name' is the same that the mocked data field.
            // TODO: Check that the field 'picture' is the same that the mocked data field.
            // TODO: Check that the field 'born' is NULL.
            // TODO: Check that the field 'height' is the same that the mocked data field.
            // TODO: Check that the field 'country' is the same that the mocked data field.

            // Final opreations.
            // TODO: User the 'setPersistedActor' and provide it the obtained result, in order to be
            //       remove from the DD.BB.
            // TODO: Remove the '.skip' parameter from the testing case.
            // TODO: Check the testing console if the test is in green.
            
            done();
        });
        test.skip('with \'actorData.height\' set to null, the actor must be created with this field to null.', async (done) => {
            // Basic operations.
            // TODO: Declare the 'actorData' variable and populate it with the 'testingActorMockedData' content (Warning: Don't assign the mocked data directly).
            // TODO: Set to null the 'height' field, into the 'actorData' variable.
            // TODO: Declare the 'obtainedResult' variable.
            // TODO: Obtain the result of running the 'persistNewActor' method and store it into the 'obtainedResult' variable (Warning: This method is asyncronous).

            // Testing operations.
            // TODO: Check that the obtained result is not NULL.
            // TODO: Check that the obtained result is not UNDEFINED.
            // TODO: Check that the obtained result contains a field named 'id'.
            // TODO: Check that the field 'id' is not NULL.
            // TODO: Check that the field 'id' is not UNDEFINED.
            // TODO: Check that the field 'id' is greater thant zero.
            // TODO: Check that the field 'name' is the same that the mocked data field.
            // TODO: Check that the field 'picture' is the same that the mocked data field.
            // TODO: Check that the field 'born' is the same that the mocked data field.
            // TODO: Check that the field 'height' is NULL.
            // TODO: Check that the field 'country' is the same that the mocked data field.

            // Final opreations.
            // TODO: User the 'setPersistedActor' and provide it the obtained result, in order to be
            //       remove from the DD.BB.
            // TODO: Remove the '.skip' parameter from the testing case.
            // TODO: Check the testing console if the test is in green.
            
            done();
        });
        test.skip('with \'actorData.country\' set to null, the actor must be created with this field to null.', async (done) => {
            // Basic operations.
            // TODO: Declare the 'actorData' variable and populate it with the 'testingActorMockedData' content (Warning: Don't assign the mocked data directly).
            // TODO: Set to null the 'country' field, into the 'actorData' variable.
            // TODO: Declare the 'obtainedResult' variable.
            // TODO: Obtain the result of running the 'persistNewActor' method and store it into the 'obtainedResult' variable (Warning: This method is asyncronous).

            // Testing operations.
            // TODO: Check that the obtained result is not NULL.
            // TODO: Check that the obtained result is not UNDEFINED.
            // TODO: Check that the obtained result contains a field named 'id'.
            // TODO: Check that the field 'id' is not NULL.
            // TODO: Check that the field 'id' is not UNDEFINED.
            // TODO: Check that the field 'id' is greater thant zero.
            // TODO: Check that the field 'name' is the same that the mocked data field.
            // TODO: Check that the field 'picture' is the same that the mocked data field.
            // TODO: Check that the field 'born' is the same that the mocked data field.
            // TODO: Check that the field 'height' is the same that the mocked data field.
            // TODO: Check that the field 'country' is NULL.

            // Final opreations.
            // TODO: User the 'setPersistedActor' and provide it the obtained result, in order to be
            //       remove from the DD.BB.
            // TODO: Remove the '.skip' parameter from the testing case.
            // TODO: Check the testing console if the test is in green.
            
            done();
        });
        test.skip('with \'actorData\' set to full payload, the actor must be created with all its fields filled up.', async (done) => {
            // Basic operations.
            // TODO: Declare the 'actorData' variable and populate it with the 'testingActorMockedData' content (Warning: Don't assign the mocked data directly).
            // TODO: Declare the 'obtainedResult' variable.
            // TODO: Obtain the result of running the 'persistNewActor' method and store it into the 'obtainedResult' variable (Warning: This method is asyncronous).

            // Testing operations.
            // TODO: Check that the obtained result is not NULL.
            // TODO: Check that the obtained result is not UNDEFINED.
            // TODO: Check that the obtained result contains a field named 'id'.
            // TODO: Check that the field 'id' is not NULL.
            // TODO: Check that the field 'id' is not UNDEFINED.
            // TODO: Check that the field 'id' is greater thant zero.
            // TODO: Check that the field 'name' is the same that the mocked data field.
            // TODO: Check that the field 'picture' is the same that the mocked data field.
            // TODO: Check that the field 'born' is the same that the mocked data field.
            // TODO: Check that the field 'height' is the same that the mocked data field.
            // TODO: Check that the field 'country' is the same that the mocked data field.

            // Final opreations.
            // TODO: User the 'setPersistedActor' and provide it the obtained result, in order to be
            //       remove from the DD.BB.
            // TODO: Remove the '.skip' parameter from the testing case.
            // TODO: Check the testing console if the test is in green.
            
            done();
        });
    });
});