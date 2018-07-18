import 'jest';

import axios               from 'axios';
import { serverConf }      from '../../../src/config';
import { persistNewGenre } from '../../../src/services/genres.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/genres`;

let testingGenreMockedData = {
    name: 'Jest Testing Genre'
};

var persistedGenre;

const getPersistedGenre = () => {
    return persistedGenre;
};

const setPersistedGenre = (persistedGenreData) => {
    persistedGenre = persistedGenreData;
};

afterEach(async (done) => {
    try {
        if (getPersistedGenre()) {
            await axios.delete(`${API_REST_URL}/${getPersistedGenre().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (persistNewGenre) - Deleting genre after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Genres\' services ...', () => {
    describe('Testing \'persistNewGenre\' ...', () => {
        test('with \'genreData\' set to null, it must return an empty object only with \'id\' field.', async (done) => {
            let genreData = null;
            let obtainedResult = await persistNewGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(Object.keys(obtainedResult).includes('id')).toBeTruthy();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            
            setPersistedGenre(obtainedResult);
            
            done();
        });
        test('with \'genreData.name\' set to null, the genre must be created with this field to null.', async (done) => {
            let genreData = JSON.parse(JSON.stringify(testingGenreMockedData));
            genreData.name = null;
            let obtainedResult = await persistNewGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBeNull();
            expect(obtainedResult.name).not.toBeUndefined();
            
            setPersistedGenre(obtainedResult);
            
            done();
        });
        test('with \'genreData\' set to full payload, the genre must be created with all its fields filled up.', async (done) => {
            let genreData = JSON.parse(JSON.stringify(testingGenreMockedData));
            let obtainedResult = await persistNewGenre(genreData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingGenreMockedData.name);
            
            setPersistedGenre(obtainedResult);
            
            done();
        });
    });
});