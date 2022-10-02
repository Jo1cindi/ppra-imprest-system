import React, { useState } from "react";
import Logo from "../Components/Logo";
import { FaUserTie } from "react-icons/fa";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIllustration from "../Images/login.svg";
import axios from "axios";

const Login = () => {
  //Avatars
  const avatarArray = [
    {
      id: 1,
      avatar: <FaUserTie />,
      name: "Employee",
    },
    {
      id: 2,
      avatar: <FaUserTie />,
      name: "Accountant",
    },
    {
      id: 3,
      avatar: <FaUserTie />,
      name: "Finance Manager",
    },
  ];

  //Highlight avatars when clicked when clicked
  const [activeAvatar, setActiveAvatar] = useState(avatarArray[0].id);

  //Employee
  const [employee, setEmployee] = useState({
    email: "",
    password: "",
  });

  //Accountant
  const [accountant, setAccountant] = useState({
    email: "",
    password: "",
  });

  //Finance Manager
  const [financeManager, setFinancManager] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
    setAccountant({
      ...accountant,
      [e.target.name]: e.target.value,
    });
    setFinancManager({
      ...financeManager,
      [e.target.name]: e.target.value,
    });
  };

  //Email Error
  let emailError = "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    regex.test(employee.email) === false ||
    regex.test(accountant.email) === false ||
    regex.test(financeManager.email) === false
  ) {
    emailError = "Please enter a valid email address";
  } else {
    emailError = "Email is valid";
  }
  if (!employee.email || !accountant.email || !financeManager.email) {
    emailError = "";
  }

  //Navigation 
  const navigate = useNavigate()

  //login error
  const [loginError, setLoginError] = useState("")

  //Set user
  const [user, setUser] = useState("")

  //Login Function
  const login = (e) =>{
    e.preventDefault();
    //employee
    if (activeAvatar === avatarArray[0].id) {
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/employee-login",
        data: employee,
        headers: {"Content-Type": "application/json"}
      }).then((response)=>{
        navigate("/EmployeeDashboard")
        console.log(response)
      }).catch((error)=>{
        if(error.response.status === 401){
          setLoginError("Incorrect email or password")
        }
         console.log(error)
      })
      console.log("Employee");
      setUser("Employee")
      localStorage.setItem("Employee", user)
    } else if (activeAvatar === avatarArray[1].id) {
      console.log("Accountant");
      setUser("Accountant")
      localStorage.setItem("Accountant", user)
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/accountant-login",
        data: accountant,
        headers: {"Content-Type": "application/json"}
      }).then((response)=>{
        navigate("/AccountantDashboard")
        console.log(response)
      }).catch((error)=>{
        if(error.response.status === 401){
          setLoginError("Incorrect email or password")
        }
         console.log(error)
      })
    } else if (activeAvatar === avatarArray[2].id) {
      console.log("Finance Manager");
      setUser("Finance Manager")
      localStorage.setItem("Finance Manager", user)
      //Post request
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/financemanager-login",
        data: financeManager,
        headers: {"Content-Type": "application/json"}
      }).then((response)=>{
        navigate("/AccountantDashboard")
        console.log(response)
      }).catch((error)=>{
        if(error.response.status === 401){
          setLoginError("Incorrect email or password")
        }
         console.log(error)
      })
    }
  }
  return (
    <>
      <Logo />
      <div className="Login">
        <div className="loginForm">
          <h3>Login as:</h3>
          <div className="avatars">
            {avatarArray.map((avatar) => (
              <div
                className={
                  activeAvatar === avatar.id ? "avatar" : "inactiveAvatar"
                }
                key={avatar.id}
                onClick={() => {
                  setActiveAvatar(avatar.id);
                }}
              >
                <div
                  className={
                    activeAvatar === avatar.id
                      ? "individualAvatar"
                      : "inactiveIndividualAvatar"
                  }
                >
                  {avatar.avatar}
                </div>
                <p
                  className={
                    activeAvatar === avatar.id
                      ? "positionDesc"
                      : "inactivePositionDesc"
                  }
                >
                  {avatar.name}
                </p>
              </div>
            ))}
          </div>

          {/* Login Form */}
          <form>
            <TextField
              className="loginField"
              label="Email"
              name="email"
              value={
                activeAvatar === avatarArray[0].id
                  ? employee.email
                  : activeAvatar === avatarArray[1].id
                  ? accountant.email
                  : financeManager.email
              }
              onChange={handleChange}
              helperText={emailError}
              FormHelperTextProps={
                regex.test(employee.email) === false ||
                regex.test(accountant.email) === false ||
                regex.test(financeManager.email) === false
                  ? { style: { color: "red" } }
                  : { style: { color: "green" } }
              }
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              className="loginField"
              label="Password"
              name="password"
              value={
                activeAvatar === avatarArray[0].id
                  ? employee.password
                  : activeAvatar === avatarArray[1].id
                  ? accountant.password
                  : financeManager.password
              }
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type= "password"
              required
            />
            <Link path to="/ResetPin" className="forgotPassword">Forgot Password?</Link>
            <input
              type="submit"
              value="Login"
              className="loginButton"
              disabled={
                !employee.email ||
                !accountant.password ||
                !financeManager.email ||
                !employee.password ||
                !accountant.password ||
                !financeManager.password
              }
              onClick={login}
            />
            <label className="loginError">{loginError}</label>
            <div className="registerHere">
              <p>Not Registered Yet?</p>
              <Link path to = "/Register" className="regLink">Register Here</Link>
            </div>
          </form>
        </div>
        <div className="loginIllustration">
          <img src={LoginIllustration} alt="loginIllustration"/>
        </div>
      </div>
    </>
  );
};

export default Login;
