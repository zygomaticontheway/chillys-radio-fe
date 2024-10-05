import { useAppSelector } from "../../redux/hooks"

const amount = useAppSelector((state) => state.stationsResponse.data.totalElements)

export interface IActiveFilterState {
    filter: string
    stationsAmount: number
}

const initialState: IActiveFilterState = {
    filter: "All radio stations",
    stationsAmount: amount
}