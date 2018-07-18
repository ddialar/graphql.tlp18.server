import 'jest';

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
        test('with \'actorData\' set to null, it must return an empty object only with \'id\' field.', async (done) => {
            let actorData = null;
            let obtainedResult = await persistNewActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(Object.keys(obtainedResult).includes('id')).toBeTruthy();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            
            setPersistedActor(obtainedResult);
            
            done();
        });
        test('with \'actorData.name\' set to null, the actor must be created with this field to null.', async (done) => {
            let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            actorData.name = null;
            let obtainedResult = await persistNewActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBeNull();
            expect(obtainedResult.picture).toBe(testingActorMockedData.picture);
            expect(obtainedResult.born).toBe(testingActorMockedData.born);
            expect(obtainedResult.height).toBe(testingActorMockedData.height);
            expect(obtainedResult.country).toBe(testingActorMockedData.country);
            
            setPersistedActor(obtainedResult);
            
            done();
        });
        test('with \'actorData.picture\' set to null, the actor must be created with this field to null.', async (done) => {
            let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            actorData.picture = null;
            let obtainedResult = await persistNewActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingActorMockedData.name);
            expect(obtainedResult.picture).toBeNull();
            expect(obtainedResult.picture).not.toBeUndefined();
            expect(obtainedResult.born).toBe(testingActorMockedData.born);
            expect(obtainedResult.height).toBe(testingActorMockedData.height);
            expect(obtainedResult.country).toBe(testingActorMockedData.country);
            
            setPersistedActor(obtainedResult);
            
            done();
        });
        test('with \'actorData.born\' set to null, the actor must be created with this field to null.', async (done) => {
            let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            actorData.born = null;
            let obtainedResult = await persistNewActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingActorMockedData.name);
            expect(obtainedResult.picture).toBe(testingActorMockedData.picture);
            expect(obtainedResult.born).toBeNull();
            expect(obtainedResult.born).not.toBeUndefined();
            expect(obtainedResult.height).toBe(testingActorMockedData.height);
            expect(obtainedResult.country).toBe(testingActorMockedData.country);
            
            setPersistedActor(obtainedResult);
            
            done();
        });
        test('with \'actorData.height\' set to null, the actor must be created with this field to null.', async (done) => {
            let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            actorData.height = null;
            let obtainedResult = await persistNewActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingActorMockedData.name);
            expect(obtainedResult.picture).toBe(testingActorMockedData.picture);
            expect(obtainedResult.born).toBe(testingActorMockedData.born);
            expect(obtainedResult.height).toBeNull();
            expect(obtainedResult.height).not.toBeUndefined();
            expect(obtainedResult.country).toBe(testingActorMockedData.country);
            
            setPersistedActor(obtainedResult);
            
            done();
        });
        test('with \'actorData.country\' set to null, the actor must be created with this field to null.', async (done) => {
            let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            actorData.country = null;
            let obtainedResult = await persistNewActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingActorMockedData.name);
            expect(obtainedResult.picture).toBe(testingActorMockedData.picture);
            expect(obtainedResult.born).toBe(testingActorMockedData.born);
            expect(obtainedResult.height).toBe(testingActorMockedData.height);
            expect(obtainedResult.country).toBeNull();
            expect(obtainedResult.country).not.toBeUndefined();
            
            setPersistedActor(obtainedResult);
            
            done();
        });
        test('with \'actorData.country\' set to full payload, the actor must be created with all its fields filled up.', async (done) => {
            let actorData = JSON.parse(JSON.stringify(testingActorMockedData));
            let obtainedResult = await persistNewActor(actorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingActorMockedData.name);
            expect(obtainedResult.picture).toBe(testingActorMockedData.picture);
            expect(obtainedResult.born).toBe(testingActorMockedData.born);
            expect(obtainedResult.height).toBe(testingActorMockedData.height);
            expect(obtainedResult.country).toBe(testingActorMockedData.country);
            
            setPersistedActor(obtainedResult);
            
            done();
        });
    });
});