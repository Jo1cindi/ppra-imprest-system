import React, { useState } from "react";
import Logo from "../Components/Logo";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPin = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const user = localStorage.getItem("user");

  let passwordError = "";
  if (data.password !== confirmPassword) {
    passwordError = "Passwords do not match";
  } else {
    passwordError = "";
  }

  //Email error
  let emailError = "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(data.email) === false) {
    emailError = "Please enter a valid email address";
  } else {
    emailError = "Email is valid";
  }
  if (!data.email) {
    emailError = "";
  }

  const navigate = useNavigate();

  //Reset Password Function
  const reset = (e) => {
    e.preventDefault()
    if (user === "employee") {
      axios({
        method: "put",
        url: "https://ppra-api.herokuapp.com/api/employee-reset",
        data: data,
        headers: {"Content-Type": "application/json"}
      }).then((response)=>{
        navigate("/Login");
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    }

    if (user === "accountant") {
      axios({
        method: "put",
        url: "https://ppra-api.herokuapp.com/api/accountant-reset",
        data: data,
        headers: {"Content-Type": "application/json"}
      }).then((response)=>{
        navigate("/Login");
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    }

    if (user === "finance manager") {
      axios({
        method: "put",
        url: "https://ppra-api.herokuapp.com/api/financemanager-reset",
        data: data,
        headers: {"Content-Type": "application/json"}
      }).then((response)=>{
        navigate("/Login");
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    }

    
    console.log(user);
  };

  return (
    <>
      <div className="resetPin">
        <Logo />
        <div className="resetPinCard">
          <h3>Reset Your Password</h3>
          <div className="resetPasswordForm">
            <form>
              <TextField
                className="resetPasswordField"
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                helperText={emailError}
                FormHelperTextProps={
                  regex.test(data.email) === false
                    ? { style: { color: "red" } }
                    : { style: { color: "green" } }
                }
                margin="normal"
                required
              />
              <TextField
                className="resetPasswordField"
                label="Reset Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                type="password"
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
                  data.password !== confirmPassword
                    ? { style: { color: "red" } }
                    : { style: { color: "green" } }
                }
                type="password"
                margin="normal"
                required
              />
              <input
                type="submit"
                value="Reset Password"
                className="resetButton"
                disabled={
                  !data.password ||
                  !confirmPassword ||
                  !data.email ||
                  regex.test(data.email) === false
                }
                onClick={reset}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPin;
