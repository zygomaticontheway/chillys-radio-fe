import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNewPassword, setOldPassword,} from "../../features/userPassword/userPasswordSlice"
import "./changePasswordForm.module.css"
import { changePassword } from "../../features/userPassword/userPasswordAction"
import React from "react"
import { AppDispatch, RootState } from "../../redux/store"


// interface PasswordChangeFormProps {
//   name: string
// }

const PasswordChangeForm  =() => {
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

  return(
    <div>
      <h2>Change password</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          <label>Old Password</label>
          <input type="password" value={oldPassword} required onChange={(e) => dispatch(setOldPassword(e.target.value))}/>
        </div>
        <div>
          <label>New Password</label>
          <input type="password" value={newPassword} required onChange={(e) => dispatch(setNewPassword(e.target.value))} />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input type="password" value={confirmNewPassword} required onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>Change Password</button>
      </form>
      {loading && <p>changing password...</p> }
      {error && <p style={{color: 'red'}}>{error}</p> }
      {success && <p>Password changed successfully</p> }
    </div> 
  );

};

export default PasswordChangeForm;
