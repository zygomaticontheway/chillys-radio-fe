import { createSlice } from "@reduxjs/toolkit"
import { IHeaderTags } from "../../types/interfaces"
import { getHeaderCountries } from "./headerTagsAction"

interface ICountriesState {
  countries: IHeaderTags | null
  isLoading: boolean
  error: string | null
}

const initialState: ICountriesState = {
  countries: null,
  isLoading: false,
  error: null,
}

export const countriesSlice = createSlice({
  name: "countriesSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHeaderCountries.pending, state => {
        state.isLoading = true
      })
      .addCase(getHeaderCountries.fulfilled, (state, action) => {
        state.isLoading = false
        state.countries = action.payload
      })
      .addCase(getHeaderCountries.rejected, (state, action) => {
        state.isLoading = false
        state.countries = null
        state.error = action.payload as string
      })
  },
})

export default countriesSlice
// export const {} = countriesSlice.actions
