import React, {useState} from 'react'
import Logo from '../Components/Logo'
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ResetPin = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  let passwordError = ''
  if(newPassword !== confirmPassword){
    passwordError = 'Passwords do not match'
  }else{
    passwordError=''
  }
  const navigate = useNavigate()
  const reset = () =>{
    console.log(newPassword)
    navigate("/Login")
  }

  

 
  return (
    <>
      <div className='resetPin'>
        <Logo/>
        <div className='resetPinCard'>
         <h3>Reset Your Password</h3>
         <div className='resetPasswordForm'>
         <form>
         <TextField
            className="resetPasswordField"
            label="Reset Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type = "password"
            margin="normal"
            required
          />
           <TextField
            className="resetPasswordField"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={passwordError}
            FormHelperTextProps={
              newPassword !== confirmPassword
                ? { style: { color: "red" } }
                : { style: { color: "green" } }
            }
            type = "password"
            margin="normal"
            required
          />
          <input
              type="submit"
              value="Reset Password"
              className="resetButton"
              disabled={
                !newPassword ||
                !confirmPassword
              }
              onClick={reset}
            />
         </form>
         </div>
        </div>
      </div>
    </>
  )
}

export default ResetPin