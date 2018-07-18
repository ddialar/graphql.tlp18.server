import 'jest';

import axios              from 'axios';
import { serverConf }     from '../../../src/config';
import { updateDirector } from '../../../src/services/directors.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/directors`;

let testingDirectorMockedData = {
    name: 'Jest Testing Director',
    picture: 'Jest Testing Director Picture',
    picture_file: 'path/to/jest/testing/director/picture.png'
};

let directorMockedDataToBeUpdated = {
    name: 'Updated Director Name',
    picture: 'Updated Director Picture',
    picture_file: 'path/to/updated/director/picture.png'
};

var persistedDirector;

const getPersistedDirector = () => {
    return persistedDirector;
};

const setPersistedDirector = (persistedDirectorsData) => {
    persistedDirector = persistedDirectorsData;
};

beforeAll(async (done) => {
    try {
        setPersistedDirector((await axios.post(`${API_REST_URL}`, testingDirectorMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (updateDirector) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterAll(async (done) => {
    try {
        if (getPersistedDirector()) {
            await axios.delete(`${API_REST_URL}/${getPersistedDirector().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (updateDirector) - Deleting director after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Directors\' services ...', () => {
    describe('Testing \'updateDirector\' ...', () => {
        test('with \'directorData\' set to null, it must return an empty object.', async (done) => {
            let directorData = null;
            let obtainedResult = await updateDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'directorData.id\' set to null, it must return an empty object.', async (done) => {
            let directorData = JSON.parse(JSON.stringify(directorMockedDataToBeUpdated));
            let obtainedResult = await updateDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'directorData.id\' set to out of range value, it must return an empty object.', async (done) => {
            let directorData = {
                id: 999
            };
            let obtainedResult = await updateDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'directorData.id\' set to valid value but without any other payload, the whole director must be obtained with no changes.', async (done) => {
            let expectedResult = getPersistedDirector();
            let directorData = {
                id: expectedResult.id
            };
            let obtainedResult = await updateDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.name).toBe(expectedResult.name);
            expect(obtainedResult.picture).toBe(expectedResult.picture);
            expect(obtainedResult.picture_file).toBe(expectedResult.picture_file);

            done();
        });
        test('with \'directorData\' set to valid value with payload to be updated, the whole director must be obtained with changes.', async (done) => {
            let expectedResult = JSON.parse(JSON.stringify(directorMockedDataToBeUpdated));
            expectedResult.id = getPersistedDirector().id;
            let directorData = JSON.parse(JSON.stringify(directorMockedDataToBeUpdated));
            directorData.id = getPersistedDirector().id;
            let obtainedResult = await updateDirector(directorData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.name).toBe(expectedResult.name);
            expect(obtainedResult.picture).toBe(expectedResult.picture);
            expect(obtainedResult.picture_file).toBe(expectedResult.picture_file);

            done();
        });
    });
});