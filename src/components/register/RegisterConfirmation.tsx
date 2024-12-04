
import { useEffect, useState } from 'react';
import styles from '../login/login.module.css'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function RegisterConfirmation() {

    const [searchParams] = useSearchParams();
    const confirmationCode = searchParams.get("id")
    const CONFIRMATION_URL = `https://urchin-app-jq2i7.ondigitalocean.app/api/auth/confirm/${confirmationCode}`

    const [error, setError] = useState<any>('')
    const [user, setUser] = useState<any>('')
    


    const getUser = async () => {
        try {

            const result = await axios.get(CONFIRMATION_URL);
            setUser(result.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred')
        }
    }

    useEffect(() => {
        if (confirmationCode) {
            getUser();
        } else {
            setError('Invalid confirmation code');
        }
    }, [confirmationCode]);

    return (
        <div className={styles.registerConfirmation}>
            <div className={styles.registrationBanner}></div>
            <h1>Registration confirmation</h1>
            {user && <p className={styles.confirmationGreetings}>Thank you {user.name}, your registration successfully confirmed.</p>}
            {error && <p className={styles.error}>{error}</p>}
            <p>Have a nice time with the Chillys Radio</p>
        </div>
    );
}
