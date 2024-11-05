import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNewPassword, setOldPassword,} from "../../features/userPassword/userPasswordSlice"
import { changePassword } from "../../features/userPassword/userPasswordAction"
import styles from "./changePasswordForm.module.css"
import React from "react"
import { AppDispatch, RootState } from "../../redux/store"




const PasswordChangeForm  = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { oldPassword, newPassword, loading, error, success } = useSelector((state: RootState ) => state.password);

  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if(newPassword !== confirmNewPassword) {
    alert('The Passwords don`t match!');
    return;
  }

  dispatch(changePassword({ oldPassword, newPassword })); 
};

  React.useEffect(()=> {
    if(success) {
      setConfirmNewPassword('');
    }
  }, [success]);

  return(
    <div className={styles.passwordFormContainer}>
      <h2>Change password</h2>
      <form onSubmit = {handleSubmit} className={styles.passwordForm}>
        <div className={styles.formGroup}> 
          <label className={styles.formGroupLabel}>Old Password</label>
          <input className={styles.formGroupInput} type="password" value={oldPassword} onChange={(e) => dispatch(setOldPassword(e.target.value))} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formGroupLabel}>New Password</label>
          <input className={styles.formGroupInput} type="password" value={newPassword} onChange={(e) => dispatch(setNewPassword(e.target.value))} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formGroupLabel}>Confirm New Password</label>
          <input className={styles.formGroupInput} type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className={styles.submitButton}>Change Password</button>
      </form>
      {loading && <p>changing password...</p> }
      {error && <p style={{color: 'red'}}>{error}</p> }
      {success && <p>Password successfully changed</p> }
    </div> 
  );

};

export default PasswordChangeForm;
