import React, { useState } from "react";
import Logo from "../Components/Logo";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { TextField, InputAdornment, IconButton } from "@mui/material";
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

  //Password regex test
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  let passwordError = "";
  if (
    passwordRegex.test(employee.password) === false ||
    passwordRegex.test(accountant.password) === false ||
    passwordRegex.test(financeManager.password) === false
  ) {
    passwordError = "weak password";
  } else {
    passwordError = "strong password";
  }
  if (!employee.password || !accountant.password || !financeManager.password) {
    passwordError = "";
  }

  //Navigation
  const navigate = useNavigate();

  //login error
  const [loginError, setLoginError] = useState("");

  //Set user
  let user = "";
  if (activeAvatar === avatarArray[0].id) {
    user = "employee";
    localStorage.setItem("user", user);
  } else if (activeAvatar === avatarArray[1].id) {
    user = "accountant";
    localStorage.setItem("user", user);
  } else {
    user = "finance manager";
    localStorage.setItem("user", user);
  }

  //Login Function
  const login = (e) => {
    e.preventDefault();
    //employee
    if (activeAvatar === avatarArray[0].id) {
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/employee-login",
        data: employee,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          navigate("/EmployeeDashboard");
          console.log(response);
          localStorage.setItem("firstName", response.data.firstName);
          localStorage.setItem("lastName", response.data.lastName);
          localStorage.setItem("email", response.data.email);
          console.log(response.data.email);
          console.log(response.data.lastName);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setLoginError("Incorrect email or password");
          }
          console.log(error);
        });
      console.log("Employee");
    } else if (activeAvatar === avatarArray[1].id) {
      console.log("Accountant");

      //Post request
      //Accountant
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/accountant-login",
        data: accountant,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          navigate("/AccountantDashboard");
          console.log(response);
          localStorage.setItem("accountantId", response.data.accountantId);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setLoginError("Incorrect email or password");
          }
          console.log(error);
        });
    } else if (activeAvatar === avatarArray[2].id) {
      console.log("Finance Manager");
      //Post request
      //Finance Manager
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/financemanager-login",
        data: financeManager,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          navigate("/FinanceManagerDashboard");
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setLoginError("Incorrect email or password");
          }
          console.log(error);
        });
    }
    localStorage.setItem("user", JSON.stringify(user));
  };
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
                passwordRegex.test(employee.password) === false ||
                passwordRegex.test(accountant.password) === false ||
                passwordRegex.test(financeManager.password) === false
                  ? { style: { color: "red" } }
                  : { style: { color: "green" } }
              }
              helperText={passwordError}
              margin="normal"
              variant="outlined"
              type={showPassword ? "text" : "password"}
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
                !employee.email ||
                !accountant.password ||
                !financeManager.email ||
                !employee.password ||
                !accountant.password ||
                !financeManager.password ||
                passwordRegex.test(employee.password) === false ||
                passwordRegex.test(accountant.password) === false ||
                passwordRegex.test(financeManager.password) === false ||
                regex.test(employee.email) === false ||
                regex.test(accountant.email) === false ||
                regex.test(financeManager.email) === false
              }
              onClick={login}
            />
            <label className="loginError">{loginError}</label>
            <div className="otherLinks">
            <div className="registerHere">
              <p>Not Registered Yet?</p>
              <Link path to="/Register" className="regLink">
                Register Here
              </Link>
            </div>
          <div className="adminLoginLink">
            <Link path to="/Admin-Login" className="adminLink">
                Login as Admin
            </Link>
            </div>
            </div>
          </form>
        </div>
        <div className="loginIllustration">
          <img src={LoginIllustration} alt="loginIllustration" />
        </div>
      </div>
    </>
  );
};

export default Login;
