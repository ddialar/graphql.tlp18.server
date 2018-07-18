import 'jest';

import axios            from 'axios';
import { serverConf }   from '../../../src/config';
import { updateWriter } from '../../../src/services/writers.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/writers`;

let testingWriterMockedData = {
    name: 'Jest Testing Writer',
    picture: 'Jest Testing Writer Picture',
    picture_file: 'path/to/jest/testing/writer/picture.png'
};

let writerMockedDataToBeUpdated = {
    name: 'Updated Writer Name',
    picture: 'Updated Writer Picture',
    picture_file: 'path/to/updated/writer/picture.png'
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
        console.log(`[ERROR] - (updateWriter) - Creating error: ${error.message}`);
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
        console.log(`[ERROR] (updateWriter) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Writers\' services ...', () => {
    describe('Testing \'updateWriter\' ...', () => {
        test('with \'writerData\' set to null, it must return an empty object.', async (done) => {
            let writerData = null;
            let obtainedResult = await updateWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'writerData.id\' set to null, it must return an empty object.', async (done) => {
            let writerData = JSON.parse(JSON.stringify(writerMockedDataToBeUpdated));
            let obtainedResult = await updateWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'writerData.id\' set to out of range value, it must return an empty object.', async (done) => {
            let writerData = {
                id: 999
            };
            let obtainedResult = await updateWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'writerData.id\' set to valid value but without any other payload, the whole writer must be obtained with no changes.', async (done) => {
            let expectedResult = getPersistedWriter();
            let writerData = {
                id: expectedResult.id
            };
            let obtainedResult = await updateWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.name).toBe(expectedResult.name);
            expect(obtainedResult.picture).toBe(expectedResult.picture);
            expect(obtainedResult.picture_file).toBe(expectedResult.picture_file);

            done();
        });
        test('with \'writerData\' set to valid value with payload to be updated, the whole writer must be obtained with changes.', async (done) => {
            let expectedResult = JSON.parse(JSON.stringify(writerMockedDataToBeUpdated));
            expectedResult.id = getPersistedWriter().id;
            let writerData = JSON.parse(JSON.stringify(writerMockedDataToBeUpdated));
            writerData.id = getPersistedWriter().id;
            let obtainedResult = await updateWriter(writerData);

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