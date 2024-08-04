import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import routesSlice from "./slice/routesSlice";
import lastTicketsSlice from "./slice/lastTicketsSlice";
import sideMenuSlice from "./slice/sideMenuSlice";
import seatsSlice from './slice/seatsSlice';
import passengersSlice from './slice/passengersSlice';
import appStateSlice from './slice/appStateSlice';
import saga from "./saga/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    routes: routesSlice,
    lastTickets: lastTicketsSlice,
    sideMenu: sideMenuSlice,
    seats: seatsSlice,
    passengers: passengersSlice,
    appState: appStateSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;