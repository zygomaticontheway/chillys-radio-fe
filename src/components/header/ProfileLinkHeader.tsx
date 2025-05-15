import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { getUserWithToken } from '../../features/auth/authActions';


const ProfileLinkHeader: React.FC = () => {
  const token = localStorage.getItem("user-token");
  const name = useAppSelector((state) => state.user.user.name)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserWithToken(token));
    }
  }, [dispatch, token])


  if (token) {
    return (
      <div className={styles.rightAligned}>
        <Link to={"/my-profile"} className={`${styles.navLink} ${styles.profileLink}`}>
          <svg className={styles.profileSvg} fill="#ffffff" height="16px" width="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.615 472.615" stroke="#ffffff"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <g> <circle cx="236.308" cy="117.504" r="111.537"></circle> </g> </g> <g> <g> <path d="M369,246.306c-1.759-1.195-5.297-3.493-5.297-3.493c-28.511,39.583-74.993,65.402-127.395,65.402 c-52.407,0-98.894-25.825-127.404-65.416c0,0-2.974,1.947-4.451,2.942C41.444,288.182,0,360.187,0,441.87v24.779h472.615V441.87 C472.615,360.549,431.538,288.822,369,246.306z"></path> </g> </g> </g></svg>
          <span className={styles.profileText}>{name}</span>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles.rightAligned}>
        <Link to="/register" className={`${styles.navLink} ${styles.profileLink}`}>
          <svg className={styles.profileSvg} fill="#ffffff" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.615 472.615"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M382.128,277.457c-49.974,0-90.487,40.512-90.487,90.485c0,49.976,40.513,90.488,90.487,90.488 c49.975,0,90.487-40.512,90.487-90.488C472.615,317.969,432.103,277.457,382.128,277.457z M437.618,377.794h-45.644v45.635 h-19.692v-45.635h-45.644v-19.692h45.644v-45.644h19.692v45.644h45.644V377.794z"></path> </g> </g> <g> <g> <circle cx="207.852" cy="112.292" r="98.107"></circle> </g> </g> <g> <g> <path d="M363.039,259.534c-11.396-12.799-24.24-24.285-38.456-33.948c-1.546-1.051-4.659-3.072-4.659-3.072 c-25.079,34.817-65.966,57.529-112.061,57.529c-46.099,0-86.99-22.717-112.068-57.541c0,0-2.615,1.709-3.916,2.587 C36.456,262.423,0,325.76,0,397.611v21.795h284.776c-8.161-15.378-12.831-32.879-12.831-51.469 C271.946,313.707,311.366,268.613,363.039,259.534z"></path> </g> </g> </g></svg>
          Register
        </Link>
      </div>
    );
  }
};

export default ProfileLinkHeader;
