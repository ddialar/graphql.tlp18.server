import 'jest';

import axios           from 'axios';
import { serverConf }  from '../../../src/config';
import { updateActor } from '../../../src/services/actors.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/actors`;

let testingActorMockedData = {
    name: 'Jest Testing Actor',
    picture: 'Jest Testing Actor Picture',
    born: '2018-07-18',
    height: 1.95,
    country: 'Canary Islands'
};

let actorMockedDataToBeUpdated = {
    name: 'Updated Actor Name',
    picture: 'Updated Actor Picture',
    born: '2050-05-05',
    height: 2.50,
    country: 'San Borondón'
};

var persistedActor;

const getPersistedActor = () => {
    return persistedActor;
};

const setPersistedActor = (persistedActorsData) => {
    persistedActor = persistedActorsData;
};

beforeAll(async (done) => {
    try {
        setPersistedActor((await axios.post(`${API_REST_URL}`, testingActorMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (updateActor) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterAll(async (done) => {
    try {
        if (getPersistedActor()) {
            await axios.delete(`${API_REST_URL}/${getPersistedActor().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (updateActor) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Actors\' services ...', () => {
    describe('Testing \'updateActor\' ...', () => {
        test('with \'actorData\' set to null, it must return an empty object.', async (done) => {
            let actorData = null;
            let obtainedResult = await updateActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'actorData.id\' set to null, it must return an empty object.', async (done) => {
            let actorData = JSON.parse(JSON.stringify(actorMockedDataToBeUpdated));
            let obtainedResult = await updateActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'actorData.id\' set to out of range value, it must return an empty object.', async (done) => {
            let actorData = {
                id: 999
            };
            let obtainedResult = await updateActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'actorData.id\' set to valid value but without any other payload, the whole actor must be obtained with no changes.', async (done) => {
            let expectedResult = getPersistedActor();
            let actorData = {
                id: expectedResult.id
            };
            let obtainedResult = await updateActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.name).toBe(expectedResult.name);
            expect(obtainedResult.picture).toBe(expectedResult.picture);
            expect(obtainedResult.born).toBe(expectedResult.born);
            expect(obtainedResult.height).toBe(expectedResult.height);
            expect(obtainedResult.country).toBe(expectedResult.country);

            done();
        });
        test('with \'actorData\' set to valid value with payload to be updated, the whole actor must be obtained with changes.', async (done) => {
            let expectedResult = JSON.parse(JSON.stringify(actorMockedDataToBeUpdated));
            expectedResult.id = getPersistedActor().id;
            let actorData = JSON.parse(JSON.stringify(actorMockedDataToBeUpdated));
            actorData.id = getPersistedActor().id;
            let obtainedResult = await updateActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.name).toBe(expectedResult.name);
            expect(obtainedResult.picture).toBe(expectedResult.picture);
            expect(obtainedResult.born).toBe(expectedResult.born);
            expect(obtainedResult.height).toBe(expectedResult.height);
            expect(obtainedResult.country).toBe(expectedResult.country);

            done();
        });
    });
});