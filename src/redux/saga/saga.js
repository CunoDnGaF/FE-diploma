import { take, put, spawn, takeLatest, call } from 'redux-saga/effects';
import { routesLoading, routesSuccess, routesError } from "../slice/routesSlice"
import { lastTicketsLoading, lastTicketsSuccess, lastTicketsError } from "../slice/lastTicketsSlice"

async function getData(path) {
  const response = await fetch(`https://students.netoservices.ru/fe-diplom/${path}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

function* handleLoadingSaga(actions, action) {
  try {
    const data = yield call(getData, action.payload);
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.error(error.message));
  }
}

function* watchLoadingSaga(actions) {
  while(true) {
    const actionType = actions.req.type;
    yield take(actionType);
    yield takeLatest(actionType, handleLoadingSaga, actions)
  }
}

export default function* saga() {
  yield spawn(watchLoadingSaga, {
    req: routesLoading, 
    success: routesSuccess, 
    error: routesError
  })
  yield spawn(watchLoadingSaga, {
    req: lastTicketsLoading, 
    success: lastTicketsSuccess, 
    error: lastTicketsError
  })
}