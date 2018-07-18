import 'jest';

import axios             from 'axios';
import { serverConf }    from '../../../src/config';
import { getMoviesData } from '../../../src/services/movies.service';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/movies`;

let testingMovieMockedData = {
    title: 'Jest Testing Movie',
    description: 'Jest Testing Movie Description',
    poster_image: 'Jest Testing Movie Poster Image',
    poster_image_file: 'Jest Testing Movie Poster Image File',
    duration: 999,
    rating: 10,
    classification: 'Good for testing',
    year: '2050',
    trailer: {
        width: 10,
        height: 10,
        src: 'https://www.youtube.com/link',
        frameborder: 0,
        iframe: '<iframe></iframe>'
    }
};

var persistedMovie;

const getPersistedMovie = () => {
    return persistedMovie;
};

const setPersistedMovie = (persistedMoviesData) => {
    persistedMovie = persistedMoviesData;
};

beforeAll(async (done) => {
    try {
        setPersistedMovie((await axios.post(`${API_REST_URL}`, testingMovieMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (getMoviesData) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterAll(async (done) => {
    try {
        if (getPersistedMovie()) {
            await axios.delete(`${API_REST_URL}/${getPersistedMovie().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (getMoviesData) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Movies\' services ...', () => {
    describe('Testing \'getMoviesData\' ...', () => {
        test('with \'queryParams\' set to null, it must return all persisted movies.', async (done) => {
            let queryParams = null;
            let obtainedResult = await getMoviesData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.length).toBeGreaterThan(0);

            done();
        });
        test('with \'queryParams\' set to valid ID, the selected writer\'s data must be obtained.', async (done) => {
            let queryParams = `?id=${getPersistedMovie().id}`;
            let obtainedResult = await getMoviesData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(1);
            expect(obtainedResult[0].id).not.toBeNull();
            expect(obtainedResult[0].id).not.toBeUndefined();
            expect(obtainedResult[0].title).toBe(testingMovieMockedData.title);
            expect(obtainedResult[0].description).toBe(testingMovieMockedData.description);
            expect(obtainedResult[0].poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult[0].poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult[0].duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult[0].rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult[0].classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult[0].year).toBe(testingMovieMockedData.year);
            expect(obtainedResult[0].trailer).toMatchObject(testingMovieMockedData.trailer);

            done();
        });
        test('with \'queryParams\' set to a ID value out of range, an empty array must be returned.', async (done) => {
            let testingId = 999;
            let queryParams = `?id=${testingId}`;
            let obtainedResult = await getMoviesData(queryParams);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toHaveLength(0);

            done();
        });
    });
});