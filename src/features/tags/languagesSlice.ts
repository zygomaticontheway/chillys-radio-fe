import { createSlice } from "@reduxjs/toolkit"
import { IHeaderTags } from "../../types/interfaces"
import { getHeaderLanguages } from "./headerTagsAction"

interface ILanguageState {
  languages: IHeaderTags | null
  isLoading: boolean
  error: string | null
}

const initialState: ILanguageState = {
  languages: null,
  isLoading: false,
  error: null,
}

export const languageSlice = createSlice({
  name: "languageSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHeaderLanguages.pending, state => {
        state.isLoading = true
      })
      .addCase(getHeaderLanguages.fulfilled, (state, action) => {
        state.isLoading = false
        state.languages = action.payload
      })
      .addCase(getHeaderLanguages.rejected, (state, action) => {
        state.isLoading = false
        state.languages = null
        state.error = action.payload as string
      })
  },
})

export default languageSlice
// export const {} = tagsSlice.actions
