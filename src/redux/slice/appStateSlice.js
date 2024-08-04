import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingState: false,
  errorState: null,
}

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loadingState = action.payload;
    },
    setError(state, action) {
      state.errorState = action.payload;
    },
  }
})

export const {setLoading, setError} = appStateSlice.actions;
export default appStateSlice.reducer;