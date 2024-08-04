import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureSeatsState: [],
  arrivalSeatsState: [],
  isTotalSuccessState: false,
  userState: {
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: '',
  },
}

const passengersSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    getPassengers(state, action) {
        if(action.payload.direction === 'departure') {
          if(state.departureSeatsState.some(seats => seats.passengerNumber !== action.payload.passengerNumber) || state.departureSeatsState.length === 0) {
            state.departureSeatsState.push(action.payload);
          }
          if(state.departureSeatsState.some(seats => seats.passengerNumber === action.payload.passengerNumber)) {
            state.departureSeatsState = state.departureSeatsState.filter(seats => seats.passengerNumber !== action.payload.passengerNumber);
            state.departureSeatsState.push(action.payload);
          }
        }
        if(action.payload.direction === 'arrival') {
          if(state.arrivalSeatsState.some(seats => seats.passengerNumber !== action.payload.passengerNumber) || state.arrivalSeatsState.length === 0) {
            state.arrivalSeatsState.push(action.payload);
          }
          if(state.arrivalSeatsState.some(seats => seats.passengerNumber === action.payload.passengerNumber)) {
            state.arrivalSeatsState = state.arrivalSeatsState.filter(seats => seats.passengerNumber !== action.payload.passengerNumber);
            state.arrivalSeatsState.push(action.payload);
          }
        }    
    },
    getUser(state, action) {
      state.userState.first_name = action.payload.first_name;
      state.userState.last_name = action.payload.last_name;
      state.userState.patronymic = action.payload.patronymic;
      state.userState.email = action.payload.email;
      state.userState.payment_method = action.payload.payment_method;
      state.userState.phone = action.payload.phone;
  },
    isTotalSuccess(state, action) {
      if(action.payload[0].find(seats => seats.isSuccess === false) || action.payload[1].find(seats => seats.isSuccess === false)) {
        state.isTotalSuccessState = false;
      } else {
        state.isTotalSuccessState = true;
      }
    },
    removePassenger(state, action) {
      if(action.payload.direction === 'departure') {
        state.departureSeatsState.forEach(seat => {
          if(seat.coach_id === action.payload.coach_id) {
            state.departureSeatsState = state.departureSeatsState.filter(seat => seat.seat_number !== action.payload.seatNumber);
          }
        });
      }
      if(action.payload.direction === 'arrival') {
        state.arrivalSeatsState.forEach(seat => {
          if(seat.coach_id === action.payload.coach_id) {
            state.arrivalSeatsState = state.arrivalSeatsState.filter(seat => seat.seat_number !== action.payload.seatNumber);
          }
        });
      }
    }
  }
})

export const {getPassengers, removePassenger, isTotalSuccess, getUser} = passengersSlice.actions;
export default passengersSlice.reducer;