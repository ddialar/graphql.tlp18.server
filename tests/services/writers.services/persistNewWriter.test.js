import 'jest';

import axios                from 'axios';
import { serverConf }       from '../../../src/config';
import { persistNewWriter } from '../../../src/services/writers.service';

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

const setPersistedWriter = (persistedWriterData) => {
    persistedWriter = persistedWriterData;
};

afterEach(async (done) => {
    try {
        if (getPersistedWriter()) {
            await axios.delete(`${API_REST_URL}/${getPersistedWriter().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (persistNewWriter) - Deleting writer after testing case: ${error.message}`);
    } finally {
        done();
    }
});

describe('[ Services ] - Testing \'Writers\' services ...', () => {
    describe('Testing \'persistNewWriter\' ...', () => {
        test('with \'writerData\' set to null, it must return an empty object only with \'id\' field.', async (done) => {
            let writerData = null;
            let obtainedResult = await persistNewWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(Object.keys(obtainedResult).includes('id')).toBeTruthy();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            
            setPersistedWriter(obtainedResult);
            
            done();
        });
        test('with \'writerData.name\' set to null, the writer must be created with this field to null.', async (done) => {
            let writerData = JSON.parse(JSON.stringify(testingWriterMockedData));
            writerData.name = null;
            let obtainedResult = await persistNewWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBeNull();
            expect(obtainedResult.name).not.toBeUndefined();
            expect(obtainedResult.picture).toBe(testingWriterMockedData.picture);
            expect(obtainedResult.picture_file).toBe(testingWriterMockedData.picture_file);
            
            setPersistedWriter(obtainedResult);
            
            done();
        });
        test('with \'writerData.picture\' set to null, the writer must be created with this field to null.', async (done) => {
            let writerData = JSON.parse(JSON.stringify(testingWriterMockedData));
            writerData.picture = null;
            let obtainedResult = await persistNewWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingWriterMockedData.name);
            expect(obtainedResult.picture).toBeNull();
            expect(obtainedResult.picture).not.toBeUndefined();
            expect(obtainedResult.picture_file).toBe(testingWriterMockedData.picture_file);
            
            setPersistedWriter(obtainedResult);
            
            done();
        });
        test('with \'writerData.picture_file\' set to null, the writer must be created with this field to null.', async (done) => {
            let writerData = JSON.parse(JSON.stringify(testingWriterMockedData));
            writerData.picture_file = null;
            let obtainedResult = await persistNewWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingWriterMockedData.name);
            expect(obtainedResult.picture).toBe(testingWriterMockedData.picture);
            expect(obtainedResult.picture_file).toBeNull();
            expect(obtainedResult.picture_file).not.toBeUndefined();
            
            setPersistedWriter(obtainedResult);
            
            done();
        });
        test('with \'writerData\' set to full payload, the writer must be created with all its fields filled up.', async (done) => {
            let writerData = JSON.parse(JSON.stringify(testingWriterMockedData));
            let obtainedResult = await persistNewWriter(writerData);

            expect(obtainedResult).not.toBeNull();
            expect(obtainedResult).not.toBeUndefined();
            expect(obtainedResult.id).not.toBeNull();
            expect(obtainedResult.id).not.toBeUndefined();
            expect(obtainedResult.id).toBeGreaterThan(0);
            expect(obtainedResult.name).toBe(testingWriterMockedData.name);
            expect(obtainedResult.picture).toBe(testingWriterMockedData.picture);
            expect(obtainedResult.picture_file).toBe(testingWriterMockedData.picture_file);
            
            setPersistedWriter(obtainedResult);
            
            done();
        });
    });
});