import 'jest';

import axios                    from 'axios';
import { serverConf }           from '../../../../src/config';

import { graphql, GraphQLList } from 'graphql';
import gqlSchema                from '../../../../src/graphql/schema';
import ActorType                from '../../../../src/graphql/models/actor.type';
import { createActor }          from '../../../../src/graphql/mutations/actors.mutations';

const API_REST_URL = `${serverConf.api_rest.url}:${serverConf.api_rest.port}/actors`;

var persistedActor;

const getPersistedActor = () => {
    return persistedActor;
};

const setPersistedActor = (persistedActorData) => {
    persistedActor = persistedActorData;
};

afterEach(async (done) => {
    try {
        if (getPersistedActor()) {
            await axios.delete(`${API_REST_URL}/${getPersistedActor().id}`);
        }
    } catch (error) {
        console.log(`[ERROR] (persistNewActor) - Deleting actor after testing case: ${error.message}`);
    } finally {
        done();
    }
});

let testingNewActorMockedData = {
    name: 'Jest Testing Actor',
    picture: 'Jest Testing Actor Picture',
    born: '2018-07-18',
    height: 1.95,
    country: 'Canary Islands'
};

const mockedParentValues = {};
const mockedContext = {};

const getValidMutation = (newActorData) => {
    return `
        mutation {
            createActor (
                name: ${(newActorData.name && typeof newActorData.name === 'string') ? '"' + newActorData.name + '"' : newActorData.name}
                picture: ${(newActorData.picture && typeof newActorData.picture === 'string') ? '"' + newActorData.picture + '"' : newActorData.picture}
                born: ${(newActorData.born && typeof newActorData.born === 'string') ? '"' + newActorData.born + '"' : newActorData.born}
                height: ${newActorData.height}
                country: ${(newActorData.country && typeof newActorData.country === 'string') ? '"' + newActorData.country + '"' : newActorData.country}
            ) {
                id
                name
                picture
                born
                height
                country
            }
        }
    `;
};

const getWrongMutation = (newActorData) => {
    return `
        mutation {
            createActor (
                name: ${(newActorData.name && typeof newActorData.name === 'string') ? '"' + newActorData.name + '"' : newActorData.name}
            ) {
                testingWrongField
            }
        }
    `;
};

