import React, { useState } from "react";
import Logo from "../Components/Logo";
import illustration from "../Images/signup.svg";
import { FaUserTie } from "react-icons/fa";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
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
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    phoneNumber: "",
    password: "",
  });

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

  const departmentsArray = [
    "Technical Services",
    "Finance",
    "Corporate",
    "ICT",
    "Internal Audit",
    "Human Resources",
  ];

  //displaying department select tag
  const selectDepartment = () =>{
    if(activeAvatar === avatarArray[0].id){
      return(
        <>
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
                    <MenuItem value={departmentsArray[4]}>
                      Internal Audit
                    </MenuItem>
                    <MenuItem value={departmentsArray[5]}>
                      Human Resources
                    </MenuItem>
                  </Select>
                </FormControl>
        </>
      )
    }
  }

  //Navigation to login page after registration
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState("");

  const register = (e) => {
    e.preventDefault();

    //Registering the employee
    if (activeAvatar === avatarArray[0].id) {
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

      //Registering the accountant
    } else if (activeAvatar === avatarArray[1].id) {
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
    } else if (activeAvatar === avatarArray[2].id) {
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
    console.log(confirmPassword.length);
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

  //Password Error
  let passwordError = "";
  if (
    employee.password !== confirmPassword ||
    accountant.password !== confirmPassword ||
    financeManager.password !== confirmPassword
  ) {
    passwordError = "Passwords do not match";
  } else if (!confirmPassword) {
    passwordError = "";
  } else if (
    employee.password === confirmPassword ||
    accountant.password === confirmPassword ||
    financeManager.password === confirmPassword
  ) {
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
        <h3>Please Select Your Position Before Registration</h3>

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
        <form>
          <TextField
            className="registerfield"
            label="First Name"
            name="firstName"
            value={
              activeAvatar === avatarArray[0].id
                ? employee.firstName
                : activeAvatar === avatarArray[1].id
                ? accountant.firstName
                : financeManager.firstName
            }
            onChange={handleChange}
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
                ? employee.lastName
                : activeAvatar === avatarArray[1].id
                ? accountant.lastName
                : financeManager.lastName
            }
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
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
            required
          />
          {selectDepartment()}
          <TextField
            className="registerfield"
            label="Phone Number"
            name="phoneNumber"
            value={
              activeAvatar === avatarArray[0].id
                ? employee.phoneNumber
                : activeAvatar === avatarArray[1].id
                ? accountant.phoneNumber
                : financeManager.phoneNumber
            }
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
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
            type="password"
            margin="normal"
            required
          />
          <TextField
            className="registerfield"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={passwordError}
            FormHelperTextProps={
              employee.password !== confirmPassword ||
              accountant.password !== confirmPassword ||
              financeManager.password !== confirmPassword
                ? { style: { color: "red" } }
                : { style: { color: "green" } }
            }
            type="password"
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
              regex.test(employee.email) === false ||
              regex.test(accountant.email) === false ||
              regex.test(financeManager.email) === false ||
              employee.password !== confirmPassword ||
              accountant.password !== confirmPassword ||
              financeManager.password !== confirmPassword
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
