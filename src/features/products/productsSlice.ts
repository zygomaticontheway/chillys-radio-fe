import { createSlice } from '@reduxjs/toolkit';
import { IProductCard } from '../../components/shop/Shop';
import { getProducts } from './productsActions';

//! в redux мы работаем с 3 осн сущностями:
// 1. Store - хранилище данных
// 2. Slice - описание логики изменений данных
// 3. Actions - действия с данными (синх и асинх)

// * можно использовать несколько action в одном slice

//описываем интерфейс для данных в state
interface IProductState {
    products: IProductCard[],
    isLoading: boolean,
    error: string
}

//описываем state для store с начальными состояниями
const initialState: IProductState = {
    products: [],
    isLoading: false,
    error: '',
};

//срез данных которые мы группируем по общей для них теме (products, user, ...)
// он создается с помощью функции createSlice ()
// здесь описываем логику работы с данными с синхронных и асинхронных действий по данной "теме" (сущности)
export const productsSlice = createSlice({
    name: 'productsSlice', //уникальное имя
    initialState, //первоначальное значение, имя совпадает с переменной (выше) по этому просто ключ без значений

    //логика синхронных действий
    reducers: {
        cleanProducts: (state) => {
            state.products = [];
        }
    },

    //логика асинхронных действий
    //обрабатываем 3 состояния promise
    extraReducers: (builder) => {
        builder
            //действия когда данные еще не пришли
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true; //включаем loader
            })
            //действия когда данные пришли с успехом
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false //включаем loader
                state.products = action.payload; // payload - добавляем данные в state при успехе
            })
            //действия когда данные пришли с ошибкой
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.products = [] //чистим ошибочные данные
                state.error = action.payload as string //кладем ошибку в данные
            })
            // можно добавлять сколько угодно кейсов для разных функций
            //.addCase(другая_функция.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.products = [] //чистим ошибочные данные
            //     state.error = action.payload as string //кладем ошибку в данные
            // })
    },
});

export default productsSlice;
export const { cleanProducts } = productsSlice.actions
