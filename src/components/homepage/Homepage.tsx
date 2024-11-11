

import styles from "./homepage.module.css"
import StationsContainer from "../stations-container/StationsContainer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getAllStationsAmount } from "../../features/stations/stationsActions";


export default function Homepage() {

    const amount = useAppSelector((state) => state.allStationsAmount.amount);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllStationsAmount())
      }, [])

        return (
            <div className={styles.homepage}>
                <div className={styles.banner}>
                    <h1 className={styles.h1}>The Chillys Radio</h1>
                    <h3 className={styles.h3}>Listen to {amount} radio stations worldwide for free</h3>
                </div>
                <div className={styles.stationContainerWrapper}>
                    <StationsContainer />
                </div>
            </div>
        )
}
