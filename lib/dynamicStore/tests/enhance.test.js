import { shallow } from 'enzyme';

import enhance, { getWrapperComponent } from '../enhance';
import { serverActions } from '../../../global/actions';
import { DESKTOP, PHONE } from '../../../constants';

jest.mock('next/router', () => ({ push: () => {} }));
jest.mock('../injectSagaAndReducer');
jest.mock('../monitorSagas', () => () => new Promise(resolve => resolve()));

describe('enhance', () => {
  const WrappedComponent = () => <div />;
  let WrapperComponent = getWrapperComponent(WrappedComponent, { key: 'sampleKey' });
  let mockStore;
  let getIn;

  beforeEach(() => {
    getIn = jest.fn((val) => {
      if (!(val instanceof Array)) throw Error();
    });
    mockStore = {
      getState: jest.fn().mockReturnValue({
        getIn,
      }),
      dispatch: jest.fn(),
    };
  });

  test('should return a composed function', () => {
    expect(typeof enhance(WrappedComponent, { key: 'sampleKey' })).toBe('function');
  });

  describe('has function getWrapperComponent which', () => {
    test('should return WrapperComponent with WrappedComponent inside it', () => {
      const wrapperComponent = shallow(<WrapperComponent />);
      expect(wrapperComponent.find(WrappedComponent)).toBeTruthy();
    });

    test('has static method addRequestDetails which appends requestDetails to provided action', () => {
      const sampleAction = {
        type: 'SAMPLE',
      };
      const sampleRequestDetails = {
        sample: 'sample',
      };
      expect(WrapperComponent.addRequestDetails(sampleAction, sampleRequestDetails)).toEqual({
        type: 'SAMPLE',
        requestDetails: {
          sample: 'sample',
        },
      });
    });

    describe('has function called validatePageData which', () => {
      test('should not call getState method on store if params not adequate', () => {
        WrapperComponent.validatePageData(null, {}, mockStore);
        expect(mockStore.getState).not.toHaveBeenCalled();
        WrapperComponent.validatePageData([], {}, mockStore);
        expect(mockStore.getState).not.toHaveBeenCalled();
      });

      test('should call getState method on store if params adequate', () => {
        WrapperComponent.validatePageData(['global'], {}, mockStore);
        expect(mockStore.getState).toHaveBeenCalled();
      });

      test('should iterate if storeStruct has values', () => {
        WrapperComponent.validatePageData(['global'], {}, mockStore);
        expect(getIn).toHaveBeenCalled();
      });

      test('should got to catch if criticalPath not array', () => {
        WrapperComponent.validatePageData('global', {}, mockStore);
        expect(getIn).toHaveBeenCalled();
      });

      test('should iterate even if storeStruct has values and value is present in store', () => {
        getIn = jest.fn().mockReturnValue(true);
        mockStore = {
          getState: jest.fn().mockReturnValue({
            getIn,
          }),
        };
        WrapperComponent.validatePageData(['global'], {}, mockStore);
        expect(getIn).toHaveBeenCalled();
      });

      test('should call redirect on res object when on server', () => {
        const mockRes = {
          redirect: jest.fn(),
        };
        WrapperComponent.validatePageData(['global'], mockRes, mockStore, true);
        expect(mockRes.redirect).toHaveBeenCalled();
      });
    });

    describe('has function called dispatchActions which', () => {
      test('should dispatch all actions passed to it', () => {
        WrapperComponent.dispatchActions({ actions: ['action1', () => {}], store: mockStore });
        expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
      });

      test('should dispatch all actions passed to it even when needQuery is true', () => {
        WrapperComponent.dispatchActions({
          actions: ['action1', () => {}],
          store: mockStore,
          needQuery: true,
        });
        expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
      });
    });

    describe('has function called getInitialProps which', () => {
      let req;

      beforeEach(() => {
        req = {
          device: {
            type: DESKTOP,
          },
          cookies: {},
          headers: {},
        };
        WrapperComponent.getInitialProps({
          store: mockStore,
          req,
        });
      });

      test('should call dispatch currentRoute server action', () => {
        WrapperComponent.getInitialProps({
          store: mockStore,
        });
        expect(mockStore.dispatch).toHaveBeenCalledWith(serverActions.setCurrentRoute());
      });

      test('should call dispatch server action when isServer', () => {
        WrapperComponent.getInitialProps({
          store: mockStore,
          isServer: true,
          req,
        });
        expect(mockStore.dispatch).toHaveBeenCalled();
      });

      test('should call dispatch currentRoute server action even on Mobile', () => {
        req.device.type = PHONE;
        WrapperComponent.getInitialProps({
          store: mockStore,
          isServer: true,
          req,
        });
        expect(mockStore.dispatch).toHaveBeenCalledWith(serverActions.setCurrentRoute());
      });

      test('should call dispatch when initialActions are passed', () => {
        WrapperComponent = getWrapperComponent(() => WrappedComponent, {
          key: 'sampleKey',
          initialActions: ['sampleAction'],
        });
        expect(mockStore.dispatch).toHaveBeenCalled();
      });

      test('should call getInitialProps of WrappedComponent', async () => {
        WrappedComponent.getInitialProps = jest.fn();
        WrapperComponent = getWrapperComponent(WrappedComponent, {
          key: 'sampleKey',
        });

        await WrapperComponent.getInitialProps({
          store: mockStore,
          isServer: true,
          req,
        });
        expect(WrappedComponent.getInitialProps).toHaveBeenCalled();
      });
    });
  });
});
