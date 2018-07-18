import 'jest';

import axios             from 'axios';
import { serverConf }    from '../../../src/config';
import { getActorsData } from '../../../src/services/actors.service';

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

const setPersistedActor = (persistedActorsData) => {
    persistedActor = persistedActorsData;
};

beforeAll(async (done) => {
    try {
        setPersistedActor((await axios.post(`${API_REST_URL}`, testingActorMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (getActorsData) - Creating error: ${error.message}`);
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
        console.log(`[ERROR] (getActorsData) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Actors\' services ...', () => {
    describe('Testing \'getActorsData\' ...', () => {
        test('with \'queryParams\' set to null, it must return all persisted actors and actresses', async (done) => {
            let queryParams = null;
            let obtainedResult = await getActorsData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.length).toBeGreaterThan(0);

            done();
        });
        test('with \'queryParams\' set to valid ID, the selected actor\'s data must be obtained.', async (done) => {
            let queryParams = `?id=${getPersistedActor().id}`;
            let obtainedResult = await getActorsData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(1);
            expect(obtainedResult[0].id).not.toBeNull();
            expect(obtainedResult[0].id).not.toBeUndefined();
            expect(obtainedResult[0].name).toBe(testingActorMockedData.name);
            expect(obtainedResult[0].picture).toBe(testingActorMockedData.picture);
            expect(obtainedResult[0].born).toBe(testingActorMockedData.born);
            expect(obtainedResult[0].height).toBe(testingActorMockedData.height);
            expect(obtainedResult[0].country).toBe(testingActorMockedData.country);

            done();
        });
        test('with \'queryParams\' set to a ID value out of range, an empty array must be returned.', async (done) => {
            let testingId = 999;
            let queryParams = `?id=${testingId}`;
            let obtainedResult = await getActorsData(queryParams);

            // console.log(JSON.stringify(obtainedResult, null, 4));
            
            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(0);

            done();
        });
    });
});