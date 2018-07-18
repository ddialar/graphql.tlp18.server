import 'jest';

import axios                  from 'axios';
import { serverConf }         from '../../../src/config';
import { persistNewDirector } from '../../../src/services/directors.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/directors`;

let testingDirectorMockedData = {
    name: 'Jest Testing Director',
    picture: 'Jest Testing Director Picture',
    picture_file: 'path/to/jest/testing/director/picture.png'
};

var persistedDirector;

const getPersistedDirector = () => {
    return persistedDirector;
};

const setPersistedDirector = (persistedDirectorData) => {
    persistedDirector = persistedDirectorData;
};

afterEach(async (done) => {
    try {
        if (getPersistedDirector()) {
            await axios.delete(`${API_REST_URL}/${getPersistedDirector().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (persistNewDirector) - Deleting director after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Directors\' services ...', () => {
    describe('Testing \'persistNewDirector\' ...', () => {
        test('with \'directorData\' set to null, it must return an empty object only with \'id\' field.', async (done) => {
            let directorData = null;
            let obtainedResult = await persistNewDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(Object.keys(obtainedResult).includes('id')).toBeTruthy();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            
            setPersistedDirector(obtainedResult);
            
            done();
        });
        test('with \'directorData.name\' set to null, the director must be created with this field to null.', async (done) => {
            let directorData = JSON.parse(JSON.stringify(testingDirectorMockedData));
            directorData.name = null;
            let obtainedResult = await persistNewDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBeNull();
            expect(obtainedResult.name).not.toBeUndefined();
            expect(obtainedResult.picture).toBe(testingDirectorMockedData.picture);
            expect(obtainedResult.picture_file).toBe(testingDirectorMockedData.picture_file);
            
            setPersistedDirector(obtainedResult);
            
            done();
        });
        test('with \'directorData.picture\' set to null, the director must be created with this field to null.', async (done) => {
            let directorData = JSON.parse(JSON.stringify(testingDirectorMockedData));
            directorData.picture = null;
            let obtainedResult = await persistNewDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingDirectorMockedData.name);
            expect(obtainedResult.picture).toBeNull();
            expect(obtainedResult.picture).not.toBeUndefined();
            expect(obtainedResult.picture_file).toBe(testingDirectorMockedData.picture_file);
            
            setPersistedDirector(obtainedResult);
            
            done();
        });
        test('with \'directorData.picture_file\' set to null, the setPersistedDirector must be created with this field to null.', async (done) => {
            let directorData = JSON.parse(JSON.stringify(testingDirectorMockedData));
            directorData.picture_file = null;
            let obtainedResult = await persistNewDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingDirectorMockedData.name);
            expect(obtainedResult.picture).toBe(testingDirectorMockedData.picture);
            expect(obtainedResult.picture_file).toBeNull();
            expect(obtainedResult.picture_file).not.toBeUndefined();
            
            setPersistedDirector(obtainedResult);
            
            done();
        });
        test('with \'directorData\' set to full payload, the director must be created with all its fields filled up.', async (done) => {
            let directorData = JSON.parse(JSON.stringify(testingDirectorMockedData));
            let obtainedResult = await persistNewDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingDirectorMockedData.name);
            expect(obtainedResult.picture).toBe(testingDirectorMockedData.picture);
            expect(obtainedResult.picture_file).toBe(testingDirectorMockedData.picture_file);
            
            setPersistedDirector(obtainedResult);
            
            done();
        });
    });
});