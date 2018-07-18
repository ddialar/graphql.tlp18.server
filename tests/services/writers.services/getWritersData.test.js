import 'jest';

import axios              from 'axios';
import { serverConf }     from '../../../src/config';
import { getWritersData } from '../../../src/services/writers.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/writers`;

let testingWriterMockedData = {
    name: 'Jest Testing Writer',
    picture: 'Jest Testing Writer Picture',
    picture_file: 'path/to/jest/testing/writer/picture.png'
};

var persistedWriter;

const getPersistedWriter = () => {
    return persistedWriter;
};

const setPersistedWriter = (persistedWritersData) => {
    persistedWriter = persistedWritersData;
};

beforeAll(async (done) => {
    try {
        setPersistedWriter((await axios.post(`${API_REST_URL}`, testingWriterMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (getWritersData) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterAll(async (done) => {
    try {
        if (getPersistedWriter()) {
            await axios.delete(`${API_REST_URL}/${getPersistedWriter().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (getWritersData) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Writers\' services ...', () => {
    describe('Testing \'getWritersData\' ...', () => {
        test('with \'queryParams\' set to null, it must return all persisted writers.', async (done) => {
            let queryParams = null;
            let obtainedResult = await getWritersData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.length).toBeGreaterThan(0);

            done();
        });
        test('with \'queryParams\' set to valid ID, the selected writer\'s data must be obtained.', async (done) => {
            let queryParams = `?id=${getPersistedWriter().id}`;
            let obtainedResult = await getWritersData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(1);
            expect(obtainedResult[0].id).not.toBeNull();
            expect(obtainedResult[0].id).not.toBeUndefined();
            expect(obtainedResult[0].name).toBe(testingWriterMockedData.name);
            expect(obtainedResult[0].picture).toBe(testingWriterMockedData.picture);
            expect(obtainedResult[0].picture_file).toBe(testingWriterMockedData.picture_file);

            done();
        });
        test('with \'queryParams\' set to a ID value out of range, an empty array must be returned.', async (done) => {
            let testingId = 999;
            let queryParams = `?id=${testingId}`;
            let obtainedResult = await getWritersData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(0);

            done();
        });
    });
});