import 'jest';

import axios           from 'axios';
import { serverConf }  from '../../../src/config';
import { deleteGenre } from '../../../src/services/genres.service';

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

beforeEach(async (done) => {
    try {
        setPersistedGenre((await axios.post(`${API_REST_URL}`, testingGenreMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (deleteGenre) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterEach(async (done) => {
    try {
        if (getPersistedGenre()) {
            await axios.delete(`${API_REST_URL}/${getPersistedGenre().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (deleteGenre) - Deleting genre after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Genres\' services ...', () => {
    describe('Testing \'deleteGenre\' ...', () => {
        test('with \'genreId\' set to null, it must return an empty object', async (done) => {
            let genreId = null;
            let obtainedResult = await deleteGenre(genreId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'genreId\' set to out of range value, it must return an empty object', async (done) => {
            let genreId = 999;
            let obtainedResult = await deleteGenre(genreId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'genreId\' set to valid ID, the selected genre must be deleted successfully.', async (done) => {
            let genreId = getPersistedGenre().id;
            let obtainedResult;
            
            expect(await deleteGenre(genreId)).not.rejects;

            obtainedResult = (await axios.get(`${API_REST_URL}/?id=${genreId}`)).data;

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject([]);

            setPersistedGenre(null);

            done();
        });
    });
});