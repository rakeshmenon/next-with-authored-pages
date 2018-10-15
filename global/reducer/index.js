// @flow
import { combineReducers } from 'redux';
import globalData from './globalData';
import pageData from './pageData';

export default combineReducers({
  globalData,
  pageData
});
