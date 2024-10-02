import { createSlice } from "@reduxjs/toolkit"
import { IHeaderTags } from "../../types/interfaces"
import { getHeaderTags } from "./headerTagsAction"

interface ITagsState {
  tags: IHeaderTags | null
  isLoading: boolean
  error: string | null
}

// Начальное состояние
const initialState: ITagsState = {
  tags: null,
  isLoading: false,
  error: null,
}

export const tagsSlice = createSlice({
  name: "tagsSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHeaderTags.pending, state => {
        state.isLoading = true
      })
      .addCase(getHeaderTags.fulfilled, (state, action) => {
        state.isLoading = false
        state.tags = action.payload
      })
      .addCase(getHeaderTags.rejected, (state, action) => {
        state.isLoading = false
        state.tags = null
        state.error = action.payload as string
      })
  },
})

export default tagsSlice
// export const {} = tagsSlice.actions
