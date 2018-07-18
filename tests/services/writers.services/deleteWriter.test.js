import 'jest';

import axios            from 'axios';
import { serverConf }   from '../../../src/config';
import { deleteWriter } from '../../../src/services/writers.service';

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

beforeEach(async (done) => {
    try {
        setPersistedWriter((await axios.post(`${API_REST_URL}`, testingWriterMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (deleteWriter) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterEach(async (done) => {
    try {
        if (getPersistedWriter()) {
            await axios.delete(`${API_REST_URL}/${getPersistedWriter().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (deleteWriter) - Deleting writer after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Actors\' services ...', () => {
    describe('Testing \'deleteWriter\' ...', () => {
        test('with \'writerId\' set to null, it must return an empty object', async (done) => {
            let writerId = null;
            let obtainedResult = await deleteWriter(writerId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'writerId\' set to out of range value, it must return an empty object', async (done) => {
            let writerId = 999;
            let obtainedResult = await deleteWriter(writerId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'writerId\' set to valid ID, the selected writer must be deleted successfully.', async (done) => {
            let writerId = getPersistedWriter().id;
            let obtainedResult;
            
            expect(await deleteWriter(writerId)).not.rejects;

            obtainedResult = (await axios.get(`${API_REST_URL}/?id=${writerId}`)).data;

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject([]);

            setPersistedWriter(null);

            done();
        });
    });
});