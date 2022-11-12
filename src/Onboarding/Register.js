import React, { useState } from "react";
import Logo from "../Components/Logo";
import illustration from "../Images/signup.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  //Employee
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    phoneNumber: "",
    password: "",
  });

  //Confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const departmentsArray = [
    "Technical Services",
    "Finance",
    "Corporate",
    "ICT",
    "Internal Audit",
    "Human Resources",
  ];

  //Navigation to login page after registration
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState("");

  const register = (e) => {
    e.preventDefault();

    //Registering the employee

    console.log("Employee");
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/employee-signup",
      data: employee,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/Login");
        }
        // console.log(response.status)
        console.log(response.status);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setRegistrationError("This user already exists");
        }
        console.log(error);
      });
  };

  //Regex Testing for all input fields
  //Email
  let emailError = "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(employee.email) === false) {
    emailError = "Please enter a valid email address";
  } else {
    emailError = "Email is valid";
  }
  if (!employee.email) {
    emailError = "";
  }

  //FirstName
  let nameError = "";
  const nameRegex = /^[a-z]+$/i;
  if (nameRegex.test(employee.firstName) === true || !employee.firstName) {
    nameError = "";
  } else {
    nameError = "Numbers or special characters not allowed";
  }

  //lastName
  let lastNameError = "";
  if (nameRegex.test(employee.lastName) === true || !employee.lastName) {
    lastNameError = "";
  } else {
    lastNameError = "Numbers or special characters not allowed";
  }

  //Phone Number
  let phoneNumberError = "";
  const phoneRegex = /^\d+$/;
  if (phoneRegex.test(employee.phoneNumber) === false) {
    phoneNumberError = "Only enter numerical digits";
  } else {
    phoneNumberError = "";
  }
  if (!employee.phoneNumber) {
    phoneNumberError = "";
  }

  //Password Error
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let passwordRegexError = "";
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  if (passwordRegex.test(employee.password) === true || !employee.password) {
    passwordRegexError = "strong password";
  } else {
    passwordRegexError = "weak password";
  }
  if(!employee.password){
    passwordRegexError = ""
  }

  //Error if passwords do not match
  let passwordError = "";
  if (employee.password !== confirmPassword) {
    passwordError = "Passwords do not match";
  } else if (!confirmPassword) {
    passwordError = "";
  } else if (employee.password === confirmPassword) {
    passwordError = "";
  }

  return (
    <div className="registration">
      <div className="registrationIllustration">
        <Logo />
        <div className="regIllu">
          <img src={illustration} alt="sign up illustration" />
        </div>
      </div>
      {/* Registration Form */}
      <div className="registrationForm">
        <h3>Employee Registration</h3>
        <form>
          <TextField
            className="registerfield"
            label="First Name"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            helperText={nameError}
            FormHelperTextProps={{ style: { color: "red" } }}
            inputProps={{ minLength: 2, maxLength: 20 }}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            className="registerfield"
            label="Last Name"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            helperText={lastNameError}
            FormHelperTextProps={{ style: { color: "red" } }}
            inputProps={{ minLength: 2, maxLength: 20 }}
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            helperText={emailError}
            FormHelperTextProps={
              regex.test(employee.email) === false
                ? { style: { color: "red" } }
                : { style: { color: "green" } }
            }
            margin="normal"
            required
          />
          <FormControl className="registerfield">
            <InputLabel>Select your department</InputLabel>
            <Select
              className="requestField"
              label="department"
              name="department"
              value={employee.department}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            >
              <MenuItem value={departmentsArray[0]}>
                Technical Services
              </MenuItem>
              <MenuItem value={departmentsArray[1]}>Finance</MenuItem>
              <MenuItem value={departmentsArray[2]}>Corporate</MenuItem>
              <MenuItem value={departmentsArray[3]}>ICT</MenuItem>
              <MenuItem value={departmentsArray[4]}>Internal Audit</MenuItem>
              <MenuItem value={departmentsArray[5]}>Human Resources</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="registerfield"
            label="Phone Number"
            name="phoneNumber"
            value={employee.phoneNumber}
            onChange={handleChange}
            helperText={phoneNumberError}
            FormHelperTextProps={{ style: { color: "red" } }}
            inputProps={{ maxLength: 13 }}
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
            label="Password"
            name="password"
            value={employee.password}
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
            helperText={passwordRegexError}
            FormHelperTextProps={
              passwordRegex.test(employee.password) === false
                ? { style: { color: "red" } }
                : { style: { color: "green" } }
            }
            type={showPassword ? "text" : "password"}
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={passwordError}
            FormHelperTextProps={
              employee.password !== confirmPassword
                ? { style: { color: "red" } }
                : { style: { color: "green" } }
            }
            type={showPassword ? "text" : "password"}
            margin="normal"
            required
          />
          <input
            type="submit"
            value="Register"
            className="registrationBtn"
            disabled={
              !employee.firstName ||
              !employee.lastName ||
              !employee.email ||
              !employee.phoneNumber ||
              !employee.password ||
              nameRegex.test(employee.firstName) === false ||
              nameRegex.test(employee.lastName) === false ||
              regex.test(employee.email) === false ||
              phoneRegex.test(employee.phoneNumber) === false ||
              passwordRegex.test(employee.password) === false ||
              employee.password !== confirmPassword
            }
            onClick={register}
          />
          <label className="regError">{registrationError}</label>
          <div className="haveAnAccount">
            <p>Have an account?</p>
            <Link path to="/Login" className="accountLink">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
