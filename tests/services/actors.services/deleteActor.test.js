import 'jest';

import axios           from 'axios';
import { serverConf }  from '../../../src/config';
import { deleteActor } from '../../../src/services/actors.service';

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

beforeEach(async (done) => {
    try {
        setPersistedActor((await axios.post(`${API_REST_URL}`, testingActorMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (deleteActor) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterEach(async (done) => {
    try {
        if (getPersistedActor()) {
            await axios.delete(`${API_REST_URL}/${getPersistedActor().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (deleteActor) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Actors\' services ...', () => {
    describe('Testing \'deleteActor\' ...', () => {
        test('with \'actorId\' set to null, it must return an empty object', async (done) => {
            let actorId = null;
            let obtainedResult = await deleteActor(actorId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'actorId\' set to out of range value, it must return an empty object', async (done) => {
            let actorId = 999;
            let obtainedResult = await deleteActor(actorId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'actorId\' set to valid ID, the selected actor must be deleted successfully.', async (done) => {
            let actorId = getPersistedActor().id;
            let obtainedResult;
            
            expect(await deleteActor(actorId)).not.rejects;

            obtainedResult = (await axios.get(`${API_REST_URL}/?id=${actorId}`)).data;

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject([]);

            setPersistedActor(null);

            done();
        });
    });
});