import React, {useState} from 'react'
import AdminSidebar from "../../Components/AdminSidebar"
import "../DashboardStyles.css";
import { FaUserTie } from "react-icons/fa";
import {
  TextField,
  InputAdornment, 
  IconButton
} from "@mui/material";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {

  //Avatars
  const avatarArray = [
    {
      id: 1,
      avatar: <FaUserTie />,
      name: "Accountant",
    },
    {
      id: 2,
      avatar: <FaUserTie />,
      name: "Finance Manager",
    },
  ];

  //Highlight avatars when clicked when clicked
  const [activeAvatar, setActiveAvatar] = useState(avatarArray[0].id);

  //Accountant
  const [accountant, setAccountant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  //Finance Manager
  const [financeManager, setFinancManager] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  //Confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setAccountant({
      ...accountant,
      [e.target.name]: e.target.value,
    });
    setFinancManager({
      ...financeManager,
      [e.target.name]: e.target.value,
    });
  }

  //Regex Testing for all input fields

  //Email
  let emailError = "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    regex.test(accountant.email) === false ||
    regex.test(financeManager.email) === false
  ) {
    emailError = "Please enter a valid email address";
  } else {
    emailError = "Email is valid";
  }
  if (!accountant.email || !financeManager.email) {
    emailError = "";
  }

  //FirstName
  let nameError = "";
  const nameRegex = /^[a-z]+$/i
  if(nameRegex.test(accountant.lastName) === true || nameRegex.test(financeManager.lastName) === true|| !financeManager.lastName || accountant.lastName){
    nameError=""
  }else{
    nameError = "Numbers or special characters not allowed"
  }
  
  //lastName
  let lastNameError =""
  if(nameRegex.test(accountant.lastName) === true || nameRegex.test(financeManager.lastName) === true|| !financeManager.lastName || accountant.lastName){
    lastNameError = ""
  }else{
    lastNameError ="Numbers or special characters not allowed"
  }
  
  //Phone Number
  let phoneNumberError = "";
  const phoneRegex = /^\d+$/;
  if (phoneRegex.test(accountant.phoneNumber) === false || financeManager.phoneNumber === false) {
    phoneNumberError = "Only enter numerical digits";
  } else {
    phoneNumberError = "";
  }
  if (!accountant.phoneNumber || !financeManager.phoneNumber) {
    phoneNumberError = "";
  }

  //Password Error
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let passwordRegexError = ""
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/
  if(passwordRegex.test(accountant.password) === true || !accountant.password || passwordRegex.test(financeManager.password) === true || !financeManager.password){
    passwordRegexError = "strong password"
  }else{
    passwordRegexError = "weak password"
  }

  //Error if passwords do not match
  let passwordError = "";
  if (
    accountant.password !== confirmPassword ||
    financeManager.password !== confirmPassword
  ) {
    passwordError = "Passwords do not match";
  } else if (!confirmPassword) {
    passwordError = "";
  } else if (
    accountant.password === confirmPassword ||
    financeManager.password === confirmPassword
  ) {
    passwordError = "";
  }

  //Navigation to login page after registration
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState("");

  const register = (e) => {
    e.preventDefault();


    //Accountant
     if (activeAvatar === avatarArray[0].id) {
      console.log("Accountant");
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/accountant-signup",
        data: accountant,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          navigate("/Login");
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setRegistrationError("This user already exists");
          }
          console.log(error);
        });

      //Registering the finance manager
    } else if (activeAvatar === avatarArray[1].id) {
      console.log("Finance Manager");
      axios({
        method: "post",
        url: "https://ppra-api.herokuapp.com/api/financemanager-signup",
        data: financeManager,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          navigate("/Login");
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setRegistrationError("This user already exists");
          }
          console.log(error);
        });
    }
  }

  return (
    <>
      <div>
       <AdminSidebar/>
      <div className="adminDashboard">
         <h3>Add a New User</h3>
        <div className="adminAvatars">
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
        <div className="UserRegistrationForm">
          <form>
          <TextField
            className="registerfield"
            label="First Name"
            name="firstName"
            value={
              activeAvatar === avatarArray[0].id
                ? accountant.firstName
                : financeManager.firstName
            }
            onChange={handleChange}
            helperText={nameError}
            FormHelperTextProps={{style: {color: "red"}}}
            inputProps={{minLength: 2, maxLength: 20}}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            className="registerfield"
            label="Last Name"
            name="lastName"
            value={
              activeAvatar === avatarArray[0].id
                ? accountant.lastName
                : financeManager.lastName
            }
            onChange={handleChange}
            helperText={lastNameError}
            FormHelperTextProps={{style: {color: "red"}}}
            inputProps={{minLength: 2, maxLength: 20}}
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
            label="Email"
            name="email"
            value={
              activeAvatar === avatarArray[0].id
                ? accountant.email
                : financeManager.email
            }
            onChange={handleChange}
            helperText={emailError}
            FormHelperTextProps={
              regex.test(accountant.email) === false ||
              regex.test(financeManager.email) === false
                ? { style: { color: "red" } }
                : { style: { color: "green" } }
            }
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
            label="Phone Number"
            name="phoneNumber"
            value={
              activeAvatar === avatarArray[0].id
                ? accountant.phoneNumber
                : financeManager.phoneNumber
            }
            onChange={handleChange}
            helperText={phoneNumberError}
            FormHelperTextProps={{style: {color: "red"}}}
            inputProps={{maxLength: 13}}
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
            label="Password"
            name="password"
            value={
              activeAvatar === avatarArray[0].id
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
            helperText={passwordRegexError}
            FormHelperTextProps={
                passwordRegex.test(accountant.password) === false ||
                passwordRegex.test(financeManager.password) === false
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
              accountant.password !== confirmPassword ||
              financeManager.password !== confirmPassword
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
              !accountant.firstName ||
              !accountant.lastName ||
              !accountant.email ||
              !accountant.phoneNumber ||
              !accountant.password ||
              !financeManager.firstName ||
              !financeManager.lastName ||
              !financeManager.email ||
              !financeManager.phoneNumber ||
              !financeManager.password ||
              regex.test(accountant.email) === false ||
              regex.test(financeManager.email) === false ||
              accountant.password !== confirmPassword ||
              financeManager.password !== confirmPassword
            }
            onClick={register}
          />
          <label className="regError">{registrationError}</label>
        </form>
      </div>  
       </div>
      </div>
    </>
  )
}

export default AdminDashboard;