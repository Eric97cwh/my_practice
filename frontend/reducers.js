import { combineReducers } from 'redux';
// to import all the reducers here
import testReducer from './test/testSlice';

const rootReducer = combineReducers({
  test: testReducer,
});

export default rootReducer;
