import 'jest';

import axios           from 'axios';
import { serverConf }  from '../../../src/config';
import { updateGenre } from '../../../src/services/genres.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/genres`;

let testingGenreMockedData = {
    name: 'Jest Testing Genre'
};

let genreMockedDataToBeUpdated = {
    name: 'Updated Genre Name'
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
        console.log(`[ERROR] - (updateGenre) - Creating error: ${error.message}`);
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
        console.log(`[ERROR] (updateGenre) - Deleting genre after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Genres\' services ...', () => {
    describe('Testing \'updateGenre\' ...', () => {
        test('with \'genreData\' set to null, it must return an empty object.', async (done) => {
            let genreData = null;
            let obtainedResult = await updateGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'genreData.id\' set to null, it must return an empty object.', async (done) => {
            let genreData = JSON.parse(JSON.stringify(genreMockedDataToBeUpdated));
            let obtainedResult = await updateGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'genreData.id\' set to out of range value, it must return an empty object.', async (done) => {
            let genreData = {
                id: 999
            };
            let obtainedResult = await updateGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'genreData.id\' set to valid value but without any other payload, the whole genre must be obtained with no changes.', async (done) => {
            let expectedResult = getPersistedGenre();
            let genreData = {
                id: expectedResult.id
            };
            let obtainedResult = await updateGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.name).toBe(expectedResult.name);

            done();
        });
        test('with \'genreData\' set to valid value with payload to be updated, the whole genre must be obtained with changes.', async (done) => {
            let expectedResult = JSON.parse(JSON.stringify(genreMockedDataToBeUpdated));
            expectedResult.id = getPersistedGenre().id;
            let genreData = JSON.parse(JSON.stringify(genreMockedDataToBeUpdated));
            genreData.id = getPersistedGenre().id;
            let obtainedResult = await updateGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.name).toBe(expectedResult.name);

            done();
        });
    });
});