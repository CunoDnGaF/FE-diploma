import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  haveFirstClassState: '',
  haveSecondClassState: '',
  haveThirdClassState: '',
  haveFourthClassState: '',
  haveWifiState: '',
  haveExpressState: '',
  startDepartureHourFromState: -1000,
  startDepartureHourToState: 24000,
  startArrivalHourFromState: -1000,
  startArrivalHourToState: 24000,
  endDepartureHourFromState: -1000,
  endDepartureHourToState: 24000,
  endArrivalHourFromState: -1000,
  endArrivalHourToState: 24000,
  minPriceState: 0,
  maxPriceState: 10000,
  dateStartState: '',
  dateEndArrivalState: '',
}

const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    sideMenuGetOptions(state, action) {
      state.haveFirstClassState = action.payload.haveFirstClass;
      state.haveSecondClassState = action.payload.haveSecondClass;
      state.haveThirdClassState = action.payload.haveThirdClass;
      state.haveFourthClassState = action.payload.haveFourthClass;
      state.haveWifiState = action.payload.haveWifi;
      state.haveExpressState = action.payload.haveExpress;
      state.startDepartureHourFromState = action.payload.startDepartureHourFrom;
      state.startDepartureHourToState = action.payload.startDepartureHourTo;
      state.startArrivalHourFromState = action.payload.startArrivalHourFrom;
      state.startArrivalHourToState = action.payload.startArrivalHourTo;
      state.endDepartureHourFromState = action.payload.endDepartureHourFromL;
      state.endDepartureHourToState = action.payload.endDepartureHourTo;
      state.endArrivalHourFromState = action.payload.endArrivalHourFrom;
      state.endArrivalHourToState = action.payload.endArrivalHourTo;
      state.minPriceState = action.payload.minPrice;
      state.maxPriceState = action.payload.maxPrice;
      state.dateStartState = action.payload.dateStart;
      state.dateEndArrivalState = action.payload.dateEndArrival;
    },
  }
})

export const {sideMenuGetOptions} = sideMenuSlice.actions;
export default sideMenuSlice.reducer;