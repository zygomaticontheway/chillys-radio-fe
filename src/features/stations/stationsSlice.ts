import { createSlice } from '@reduxjs/toolkit';
import { IStationResponse } from '../../types/interfaces';
import { getStations } from './stationsActions';

//! в redux мы работаем с 3 осн сущностями:
// 1. Store - хранилище данных
// 2. Slice - описание логики изменений данных
// 3. Actions - действия с данными (синх и асинх)

// * можно использовать несколько action в одном slice

//описываем state для store с начальными состояниями
const initialState: IStationResponse = {
    stations: [],
    isLoading: false,
    error: ''
};

//срез данных которые мы группируем по общей для них теме (products, user, ...)
// он создается с помощью функции createSlice ()
// здесь описываем логику работы с данными с синхронных и асинхронных действий по данной "теме" (сущности)
export const stationsSlice = createSlice({
    name: 'stationsSlice', //уникальное имя
    initialState, //первоначальное значение, имя совпадает с переменной (выше) по этому просто ключ без значений

    //логика синхронных действий
    reducers: {
        cleanStations: (state) => {
            state.stations = [];
        }
    },

    //логика асинхронных действий
    //обрабатываем 3 состояния promise
    extraReducers: (builder) => {
        builder
            //действия когда данные еще не пришли
            .addCase(getStations.pending, (state) => {
                state.isLoading = true; //включаем loader
            })
            //действия когда данные пришли с успехом
            .addCase(getStations.fulfilled, (state, action) => {
                state.isLoading = false //включаем loader
                state.stations = action.payload; // payload - добавляем данные в state при успехе
            })
            //действия когда данные пришли с ошибкой
            .addCase(getStations.rejected, (state, action) => {
                state.isLoading = false
                state.stations = [] //чистим ошибочные данные
                state.error = action.payload as string //кладем ошибку в данные
            })
        
    },
});

export default stationsSlice;
export const { cleanStations } = stationsSlice.actions
