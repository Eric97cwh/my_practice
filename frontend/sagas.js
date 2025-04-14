import { all, fork } from 'redux-saga/effects';
// to import all the sagas here
import testSaga from './test/testSaga';

const rootSaga = function* () {
  yield all([
    fork(testSaga),
  ]);
};

export default rootSaga;
