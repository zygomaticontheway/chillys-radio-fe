import StationContainer from "../stations-contatiner/StationsContainer";
import PasswordChangeForm from "../user-change-password/ChangePasswordForm";
import styles from "./homepage.module.css"


export default function Homepage() {
    return (
        <div className={styles.homepage}>
            <img src="src/media/banner2.jpg" alt="The Chillys Radio" />
            <div>
                <PasswordChangeForm userId={26} isAdmin={false} />
            </div>
            <div className={styles.stationContainer}>
                <StationContainer />
                
            </div>
        </div>
    )
}