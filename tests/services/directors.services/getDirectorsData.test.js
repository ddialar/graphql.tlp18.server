import 'jest';

import axios                from 'axios';
import { serverConf }       from '../../../src/config';
import { getDirectorsData } from '../../../src/services/directors.service';

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

const setPersistedDirector = (persistedDirectorsData) => {
    persistedDirector = persistedDirectorsData;
};

beforeAll(async (done) => {
    try {
        setPersistedDirector((await axios.post(`${API_REST_URL}`, testingDirectorMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (getDirectorsData) - Creating error: ${error.message}`);
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
        console.log(`[ERROR] (getDirectorsData) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Directors\' services ...', () => {
    describe('Testing \'getDirectorsData\' ...', () => {
        test('with \'queryParams\' set to null, it must return all persisted directors.', async (done) => {
            let queryParams = null;
            let obtainedResult = await getDirectorsData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.length).toBeGreaterThan(0);

            done();
        });
        test('with \'queryParams\' set to valid ID, the selected director\'s data must be obtained.', async (done) => {
            let queryParams = `?id=${getPersistedDirector().id}`;
            let obtainedResult = await getDirectorsData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(1);
            expect(obtainedResult[0].id).not.toBeNull();
            expect(obtainedResult[0].id).not.toBeUndefined();
            expect(obtainedResult[0].name).toBe(testingDirectorMockedData.name);
            expect(obtainedResult[0].picture).toBe(testingDirectorMockedData.picture);
            expect(obtainedResult[0].picture_file).toBe(testingDirectorMockedData.picture_file);

            done();
        });
        test('with \'queryParams\' set to a ID value out of range, an empty array must be returned.', async (done) => {
            let testingId = 999;
            let queryParams = `?id=${testingId}`;
            let obtainedResult = await getDirectorsData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(0);

            done();
        });
    });
});