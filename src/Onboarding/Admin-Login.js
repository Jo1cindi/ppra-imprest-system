import React from 'react'
import CompanyLogo from "../Images/logoDark.svg"
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const AdminLogin = () => {
 
  //Admin Login Data
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) =>{
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  //Form Validation
  //Email
  let emailError = "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(regex.test(loginData.email) === true || !loginData.email){
    emailError = ""
  }else{
    emailError = "Please enter a valid email address";
  }
 
  //Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  let passwordError = "";
  if(passwordRegex.test(loginData.password) === true){
    passwordError = "strong password"
  }else if(passwordRegex.test(loginData.password) === false){
    passwordError = "weak password";
  }else if(!loginData.password){
    passwordError = ""
  }


  //Navigation
  const navigate = useNavigate();

  //login error
  const [loginError, setLoginError] = useState("");

  //Login
  const login = (e) =>{
    e.preventDefault()
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/admin-login",
      data: loginData,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        navigate("/Admin-Dashboard");
        console.log(response);
        localStorage.setItem("email", response.data.email);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setLoginError("Incorrect email or password");
        }
        console.log(error);
      });
  }

  return (
    <div className='adminLogin'>
    <div className='topmargin'></div>
     <div className='adminLogo'>
     <img src={CompanyLogo} alt="Logo Light" /> 
     </div>
     <h3>Admin Login</h3>
     <div className='adminLoginForm'>
      <form autoComplete='off'>
      <TextField
        className="loginField"
              label="Email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              helperText={emailError}
              FormHelperTextProps={
                regex.test(loginData.email) === false
                  ? { style: { color: "red" } }
                  : { style: { color: "green" } }
              }
              margin="normal"
              variant="outlined"
              autoComplete='off'
              required
      />
      <TextField
              className="loginField"
              label="Password"
              name="password"
              value={loginData.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              FormHelperTextProps={
                passwordRegex.test(loginData.password) === false
                  ? { style: { color: "red" } }
                  : { style: { color: "green" } }
              }
              helperText={passwordError}
              margin="normal"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              autoComplete= "off"
              required
            />
            <Link path to="/ResetPin" className="forgotPassword">
              Forgot Password?
            </Link>
            <input
              type="submit"
              value="Login"
              className="loginButton"
              disabled={
                !loginData.email ||
                regex.test(loginData.email) === false ||
                !loginData.password ||
                passwordRegex.test(loginData.password) === false
              }
              onClick={login}
            />
            <label className="loginError">{loginError}</label>
      </form>
     </div>
    </div>
  )
}

export default AdminLogin