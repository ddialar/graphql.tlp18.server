import 'jest';

import axios                from 'axios';
import { serverConf }       from '../../../src/config';
import { persistNewMovie } from '../../../src/services/movies.service';

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

const setPersistedMovie = (persistedMovieData) => {
    persistedMovie = persistedMovieData;
};

afterEach(async (done) => {
    try {
        if (getPersistedMovie()) {
            await axios.delete(`${API_REST_URL}/${getPersistedMovie().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (persistNewMovie) - Deleting movie after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Movies\' services ...', () => {
    describe('Testing \'persistNewMovie\' ...', () => {
        test('with \'movieData\' set to null, it must return an empty object only with \'id\' field.', async (done) => {
            let movieData = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(Object.keys(obtainedResult).includes('id')).toBeTruthy();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.title\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.title = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBeNull();
            expect(obtainedResult.title).not.toBeUndefined();
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.description\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.description = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBeNull();
            expect(obtainedResult.description).not.toBeUndefined();
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.poster_image\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.poster_image = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.poster_image).toBeNull();
            expect(obtainedResult.poster_image).not.toBeUndefined();
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.poster_image_file\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.poster_image_file = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBeNull();
            expect(obtainedResult.poster_image_file).not.toBeUndefined();
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.duration\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.duration = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBeNull();
            expect(obtainedResult.duration).not.toBeUndefined();
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.rating\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.rating = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBeNull();
            expect(obtainedResult.rating).not.toBeUndefined();
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.classification\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.classification = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBeNull();
            expect(obtainedResult.classification).not.toBeUndefined();
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.year\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.year = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBeNull();
            expect(obtainedResult.year).not.toBeUndefined();
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData.trailer\' set to null, the movie must be created with this field to null.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            movieData.trailer = null;
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toBeNull();
            expect(obtainedResult.trailer).not.toBeUndefined();
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
        test('with \'movieData\' set to full payload, the movie must be created with all its fields filled up.', async (done) => {
            let movieData = JSON.parse(JSON.stringify(testingMovieMockedData));
            let obtainedResult = await persistNewMovie(movieData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.title).toBe(testingMovieMockedData.title);
            expect(obtainedResult.description).toBe(testingMovieMockedData.description);
            expect(obtainedResult.poster_image).toBe(testingMovieMockedData.poster_image);
            expect(obtainedResult.poster_image_file).toBe(testingMovieMockedData.poster_image_file);
            expect(obtainedResult.duration).toBe(testingMovieMockedData.duration);
            expect(obtainedResult.rating).toBe(testingMovieMockedData.rating);
            expect(obtainedResult.classification).toBe(testingMovieMockedData.classification);
            expect(obtainedResult.year).toBe(testingMovieMockedData.year);
            expect(obtainedResult.trailer).toMatchObject(testingMovieMockedData.trailer);
            
            setPersistedMovie(obtainedResult);
            
            done();
        });
    });
});