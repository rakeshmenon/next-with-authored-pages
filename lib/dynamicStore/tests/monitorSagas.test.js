import { END } from 'redux-saga';

import monitorSagas from '../monitorSagas';

describe('monitorSagas', () => {
  let mockStore;
  let shouldResolve = true;
  let globalSagaPromise;
  let injectedSagasPromises;

  beforeEach(() => {
    globalSagaPromise = new Promise((resolve, reject) => (shouldResolve ? resolve() : reject()));
    injectedSagasPromises = [
      new Promise((resolve, reject) => (shouldResolve ? resolve() : reject())),
      new Promise((resolve, reject) => (shouldResolve ? resolve() : reject())),
    ];
    mockStore = {
      globalSaga: {
        task: {
          done: globalSagaPromise,
        },
      },
      dispatch: jest.fn(),
      injectedSagas: [
        {
          task: {
            done: injectedSagasPromises[0],
          },
        },
        {
          task: {
            done: injectedSagasPromises[1],
          },
        },
      ],
    };
  });
  test('should call dispatch with END param', async () => {
    expect.assertions(1);
    setTimeout(() => {
      globalSagaPromise.then();
      injectedSagasPromises[0].then();
      injectedSagasPromises[1].then();
    }, 1000);
    await monitorSagas(mockStore, true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(END);
  });

  test('should wait for all promises to complete when all resolve', async () => {
    expect.assertions(3);
    setTimeout(() => {
      globalSagaPromise.then().catch();
      injectedSagasPromises[0].then().catch();
      injectedSagasPromises[1].then().catch();
    }, 1000);
    await monitorSagas(mockStore, true);
    expect(globalSagaPromise).resolves.toBe();
    expect(injectedSagasPromises[0]).resolves.toBe();
    expect(injectedSagasPromises[1]).resolves.toBe();
  });

  test('should wait for all promises to complete when all reject', async () => {
    shouldResolve = false;
    expect.assertions(3);
    setTimeout(() => {
      globalSagaPromise.then().catch();
      injectedSagasPromises[0].then().catch();
      injectedSagasPromises[1].then().catch();
    }, 1000);
    await monitorSagas(mockStore, true);
    expect(globalSagaPromise).resolves.toBe();
    expect(injectedSagasPromises[0]).resolves.toBe();
    expect(injectedSagasPromises[1]).resolves.toBe();
  });
});
