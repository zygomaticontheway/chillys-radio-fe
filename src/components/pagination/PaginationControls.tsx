
import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./paginationControls.module.css"
import { useAppSelector } from "../../redux/hooks"


const PaginationControls = () => {
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    // const dispatch = useAppDispatch();
    const page = searchParams[0].get('page') ?? '1';
    const size = searchParams[0].get('size') ?? '20';
    const isFirst = useAppSelector(state => state.stationsResponse.data.first);
    const isLast = useAppSelector(state => state.stationsResponse.data.last);
    // const currentPage = useAppSelector(state => state.stationsResponse.data.number);
    // const totalPages = useAppSelector(state => state.stationsResponse.data.totalPages);

    
    // const handleCurrentPage = () => {
    //     dispatch(setCurrentPage(Number(page)))
    // }


    return (
        <div className={styles.paginationContainer}>
            <button
                className={styles.nextPrivButton}
                disabled={isFirst}
                onClick={() => {
                    navigate(`/?page=${Number(page) - 1}&size=${size}`)
                }}>
                Back
            </button>
            <div>
                {page} / {Math.ceil(20 / Number(size))}
            </div>
            <button
                className={styles.nextPrivButton}
                disabled={isLast}
                onClick={() => {
                    navigate(`/?page=${Number(page) + 1}&size=${size}`)
                }}>
                Next
            </button>
        </div>
    )
}
export default PaginationControls
