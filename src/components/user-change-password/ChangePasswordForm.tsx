import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { changePassword } from "../../features/userPassword/userPasswordAction"
import { resetPasswordState } from "../../features/userPassword/userPasswordSlice"
import "./changePasswordForm.module.css"


interface PasswordChangeFormProps {
  userId: number
  isAdmin: boolean
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  userId,
  isAdmin,
}) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, success, error } = useSelector(
    (state: RootState) => state.userPassword,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // const correctOldPassword = "qwerty"
    // if (oldPassword !== correctOldPassword) {
    //   setLocalError("Incorrect old password")
    //   return
    // }

    if (newPassword !== confirmPassword) {
      setLocalError("The new password doesn't match")
      return
    }
    
      dispatch(changePassword({ userId, oldPassword, newPassword }))
    


  }

  useEffect(() => {
    if (success) {
      alert(' Password successfully changed');
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      dispatch(resetPasswordState())
    }
  }, [success, dispatch])

  return (
    <div className="password-form-container">
      <h2>Change Password</h2>
      {success && (
        <p className="success-msg"> Password successfully changed !</p>
      )}
      {error && <p className="error-msg"> Password not changed, error</p>}
      {localError && <p className="error-msg">{localError}</p>}
      <form onSubmit={handleSubmit} className="password=form">
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Saving..." : "Change password"}
        </button>
        {isAdmin && <p>You are logged in as an Admin</p>}
      </form>
    </div>
  )
}

export default PasswordChangeForm
