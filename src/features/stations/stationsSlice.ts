import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IStation, IStationResponse } from "../../types/interfaces"
import { getStations } from "./stationsActions"
import axios from "axios"
import { RootState } from "../../redux/store"

export const searchStations = createAsyncThunk<
  IStation[], // Тип возвращаемых данных
  { name: string; page: number; size: number }, // Тип аргументов
  { state: RootState; rejectValue: string } // Тип для ThunkAPI
>("stations/search", async ({ name, page, size }, { rejectWithValue }) => {
  try {
    const response = await axios.get<IStationResponse>(
      `/api/stations/search?name=${name}&page=${page}&size=${size}`,
    )
    return response.data.stations // Возвращаем только массив станций
  } catch (error) {
    return rejectWithValue("An error occurred while searching stations")
  }
})
//! в redux мы работаем с 3 осн сущностями:
// 1. Store - хранилище данных
// 2. Slice - описание логики изменений данных
// 3. Actions - действия с данными (синх и асинх)

// * можно использовать несколько action в одном slice

//описываем state для store с начальными состояниями
const initialState: IStationResponse = {
  stations: [],
  isLoading: false,
  error: ""
}

//срез данных которые мы группируем по общей для них теме (products, user, ...)
// он создается с помощью функции createSlice ()
// здесь описываем логику работы с данными с синхронных и асинхронных действий по данной "теме" (сущности)
const stationsSlice = createSlice({
  name: "stationsSlice", //уникальное имя
  initialState, //первоначальное значение, имя совпадает с переменной (выше) по этому просто ключ без значений

  //логика синхронных действий
  reducers: {
    cleanStations: state => {
      state.stations = []
    },
  },


    //логика асинхронных действий
    //обрабатываем 3 состояния promise
    extraReducers: (builder) => {
        builder
            .addCase(getStations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stations = action.payload;
            })
            .addCase(getStations.rejected, (state, action) => {
                state.isLoading = false;
                state.stations = [];
                state.error = action.payload as string;
            })
            .addCase(searchStations.pending, (state) => {
                state.isLoading = true;
                state.error = '';
              })
              .addCase(searchStations.fulfilled, (state, action: PayloadAction<IStation[]>) => {
                state.isLoading = false;
                state.stations = action.payload;
              })
              .addCase(searchStations.rejected, (state, action) => {
                state.isLoading = false;
                state.stations = [];
                state.error = action.payload as string;
              });
        
    },
});


export default stationsSlice
export const { cleanStations } = stationsSlice.actions
