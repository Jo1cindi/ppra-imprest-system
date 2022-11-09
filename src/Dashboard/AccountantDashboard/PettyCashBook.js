import React, {useState} from 'react'
import "../DashboardStyles.css";
import AccountantSidebar from "../../Components/AccountantSidebar";
import { IoAdd,IoCloseSharp } from 'react-icons/io5';
import { TextField } from "@mui/material";



const PettyCashBook = () => {

  const [initialAmountWindow, setInitialAmountWindow] = useState(false)
  const [amount, setAmount] = useState()

  let inputError = ""
  const regex = /^\d+$/
  if(regex.test(amount)=== false){
    inputError = "Only enter numerical digits"
  }else{
    inputError= ""
  } 
  if(!amount){
    inputError = ""
  }

  return (
    <>
      {
         initialAmountWindow && (
          <div className='initialAmountWindow'>
          <IoCloseSharp
                className="closeReceiptCard"
                onClick={() => setInitialAmountWindow(false)}
              />
           <div className='initialAmountCard'>
            <h4>Set Intial Petty Cash Amount for the Month</h4>
            <div className='amountInput'>
              <TextField
                variant='outlined'
                className='amountInputField'
                label="Enter amount"
                type= "tel"
                value={amount}
                onChange={(e)=> setAmount(e.target.value)}
                helperText={inputError}
                FormHelperTextProps={
                regex.test(amount) === false
                  ? { style: { color: "red" } }
                  : { style: { color: "green" } }
              }
              />
            </div>
            <input type="submit" value = "Set Amount" className='setAmountBtn'/>
           </div>
          </div>
         )
      } 
      <AccountantSidebar/>
      <div className="pettyCash">
       <h3>Petty Cash Records</h3>
       <div className="setInitialAmount" onClick={()=> {setInitialAmountWindow(true)}}>
        <IoAdd className='addIcon'/>
        <p>Set initial amount</p>
       </div>
      </div>
    </>
  )
}

export default PettyCashBook