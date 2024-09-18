import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// !файл для работы с асинхронными запросами
//описание асинхронного запроса
//на каждый новый запрос мы создаем свой action с помощью функций из функции redux createAsyncThunk

export const getProducts = createAsyncThunk(

    'getProducts', //первый параметр - строка с уникальным именем для action

    //второй параметр - асинхронная функция с запросом
    async (_, thunkAPI) => { // в ситуации когда нужно достать только второй параметр, ставится в первом прочерк "_", первый параметр этой строки служит для динамически подставляемых переменных
        try {
            //axios - библиотека надстройка над fetch, упрощающая логику запросов
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);