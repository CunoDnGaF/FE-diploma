import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
  items: [],
  loading: false,
  error: null,
  sortingState: 'date',
  offsetState: 0,
  pageCountState: 5,
}

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    routesLoading(state) {
      state.loading = true;
    },
    routesSuccess(state, action) {
      state.loading = false;
      state.totalCount = action.payload.total_count;
      state.items = action.payload.items;
    },
    routesError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    routesGetOptions(state, action) {
      state.sortingState = action.payload.sorting;
      state.pageCountState = action.payload.pageCount;
      state.offsetState = action.payload.offset;
    },
  }
})

export const {routesLoading, routesSuccess, routesError, routesGetOptions} = routesSlice.actions;
export default routesSlice.reducer;