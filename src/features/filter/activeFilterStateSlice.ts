// import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { useAppSelector } from "../../redux/hooks"

// const amount = useAppSelector((state) => state.allStationsAmount.amount)
// const filteredAmount = useAppSelector((state) => state.stationsResponse.data.totalElements)


// export interface IActiveFilterState {
//     filter: string
//     stationsAmount: number
// }

// const initialState: IActiveFilterState = {
//     filter: "All radio stations",
//     stationsAmount: amount
// }

// const setActiveFilterState = createSlice({
//     name: "setActiveFilterState",
//     initialState,
//     reducers: {
//         setActiveFilter: ( state, action: PayloadAction<string>) => {
//             state.filter = action.payload.filter;
//             state.stationsAmount = action.payload.stationsAmount
//         }
//     },
// })

// export const { setActiveFilter } = setActiveFilterState.actions
// export default setActiveFilterState

