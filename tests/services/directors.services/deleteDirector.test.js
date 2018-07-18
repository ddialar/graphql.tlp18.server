import 'jest';

import axios              from 'axios';
import { serverConf }     from '../../../src/config';
import { deleteDirector } from '../../../src/services/directors.service';

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

beforeEach(async (done) => {
    try {
        setPersistedDirector((await axios.post(`${API_REST_URL}`, testingDirectorMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (deleteDirector) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterEach(async (done) => {
    try {
        if (getPersistedDirector()) {
            await axios.delete(`${API_REST_URL}/${getPersistedDirector().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (deleteDirector) - Deleting director after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Actors\' services ...', () => {
    describe('Testing \'deleteDirector\' ...', () => {
        test('with \'directorId\' set to null, it must return an empty object', async (done) => {
            let directorId = null;
            let obtainedResult = await deleteDirector(directorId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'directorId\' set to out of range value, it must return an empty object', async (done) => {
            let directorId = 999;
            let obtainedResult = await deleteDirector(directorId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'directorId\' set to valid ID, the selected director must be deleted successfully.', async (done) => {
            let directorId = getPersistedDirector().id;
            let obtainedResult;
            
            expect(await deleteDirector(directorId)).not.rejects;

            obtainedResult = (await axios.get(`${API_REST_URL}/?id=${directorId}`)).data;

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject([]);

            setPersistedDirector(null);

            done();
        });
    });
});