import React, {useState} from 'react'
import { FaUserTie } from "react-icons/fa";
import AdminSidebar from '../../Components/AdminSidebar';
import { TextField } from "@mui/material";

const RemoveUsers = () => {

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
    email: ""
  });

  //Accountant
  const [accountant, setAccountant] = useState({
    email: ""
  });

  //Finance Manager
  const [financeManager, setFinancManager] = useState({
    email: ""
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

  //Email
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

  return (
    <>
      <div>
        <AdminSidebar/>
        <div className='removeUsers'>
         <h3>Remove User</h3>
        <div className='removeAvatars'>
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
        <div className="removeUserForm">
           <TextField
              className="loginField"
              label="Enter User Email Address"
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
            <input
              type="submit"
              value="Remove User"
              className="loginButton"
              disabled={
                !employee.email ||
                !financeManager.email ||
                !accountant.email ||
                regex.test(employee.email) === false ||
                regex.test(accountant.email) === false ||
                regex.test(financeManager.email) === false
              }
            />
         </div>
        </div>
      </div>
    </>
  )
}

export default RemoveUsers