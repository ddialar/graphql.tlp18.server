import 'jest';

import axios           from 'axios';
import { serverConf }  from '../../../src/config';
import { updateMovie } from '../../../src/services/movies.service';

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

let movieMockedDataToBeUpdated = {
    title: 'Jest Movie Updated Title',
    description: 'Jest Movie Updated Description',
    poster_image: 'Jest Movie Updated Poster Image',
    poster_image_file: 'Jest Movie Updated Poster Image File',
    duration: 555,
    rating: 20,
    classification: 'The best for testing',
    year: '3152',
    trailer: {
        width: 20,
        height: 20,
        src: 'https://www.youtube.com/updated/link',
        frameborder: 5,
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
        console.log(`[ERROR] - (updateMovie) - Creating error: ${error.message}`);
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
        console.log(`[ERROR] (updateMovie) - Deleting movie after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Movies\' services ...', () => {
    describe('Testing \'updateMovie\' ...', () => {
        test('with \'movieData\' set to null, it must return an empty object.', async (done) => {
            let movieData = null;
            let obtainedResult = await updateMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'movieData.id\' set to null, it must return an empty object.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(movieMockedDataToBeUpdated));
            let obtainedResult = await updateMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'movieData.id\' set to out of range value, it must return an empty object.', async (done) => {
            let movieData = {
                id: 999
            };
            let obtainedResult = await updateMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'movieData.id\' set to valid value but without any other payload, the whole movie must be obtained with no changes.', async (done) => {
            let expectedResult = getPersistedMovie();
            let movieData = {
                id: expectedResult.id
            };
            let obtainedResult = await updateMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.title).toBe(expectedResult.title);
            expect(obtainedResult.description).toBe(expectedResult.description);
            expect(obtainedResult.poster_image).toBe(expectedResult.poster_image);
            expect(obtainedResult.poster_image_file).toBe(expectedResult.poster_image_file);
            expect(obtainedResult.duration).toBe(expectedResult.duration);
            expect(obtainedResult.rating).toBe(expectedResult.rating);
            expect(obtainedResult.classification).toBe(expectedResult.classification);
            expect(obtainedResult.year).toBe(expectedResult.year);
            expect(obtainedResult.trailer).toMatchObject(expectedResult.trailer);

            done();
        });
        test('with \'movieData\' set to valid value with payload to be updated, the whole movie must be obtained with changes.', async (done) => {
            let expectedResult = JSON.parse(JSON.stringify(movieMockedDataToBeUpdated));
            expectedResult.id = getPersistedMovie().id;
            let movieData = JSON.parse(JSON.stringify(movieMockedDataToBeUpdated));
            movieData.id = getPersistedMovie().id;
            let obtainedResult = await updateMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).toBe(expectedResult.id);
            expect(obtainedResult.title).toBe(expectedResult.title);
            expect(obtainedResult.description).toBe(expectedResult.description);
            expect(obtainedResult.poster_image).toBe(expectedResult.poster_image);
            expect(obtainedResult.poster_image_file).toBe(expectedResult.poster_image_file);
            expect(obtainedResult.duration).toBe(expectedResult.duration);
            expect(obtainedResult.rating).toBe(expectedResult.rating);
            expect(obtainedResult.classification).toBe(expectedResult.classification);
            expect(obtainedResult.year).toBe(expectedResult.year);
            expect(obtainedResult.trailer).toMatchObject(expectedResult.trailer);

            done();
        });
    });
});