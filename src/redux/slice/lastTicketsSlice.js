import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const lastTicketsSlice = createSlice({
  name: 'lastTickets',
  initialState,
  reducers: {
    lastTicketsLoading(state) {
      state.loading = true;
    },
    lastTicketsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    lastTicketsError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {lastTicketsLoading, lastTicketsSuccess, lastTicketsError} = lastTicketsSlice.actions;
export default lastTicketsSlice.reducer;