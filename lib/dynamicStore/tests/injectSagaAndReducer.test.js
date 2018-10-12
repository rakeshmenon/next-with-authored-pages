import injectSagaAndReducer from '../injectSagaAndReducer';

jest.mock();

describe('injectSagaAndReducer', () => {
  const key = 'test';
  let store;
  let saga;
  let reducer;

  beforeEach(() => {
    store = {
      dispatch: () => {},
      subscribe: () => {},
      getState: () => {},
      replaceReducer: () => {},
      runSaga: () => {},
      injectedReducers: {},
      injectedSagas: {},
    };
    saga = () => {};
    reducer = () => {};
  });

  test('should fail if key is not passed', () => {
    expect(() => {
      injectSagaAndReducer(undefined, store);
    }).toThrow();
  });

  test('should remove old sagas from store.injectedSagas', () => {
    store.injectedSagas = {
      [key]: { task: { cancel: () => {} } },
    };
    injectSagaAndReducer(key, store);
    expect(store).not.toHaveProperty(key);
  });

  test('should inject saga', () => {
    injectSagaAndReducer(key, store, saga);
    expect(store.injectedSagas).toHaveProperty(key);
  });

  test('should inject reducer', () => {
    injectSagaAndReducer(key, store, undefined, reducer);
    expect(store.injectedReducers).toHaveProperty(key);
  });

  test('should inject saga and reducer', () => {
    injectSagaAndReducer(key, store, saga, reducer);
    expect(store.injectedSagas).toHaveProperty(key);
    expect(store.injectedReducers).toHaveProperty(key);
  });
});
