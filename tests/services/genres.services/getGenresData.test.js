import 'jest';

import axios             from 'axios';
import { serverConf }    from '../../../src/config';
import { getGenresData } from '../../../src/services/genres.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/genres`;

let testingGenreMockedData = {
    name: 'Jest Testing Genre'
};

var persistedGenre;

const getPersistedGenre = () => {
    return persistedGenre;
};

const setPersistedGenre = (persistedGenresData) => {
    persistedGenre = persistedGenresData;
};

beforeAll(async (done) => {
    try {
        setPersistedGenre((await axios.post(`${API_REST_URL}`, testingGenreMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (getGenresData) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterAll(async (done) => {
    try {
        if (getPersistedGenre()) {
            await axios.delete(`${API_REST_URL}/${getPersistedGenre().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (getGenresData) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Genres\' services ...', () => {
    describe('Testing \'getGenresData\' ...', () => {
        test('with \'queryParams\' set to null, it must return all persisted genres.', async (done) => {
            let queryParams = null;
            let obtainedResult = await getGenresData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.length).toBeGreaterThan(0);

            done();
        });
        test('with \'queryParams\' set to valid ID, the selected genres\'s data must be obtained.', async (done) => {
            let queryParams = `?id=${getPersistedGenre().id}`;
            let obtainedResult = await getGenresData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(1);
            expect(obtainedResult[0].id).not.toBeNull();
            expect(obtainedResult[0].id).not.toBeUndefined();
            expect(obtainedResult[0].name).toBe(testingGenreMockedData.name);

            done();
        });
        test('with \'queryParams\' set to a ID value out of range, an empty array must be returned.', async (done) => {
            let testingId = 999;
            let queryParams = `?id=${testingId}`;
            let obtainedResult = await getGenresData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(0);

            done();
        });
    });
});