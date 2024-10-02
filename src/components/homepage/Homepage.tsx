
import StationContainer from "../stations-contatiner/StationsContainer";
import styles from "./homepage.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Homepage() {

    const [amount, setAmount] = useState<number>()
    const [error, setError] = useState<any>("") 

    useEffect(() => {
        fetchStationsAmount();
    }, [])

    const fetchStationsAmount = async () => {
        try {
            const result = await axios.get("/api/stations/amount")
            console.log(`Fetch amount: ${result.data}` );
            setAmount(result.data)
        } catch (error) {
            setError(error)
        }
    }

        return (
            <div className={styles.homepage}>
                <div className={styles.banner}>
                    <h1>The Chillys Radio</h1>
                    <h3>Listen to {amount} radio stations worldwide for free</h3>
                </div>
                <div className={styles.stationContainer}>
                    <StationContainer />
                </div>
            </div>
        )
}
