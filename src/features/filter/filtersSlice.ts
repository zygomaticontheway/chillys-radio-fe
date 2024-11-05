import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFilterState } from "../../types/interfaces";

const initialState: IFilterState = {
  filterType: "",
  filterValue: "",
  currentPage: 0,
  pageSize: 20,
}

const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter:(state, action: PayloadAction<IFilterState>) => {
      const { filterType, filterValue, currentPage, pageSize } = action.payload;
      if (filterType !== undefined) state.filterType = filterType;
      if (filterValue !== undefined) state.filterValue = filterValue;
      if (currentPage !== undefined) state.currentPage = 0;
      if (pageSize !== undefined) state.pageSize = 20;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload as number
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload as number
    },
    resetFilters: (state) => {
      state.currentPage = 0;
      state.pageSize = 20;
      state.filterType = '';
      state.filterValue = '';
    },
  },
})

export const {
  setFilter,
  setPageSize,
  setCurrentPage,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice
