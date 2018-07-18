import 'jest';

import axios           from 'axios';
import { serverConf }  from '../../../src/config';
import { deleteMovie } from '../../../src/services/movies.service';

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

beforeEach(async (done) => {
    try {
        setPersistedMovie((await axios.post(`${API_REST_URL}`, testingMovieMockedData)).data);
    } catch (error) {
        console.log(`[ERROR] - (deleteMovie) - Creating error: ${error.message}`);
    } finally {
        done();
    }
});

afterEach(async (done) => {
    try {
        if (getPersistedMovie()) {
            await axios.delete(`${API_REST_URL}/${getPersistedMovie().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (deleteMovie) - Deleting movie after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Actors\' services ...', () => {
    describe('Testing \'deleteMovie\' ...', () => {
        test('with \'movieId\' set to null, it must return an empty object', async (done) => {
            let movieId = null;
            let obtainedResult = await deleteMovie(movieId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'movieId\' set to out of range value, it must return an empty object', async (done) => {
            let movieId = 999;
            let obtainedResult = await deleteMovie(movieId);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject({});

            done();
        });
        test('with \'movieId\' set to valid ID, the selected movie must be deleted successfully.', async (done) => {
            let movieId = getPersistedMovie().id;
            let obtainedResult;
            
            expect(await deleteMovie(movieId)).not.rejects;

            obtainedResult = (await axios.get(`${API_REST_URL}/?id=${movieId}`)).data;

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult).toMatchObject([]);

            setPersistedMovie(null);

            done();
        });
    });
});