describe('[ GraphQL ] - Testing \'Actor\' queries ...', () => {
    describe('Testing \'createActor\' ...', () => {
        describe('Working directly with the \'resolve\' method ...', () => {
            const parentValues = mockedParentValues;
            const astData = {
                fieldName: 'createActor',
                returnType: new GraphQLList(ActorType),
                path: { key: 'createActor' },
                schema: gqlSchema
            };
            let context = mockedContext;
            
            test.skip('with \'args\' set to null, it must return an empty object only with \'id\' field.', async (done) => {
                let args = null;
                let obtainedResult = await createActor.resolve(parentValues, args, context, astData);
                
                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(Object.keys(obtainedResult).includes('id')).toBeTruthy();
                expect(obtainedResult.id).not.toBeNull();
                expect(obtainedResult.id).not.toBeUndefined();
                expect(obtainedResult.id).toBeGreaterThan(0);

                setPersistedActor(obtainedResult);

                done();
            });
            test.skip('with \'args.name\' set to null, the actor must be created with this field to null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.name = null;
                let obtainedResult = await createActor.resolve(parentValues, args, context, astData);
    
                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.id).not.toBeNull();
                expect(obtainedResult.id).not.toBeUndefined();
                expect(obtainedResult.id).toBeGreaterThan(0);
                expect(obtainedResult.name).toBeNull();
                expect(obtainedResult.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.country).toBe(testingNewActorMockedData.country);
                
                setPersistedActor(obtainedResult);
                
                done();
            });
            test.skip('with \'args.picture\' set to null, the actor must be created with this field to null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.picture = null;
                let obtainedResult = await createActor.resolve(parentValues, args, context, astData);
    
                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.id).not.toBeNull();
                expect(obtainedResult.id).not.toBeUndefined();
                expect(obtainedResult.id).toBeGreaterThan(0);
                expect(obtainedResult.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.picture).toBeNull();
                expect(obtainedResult.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.country).toBe(testingNewActorMockedData.country);
                
                setPersistedActor(obtainedResult);
                
                done();
            });
            test.skip('with \'args.born\' set to null, the actor must be created with this field to null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.born = null;
                let obtainedResult = await createActor.resolve(parentValues, args, context, astData);
    
                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.id).not.toBeNull();
                expect(obtainedResult.id).not.toBeUndefined();
                expect(obtainedResult.id).toBeGreaterThan(0);
                expect(obtainedResult.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.born).toBeNull();
                expect(obtainedResult.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.country).toBe(testingNewActorMockedData.country);
                
                setPersistedActor(obtainedResult);
                
                done();
            });
            test.skip('with \'args.height\' set to null, the actor must be created with this field to null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.height = null;
                let obtainedResult = await createActor.resolve(parentValues, args, context, astData);
    
                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.id).not.toBeNull();
                expect(obtainedResult.id).not.toBeUndefined();
                expect(obtainedResult.id).toBeGreaterThan(0);
                expect(obtainedResult.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.height).toBeNull();
                expect(obtainedResult.country).toBe(testingNewActorMockedData.country);
                
                setPersistedActor(obtainedResult);
                
                done();
            });
            test.skip('with \'args.country\' set to null, the actor must be created with this field to null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.country = null;
                let obtainedResult = await createActor.resolve(parentValues, args, context, astData);
    
                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.id).not.toBeNull();
                expect(obtainedResult.id).not.toBeUndefined();
                expect(obtainedResult.id).toBeGreaterThan(0);
                expect(obtainedResult.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.country).toBeNull();
                
                setPersistedActor(obtainedResult);
                
                done();
            });
            test.skip('with \'args\' set to valid payload, the actor must be created successfully.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                let obtainedResult = await createActor.resolve(parentValues, args, context, astData);
    
                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.id).not.toBeNull();
                expect(obtainedResult.id).not.toBeUndefined();
                expect(obtainedResult.id).toBeGreaterThan(0);
                expect(obtainedResult.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.country).toBe(testingNewActorMockedData.country);
                
                setPersistedActor(obtainedResult);
                
                done();
            });
        });
        
        describe('Working with the \'graphql\' method ...', () => {
            const parentValues = mockedParentValues;
            const context = mockedContext;
            const variables = null;

            test.skip('with \'args\' set to empty object, it must an error.', async (done) => {
                let args = {};
                let mutation = getValidMutation(args);
                let expectedError = {
                    errors: [
                        {
                            message: 'Argument \"name\" has invalid value undefined.\nExpected type \"String\", found undefined.',
                            locations: [
                                {
                                    line: 4,
                                    column: 23
                                }
                            ]
                        },
                        {
                            message: 'Argument \"picture\" has invalid value undefined.\nExpected type \"String\", found undefined.',
                            locations: [
                                {
                                    line: 5,
                                    column: 26
                                }
                            ]
                        },
                        {
                            message: 'Argument \"born\" has invalid value undefined.\nExpected type \"String\", found undefined.',
                            locations: [
                                {
                                    line: 6,
                                    column: 23
                                }
                            ]
                        },
                        {
                            message: 'Argument \"height\" has invalid value undefined.\nExpected type \"Float\", found undefined.',
                            locations: [
                                {
                                    line: 7,
                                    column: 25
                                }
                            ]
                        },
                        {
                            message: 'Argument \"country\" has invalid value undefined.\nExpected type \"String\", found undefined.',
                            locations: [
                                {
                                    line: 8,
                                    column: 26
                                }
                            ]
                        }
                    ]
                };
                let obtainedError = await graphql(gqlSchema, mutation, parentValues, context, variables);

                // console.log(JSON.stringify(obtainedError, null, 4));

                expect(obtainedError).toMatchObject(expectedError);

                setPersistedActor(null);

                done();
            });
            test.skip('with \'args.name\' set to null, it must an error.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.name = null;
                let mutation = getValidMutation(args);
                let expectedError = {
                    errors: [
                        {
                            message: 'Argument \"name\" has invalid value null.\nExpected \"String!\", found null.',
                            locations: [
                                {
                                    line: 4,
                                    column: 23
                                }
                            ]
                        }
                    ]
                };
                let obtainedError = await graphql(gqlSchema, mutation, parentValues, context, variables);

                expect(obtainedError).toMatchObject(expectedError);

                setPersistedActor(null);

                done();
            });
            test.skip('with \'args.picture\' set to null, the actor must be created successfully with the selected field equal null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.picture = null;
                let mutation = getValidMutation(args);
                let obtainedResult = await graphql(gqlSchema, mutation, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).not.toBeNull();
                expect(obtainedResult.data).not.toBeUndefined();
                expect(obtainedResult.data.createActor).not.toBeNull();
                expect(obtainedResult.data.createActor).not.toBeUndefined();

                expect(obtainedResult.data.createActor.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.data.createActor.picture).not.toBeUndefined();
                expect(obtainedResult.data.createActor.picture).toBeNull();
                expect(obtainedResult.data.createActor.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.data.createActor.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.data.createActor.country).toBe(testingNewActorMockedData.country);

                setPersistedActor(obtainedResult.data.createActor);

                done();
            });
            test.skip('with \'args.born\' set to null, the actor must be created successfully with the selected field equal null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.born = null;
                let mutation = getValidMutation(args);
                let obtainedResult = await graphql(gqlSchema, mutation, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).not.toBeNull();
                expect(obtainedResult.data).not.toBeUndefined();
                expect(obtainedResult.data.createActor).not.toBeNull();
                expect(obtainedResult.data.createActor).not.toBeUndefined();

                expect(obtainedResult.data.createActor.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.data.createActor.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.data.createActor.born).not.toBeUndefined();
                expect(obtainedResult.data.createActor.born).toBeNull();
                expect(obtainedResult.data.createActor.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.data.createActor.country).toBe(testingNewActorMockedData.country);

                setPersistedActor(obtainedResult.data.createActor);

                done();
            });
            test.skip('with \'args.height\' set to null, the actor must be created successfully with the selected field equal null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.height = null;
                let mutation = getValidMutation(args);
                let obtainedResult = await graphql(gqlSchema, mutation, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).not.toBeNull();
                expect(obtainedResult.data).not.toBeUndefined();
                expect(obtainedResult.data.createActor).not.toBeNull();
                expect(obtainedResult.data.createActor).not.toBeUndefined();

                expect(obtainedResult.data.createActor.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.data.createActor.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.data.createActor.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.data.createActor.height).not.toBeUndefined();
                expect(obtainedResult.data.createActor.height).toBeNull();
                expect(obtainedResult.data.createActor.country).toBe(testingNewActorMockedData.country);

                setPersistedActor(obtainedResult.data.createActor);

                done();
            });
            test.skip('with \'args.country\' set to null, the actor must be created successfully with the selected field equal null.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                args.country = null;
                let mutation = getValidMutation(args);
                let obtainedResult = await graphql(gqlSchema, mutation, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).not.toBeNull();
                expect(obtainedResult.data).not.toBeUndefined();
                expect(obtainedResult.data.createActor).not.toBeNull();
                expect(obtainedResult.data.createActor).not.toBeUndefined();

                expect(obtainedResult.data.createActor.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.data.createActor.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.data.createActor.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.data.createActor.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.data.createActor.country).not.toBeUndefined();
                expect(obtainedResult.data.createActor.country).toBeNull();

                setPersistedActor(obtainedResult.data.createActor);

                done();
            });
            test.skip('with \'args\' set to fully filled payload, the actor must be created successfully.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                let mutation = getValidMutation(args);
                let obtainedResult = await graphql(gqlSchema, mutation, parentValues, context, variables);

                expect(obtainedResult).not.toBeNull();
                expect(obtainedResult).not.toBeUndefined();
                expect(obtainedResult.data).not.toBeNull();
                expect(obtainedResult.data).not.toBeUndefined();
                expect(obtainedResult.data.createActor).not.toBeNull();
                expect(obtainedResult.data.createActor).not.toBeUndefined();

                expect(obtainedResult.data.createActor.name).toBe(testingNewActorMockedData.name);
                expect(obtainedResult.data.createActor.picture).toBe(testingNewActorMockedData.picture);
                expect(obtainedResult.data.createActor.born).toBe(testingNewActorMockedData.born);
                expect(obtainedResult.data.createActor.height).toBe(testingNewActorMockedData.height);
                expect(obtainedResult.data.createActor.country).toBe(testingNewActorMockedData.country);

                setPersistedActor(obtainedResult.data.createActor);

                done();
            });
            
            test.skip('with a wrong query, it must be returned an error.', async (done) => {
                let args = JSON.parse(JSON.stringify(testingNewActorMockedData));
                let mutation = getWrongMutation(args);
                let expectedError = {
                    errors: [
                        {
                            message: 'Cannot query field \"testingWrongField\" on type \"Actor\".',
                            locations: [
                                {
                                    line: 6,
                                    column: 17
                                }
                            ]
                        }
                    ]
                };            
                let obtainedError = await graphql(gqlSchema, mutation, parentValues, context, variables);

                expect(obtainedError).toMatchObject(expectedError);

                done();
            });
        });
    });
});