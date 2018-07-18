import 'jest';

import { createQueryParamsString } from '../../../src/common/utils';

describe('[ Utils ] - Testing \'createQueryParamsString\' ...', () => {
    test('with \'listOfValues\' set to null, it must throw an error', async (done) => {
        let listOfValues = null;
        let queryParamVariable = 'id';
        let expectedError = new Error('It\'s needed a list of values in order to create a query params string.');
        let obtainedError;

        try {
            createQueryParamsString(listOfValues, queryParamVariable);
        } catch (error) {
            obtainedError = error;
        }
        
        expect(obtainedError).toMatchObject(expectedError);

        done();
    });
    test('with \'listOfValues\' set to epmty array, it must throw an error', async (done) => {
        let listOfValues = [];
        let queryParamVariable = 'id';
        let expectedError = new Error('It\'s needed a list of values in order to create a query params string.');
        let obtainedError;

        try {
            createQueryParamsString(listOfValues, queryParamVariable);
        } catch (error) {
            obtainedError = error;
        }
        
        expect(obtainedError).toMatchObject(expectedError);

        done();
    });
    test('with \'listOfValues\' set to value different than array, it must throw an error', async (done) => {
        let listOfValues = 1;
        let queryParamVariable = 'id';
        let expectedError = new Error('It\'s needed a list of values in order to create a query params string.');
        let obtainedError;

        try {
            createQueryParamsString(listOfValues, queryParamVariable);
        } catch (error) {
            obtainedError = error;
        }
        
        expect(obtainedError).toMatchObject(expectedError);

        done();
    });
    test('with \'queryParamVariable\' set to null, it must throw an error', async (done) => {
        let listOfValues = [1, 2, 3];
        let queryParamVariable = null;
        let expectedError = new Error('It\'s needed a param in order to create a query params string.');
        let obtainedError;

        try {
            createQueryParamsString(listOfValues, queryParamVariable);
        } catch (error) {
            obtainedError = error;
        }
        
        expect(obtainedError).toMatchObject(expectedError);

        done();
    });
    test('with \'queryParamVariable\' set to value different than String, it must throw an error', async (done) => {
        let listOfValues = [1, 2, 3];
        let queryParamVariable = 9;
        let expectedError = new Error('It\'s needed a param in order to create a query params string.');
        let obtainedError;

        try {
            createQueryParamsString(listOfValues, queryParamVariable);
        } catch (error) {
            obtainedError = error;
        }
        
        expect(obtainedError).toMatchObject(expectedError);

        done();
    });
    test('with \'listOfValues\' set to single value and \'queryParamVariable\' set to valid one, the query string must be created successfully.', async (done) => {
        let listOfValues = [1];
        let queryParamVariable = 'id';
        let expectedResult = '?id=1';
        let obtainedResult = createQueryParamsString(listOfValues, queryParamVariable);
        
        expect(obtainedResult).toBe(expectedResult);

        done();
    });
    test('with \'listOfValues\' set to multiple values and \'queryParamVariable\' set to valid one, the query string must be created successfully.', async (done) => {
        let listOfValues = [1, 2, 3];
        let queryParamVariable = 'id';
        let expectedResult = '?id=1&id=2&id=3';
        let obtainedResult = createQueryParamsString(listOfValues, queryParamVariable);
        
        expect(obtainedResult).toBe(expectedResult);

        done();
    });
});