import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seatsState: [],
  ticketState: {},
}

const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    getSeats(state, action) {
        if(state.seatsState.some(seats => seats.id !== action.payload.id) || state.seatsState.length === 0) {
          state.seatsState.push(action.payload);
        }
        if(state.seatsState.some(seats => seats.id === action.payload.id)) {
          state.seatsState = state.seatsState.filter(seats => seats.id !== action.payload.id);
          state.seatsState.push(action.payload);
        }
        if(action.payload.checkedSeats.length === 0) {
          state.seatsState = state.seatsState.filter(seats => seats.id !== action.payload.id);
        }
        if(action.payload.ticket.arrival && state.seatsState.some(seats => seats.ticket.arrival && seats.ticket.arrival._id !== action.payload.ticket.arrival._id)) {
          state.seatsState = state.seatsState.filter(seats => seats.ticket.arrival._id === action.payload.ticket.arrival._id);
        }
        if(action.payload.ticket.departure && state.seatsState.some(seats => seats.ticket.departure && seats.ticket.departure._id !== action.payload.ticket.departure._id)) {
          state.seatsState = state.seatsState.filter(seats => seats.ticket.departure._id === action.payload.ticket.departure._id);
        }
    },
    getTicket(state, action) {
      state.ticketState = action.payload;
    },
    removeSeat(state, action) {
      state.seatsState.forEach(seat => {
        if(seat.id === action.payload.coach_id) {
          seat.adultSeats = seat.adultSeats.filter(seat => seat !== action.payload.seatNumber);
          seat.childSeats = seat.childSeats.filter(seat => seat !== action.payload.seatNumber);
          seat.checkedSeats = seat.checkedSeats.filter(seat => seat !== action.payload.seatNumber);
        }
      });
    }
  }
})

export const {getSeats, removeSeats, getTicket, removeSeat} = seatsSlice.actions;
export default seatsSlice.reducer;