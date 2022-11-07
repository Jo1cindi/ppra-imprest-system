import React, { useEffect, useState } from "react";
import EmployeeSidebar from "../../Components/EmployeeSidebar";
import Animation from "../../Images/EmptyReqNot.json";
import Lottie from "react-lottie-player";
import axios from "axios";
import { InputAdornment, TextField } from "@mui/material";
import { BiSearchAlt2 } from "react-icons/bi";
import {FaReceipt} from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Logo from "../../Components/Logo";

const Receipts = () => {
  //Variables
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [notSearching, setNotSearching] = useState(true)
  const [receiptDetails, setReceiptDetails] = useState(false)
  const [employeeDetails, setEmployeeDetails] = useState([])
  const [requestId, setRequestId] = useState()
  const [receiptSummary, setReceiptSummary] = useState([])
  const [employeeId, setEmployeeId] = useState()

  console.log(employeeId)

  //Filtering while typing
  const handleChange = (e) =>{
    var lowerCase = e.target.value.toLowerCase();
    setSearchQuery(lowerCase)
  }


  //Loading receipts
  useEffect(() => {
    loadReceipts();
  }, []);
  const loadReceipts = () => {
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/load-receipts",
      data: { email: localStorage.getItem("email") },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        setReceipts([response.data[1]]);
        setEmployeeDetails(response.data[0])
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  // console.log("details",employeeDetails[0].firstName)
// //Loading receipt details
useEffect(()=>{
  if(receiptDetails){
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/get-receipt-details",
      data: {employeeId: employeeId, requestId: requestId},
      headers: { "Content-Type": "application/json" },
    }).then((response)=>{
      console.log(response)
      setReceiptSummary(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
}, [employeeId, requestId, receiptDetails])
console.log("receipt,", receiptSummary)
   
  ///Search Function
  const searchReceipt = () =>{
    const searchResult = receipts[0].filter((receipt)=>{
      if(!searchQuery){
        setNotSearching (true)
        return receipt
      }
      setNotSearching(false)
      return receipt.reason.toString().toLowerCase().includes(searchQuery.toString().toLowerCase()) ||  receipt.amount_requested.toString().match(searchQuery.toString())
    })

    setSearchResults(searchResult)
  }
 useEffect(()=>{
  if(searchQuery === " "){
    setNotSearching (true)
  }
 }, [searchQuery])

 
  
  const showReceipts = () => {
    if (loading) {
      return (
        <>
         {
           receiptDetails && (
             <div className="receiptDetails">
             <IoCloseSharp className="closeReceiptCard" onClick={()=> setReceiptDetails(false)}/>
              <div className="receiptCard">
                <div id="receiptCardContent">
                 <div className="receipCardtTitle">
                    <Logo/>
                  <h4>Petty Cash Receipt</h4>
                 </div>
                 <div className="employeeDetails">
                  <h5>Employee Details</h5>
                  <div className="allEmployeeDetails">
                    <p>Name:  {employeeDetails[0].firstName + ' ' + employeeDetails[0].lastName}</p>
                    <p>Email:  {localStorage.getItem("email")}</p>
                    <p>Department:  {employeeDetails[0].department}</p>
                    <p>Employee_id: {employeeDetails[0].employee_id}</p>
                  </div>
                 </div>
                </div>
              </div>
             </div>
           )
         }
          <div className="allReceipts">
          <h3>All Receipts</h3>
        <div className="receiptSearchBar">
            <TextField
              className="searchInput"
              placeholder="Search by amount or receipt title"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className="searchIcon"
                    position = 'start'
                    style={{ color: "rgba(0,0,0, 0.2)", fontSize: "30px" }}
                  >
                    <BiSearchAlt2 />
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
            <input className="searchBtn" type="submit" value="Search" onClick={searchReceipt}/>
          </div>
          <div className="receiptList">
            {
              notSearching === true || searchQuery === " " ? receipts[0].map((receipt, index)=>(
                <div className="receipt" key={index}>
                 <div className="receiptTitle">
                  <div className="receiptReason">
                  <FaReceipt className="recIcon"/>
                   <p>{receipt.reason}</p>
                  </div>
                  <div className="receiptAmount">
                  <p>Kes {receipt.amount_requested}</p>
                 </div>
                 </div>
                 <div className="receiptDetailsBtn">
                  <input type="submit" value="View Receipt Details" onClick = {()=> {
                    setReceiptDetails(true)
                    setRequestId(receipt.request_id)
                    setEmployeeId(employeeDetails[0].employee_id)
                  }
                  }/>
                 </div>
                </div>
              )): searchResults.map((receipt, index)=>(
                <div className="receipt" key={index}>
                 <div className="receiptTitle">
                  <div className="receiptReason">
                  <FaReceipt className="recIcon"/>
                   <p>{receipt.reason}</p>
                  </div>
                  <div className="receiptAmount">
                  <p>Kes {receipt.amount_requested}</p>
                 </div>
                 </div>
                 <div className="receiptDetailsBtn">
                  <input type="submit" value="View Receipt Details" onClick = {()=> setReceiptDetails(true)}/>
                 </div>
                </div>
              ))
            }
          </div>
        </div>
        </>
      );
    } else if (receipts.length === 0) {
      return (
        <div className="emptyReceiptsPage">
          <div className="recAnimation">
            <Lottie loop animationData={Animation} play />
          </div>
          <div className="emptyRecPageCard">
            <h4>You do not received any receipts yet.</h4>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="receipts">
      <EmployeeSidebar />
      <div className="receiptsContent">{showReceipts()}</div>
    </div>
  );
};

export default Receipts;
