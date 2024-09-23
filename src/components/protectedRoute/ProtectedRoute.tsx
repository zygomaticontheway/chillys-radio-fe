import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Loader from "../loader/Loader";

interface IProps {
    //вместо outlet будут приходить компоненты, которые мы будем пробрасывать в эту обертку-фильтр
    outlet: JSX.Element;
}

// проверяем, есть ли в redux данные по пользователю
//если есть, то мы покажем компонент
//если нет, то перенаправим на логин
export default function ProtectedRoute({ outlet }: IProps) {

    const { user } = useAppSelector(store => store.user)

    // if (isLoading === true) {
    //     return (
    //         <>
    //             {isLoading && <Loader />}
    //             {user.username && { outlet }}
    //         </>
    //     )
    //     //через Navigate из библиотеки react-route-
    //     return (
    //         <Navigate to='../login' />
    //     )
    // }
    if (user.username) {
        return outlet;
    } else {
        return (
            <Navigate to='../login' />
        )
    }
}
