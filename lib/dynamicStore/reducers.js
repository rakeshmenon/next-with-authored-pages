import { combineReducers } from 'redux-immutable';
import globalReducer from '../../global/reducer';

/**
 * @function createReducer - Combine reducer for given page level component with global ones
 * @param {Object} injectedReducers
 * @returns {function}
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    global: globalReducer,
    ...injectedReducers,
  });
}
