

import styles from "./homepage.module.css"
import StationsContainer from "../stations-container/StationsContainer";
import { useAppSelector } from "../../redux/hooks";


export default function Homepage() {

    const amount = useAppSelector((state) => state.allStationsAmount.amount);

        return (
            <div className={styles.homepage}>
                <div className={styles.banner}>
                    <h1>The Chillys Radio</h1>
                    <h3>Listen to {amount} radio stations worldwide for free</h3>
                </div>
                <div className={styles.stationContainerWrapper}>
                    <StationsContainer />
                </div>
            </div>
        )
}
