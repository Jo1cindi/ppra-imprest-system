import React, {useState} from 'react'
import AdminSidebar from '../../Components/AdminSidebar';
import { TextField } from "@mui/material";
import axios from "axios";

const RemoveUsers = () => {
 
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState("")

  //Email
  let emailError = "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    regex.test(email) === false 
  ) {
    emailError = "Please enter a valid email address";
  } else {
    emailError = "Email is valid";
  }
  if (email) {
    emailError = "";
  }

  //Remove user
  const removeUser = () =>{
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/remove-user",
      data: {email: email},
      headers: { "Content-Type": "application/json" }
    }).then((response)=>{
      console.log(response)
      setSuccess("User Deleted Successfully")
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
      <div>
        <AdminSidebar/>
        <div className='removeUsers'>
         <h3>Remove User</h3>
        <div className="removeUserForm">
           <TextField
              className="loginField"
              label="Enter User Email Address"
              name="email"
              value={
                email
              }
              onChange={(e)=> setEmail(e.target.value)}
              helperText={emailError}
              FormHelperTextProps={
                regex.test(email) === false
                  ? { style: { color: "red" } }
                  : { style: { color: "green" } }
              }
              margin="normal"
              variant="outlined"
              required
            />
            <input
              type="submit"
              value="Remove User"
              className="loginButton"
              disabled={
                !email ||
                regex.test(email) === false
              }
              onClick={removeUser()}
            />
         </div>
         <p className="deletionSuccess">{success}</p>
        </div>
      </div>
    </>
  )
}

export default RemoveUsers;