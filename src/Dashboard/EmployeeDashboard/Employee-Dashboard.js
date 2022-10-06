import React, { useState } from "react";
import "../DashboardStyles.css";
import EmployeeSidebar from "../../Components/EmployeeSidebar";
import Lottie from "react-lottie-player";
import Animation from "../../Images/Animation.json";
import { IoCloseSharp } from "react-icons/io5";
import DateTimePicker from "react-datetime-picker";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import axios from "axios";



const EmployeeDashboard = () => {
  //Opening and closing the form
  const [openRequestForm, setOpenRequestForm] = useState("");
  const toggleRequestForm = () => {
    setOpenRequestForm(!openRequestForm);
  };
  const closeForm = () => {
    setOpenRequestForm(false);
  };

  //Setting time value
  const [time, onChange] = useState(new Date());

  //Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    date: time,
    amount: "",
    reasonForRequest: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let emailError = "";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(formData.email) === false) {
    emailError = "Please enter a valid email address";
  } else {
    emailError = "Email is valid";
  }
  if (!formData.email) {
    emailError = "";
  }

  const departmentsArray = [
    "Technical Services",
    "Finance",
    "Corporate",
    "ICT",
    "Internal Audit",
    "Human Resources",
  ];
  
  //Sending request error
  const [requestError, setRequestError]= useState("");

  //Sent confirmation
  const [confirmation, setConfirmation] = useState("")

  //Send request Function
  const sendRequest = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/send-request",
      data: formData,
      headers: { "Content-Type": "application/json" }
    }).then((response)=>{
      if(response.status === 200){
        setConfirmation("Request sent succesfully!!")
      }
      console.log(response.status)
      console.log(response)
    }).catch((error)=>{
      if(error.response.status === 401){
        setRequestError("Please use the correct email address")
      }
      console.log(error)
    })
    console.log(formData);
  };

  return (
    <div className="employeeDashboard">
      <EmployeeSidebar />
      {openRequestForm && (
        <div className="requestForm">
          <IoCloseSharp className="closeFormBtn" onClick={closeForm} />
          <div className="requestFormFields">
            <h3>
              Please fill in the form below in order to send a funds request.
            </h3>
            <form>
              <div className="nameInput">
                <TextField
                  className="requestnameField"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  className="requestnameField"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="requestFieldInputs">
                <TextField
                  className="requestField"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  helperText={emailError}
                  FormHelperTextProps={
                    regex.test(formData.email) === false
                      ? { style: { color: "red" } }
                      : { style: { color: "green" } }
                  }
                  margin="normal"
                  variant="outlined"
                />
                <FormControl className="selectTag">
                  <InputLabel>Select your department</InputLabel>
                  <Select
                    className="requestField"
                    label="department"
                    name="department"
                    value={formData.department}
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
              </div>
              <div className="dateandAmount">
                <div className="dateInput">
                  <DateTimePicker
                    onChange={onChange}
                    value={time}
                    className="datePicker"
                    autoFocus={false}
                  />
                </div>
                <TextField
                  className="requestField"
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="textAreaandBtn">
                <TextField
                  className="textArea"
                  label="Reason for Request"
                  name="reasonForRequest"
                  value={formData.reasonForRequest}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={6}
                />
                <input
                  type="submit"
                  value="Send Request"
                  className="requestBtn"
                  onClick={sendRequest}
                  disabled={
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.department ||
                    !formData.date ||
                    !formData.amount ||
                    !formData.reasonForRequest ||
                    regex.test(formData.email === false)
                  }
                />
              </div>
              <p className="confirmation">{confirmation}</p>
              <p className="reqError">{requestError}</p>
            </form>
          </div>
        </div>
      )}
      <div className="DashboardElements">
        <div className="employeeDashboardContent">
          <div className="animation">
            <Lottie
              loop
              animationData={Animation}
              play
              className="animationLottie"
            />
          </div>
          <div className="requestCard">
            <p className="requestCardTitle">
              Request for funds by filling in the Imprest Requisition Form
            </p>
            <p>To fill in the form click the button below</p>
            <input type="submit" value="Request" onClick={toggleRequestForm}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
