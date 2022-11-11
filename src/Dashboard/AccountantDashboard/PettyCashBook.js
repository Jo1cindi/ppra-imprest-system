import React, { useEffect, useState } from "react";
import "../DashboardStyles.css";
import AccountantSidebar from "../../Components/AccountantSidebar";
import { IoAdd, IoCloseSharp } from "react-icons/io5";
import logoImage from "../../Images/logoDark.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { TextField, Select, FormControl, MenuItem } from "@mui/material";
import axios from "axios";

const PettyCashBook = () => {
  const [initialAmountWindow, setInitialAmountWindow] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [amountSuccess, setAmountSuccess] = useState("");
  const [transactionData, setTransactionData] = useState({
    initialAmount: "",
    totalAmountAllocated: "",
    balance: "",
    totalInAYear: "",
  });
  const [fundAllocations, setFundAllocations] = useState([]);

  //Getting Date and year
  const date = new Date();
  const month = Number(date.getMonth() + 1);
  const year = Number(date.getFullYear());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getMonth()];
  const [monthValue, setMonthValue] = useState(monthName);
  const monthNumber = months.indexOf(monthValue) + 1;
  console.log("curr", monthNumber);

  //Input Regex Test
  let inputError = "";
  const regex = /^\d+$/;
  if (regex.test(amount) === false) {
    inputError = "Only enter numerical digits";
  } else {
    inputError = "";
  }
  if (!amount) {
    inputError = "";
  }

  //Set Amount
  const setInitialAmount = () => {
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/set-initial-amount",
      data: {
        initialAmount: amount,
        month: month,
        year: year,
        accountantId: localStorage.getItem("accountantId"),
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setAmountSuccess("Intial Amount Set Successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 409) {
          setAmountError("Initial amount for the month has already been set!");
        }
      });
  };

  //Loading tranasction data from db

  useEffect(() => {
    axios({
      method: "post",
      data: { month: month, year: year },
      url: "https://ppra-api.herokuapp.com/api/petty-cash-records",
      headers: { "Content-Type": "application/json" },
      params: {
        limit: 5,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTransactionData({
            initialAmount: response.data[0].initialAmount,
            totalAmountAllocated: response.data[0].totalAmountAllocated,
            balance: response.data[0].balance,
            totalInAYear: response.data[0].totalInAYear,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [month, year]);
  console.log("Data", transactionData.balance);

  //Const transaction data
  const transactions = [
    {
      id: 1,
      title: `Initial Amount Set In ${monthName}`,
      amount: transactionData.initialAmount,
    },
    {
      id: 2,
      title: `Total Spent in ${monthName}`,
      amount: transactionData.totalAmountAllocated,
    },
    {
      id: 3,
      title: `Total Balance in ${monthName}`,
      amount: transactionData.balance,
    },
    {
      id: 4,
      title: `Total Spent in ${year}`,
      amount: transactionData.totalInAYear,
    },
  ];

 

  //Filtering the petty cash book according to the month
  useEffect(() => {
    axios({
      method: "post",
      url: "https://ppra-api.herokuapp.com/api/load-fund-allocations",
      data: { month: monthNumber, year: year },
      headers: { "Content-Type": "application/json" },
      params: {
        limit: 5,
      },
    })
      .then((response) => {
        console.log(response);
        setFundAllocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [monthNumber, year]);

  //Filter Reports by month
  const filterReport = () => {
    if (fundAllocations.length > 0) {
      return (
        <>
          <div id="pettyCashBook" className="pettyCashBook">
            <h3>{monthName} Petty Cash Book</h3>
            <ul>
              <li className="initialAmountColumn">
                <div className="tableTitle">
                  <p>Initial Amount</p>
                </div>
                <p className="spacing">{""}</p>
                <p>{transactionData.initialAmount}</p>
              </li>
              <li className="yearColumn">
                <div className="tableTitle">
                  <p>Year</p>
                </div>
                <p className="spacing">{""}</p>
                <p>{year}</p>
              </li>
              <li className="monthColumn">
                <div className="tableTitle">
                  <p>Date</p>
                </div>
                <p className="spacing">{""}</p>
                <p className="monthRow">{monthName}</p>
                <p className="spacing">{""}</p>
                {fundAllocations.map((fundAllocated, index) => (
                  <p key={index}>{fundAllocated.date}</p>
                ))}
              </li>
              <li className="detailsColumn">
                <div className="tableTitle">
                  <p>Details</p>
                </div>
                <p className="spacing">{""}</p>
                <p>Bank Account</p>
                <p className="spacing">{""}</p>
                {fundAllocations.map((fundAllocated, index) => (
                  <p key={index}>{fundAllocated.reason}</p>
                ))}
                <p className="spacing">{""}</p>
                <p>Total</p>
                <p className="spacing">{""}</p>
                <p>Balance c/d</p>
              </li>
              <li className="totalColumn">
                <div className="tableTitle">
                  <p>Total Amount Paid</p>
                </div>
                <p className="spacing">{""}</p>
                <p className="spacing">{""}</p>
                <p className="spacing">{""}</p>
                {fundAllocations.map((fundAllocated, index) => (
                  <p key={index}>{fundAllocated.amount}</p>
                ))}
                <p className="spacing">{""}</p>
                <p>{transactionData.totalAmountAllocated}</p>
                <p className="spacing">{""}</p>
                <p>{transactionData.balance}</p>
              </li>
            </ul>
            <div className="trademark">
              <div className="line1"></div>
              <img src={logoImage} alt="logo" />
              <div className="line1"></div>
            </div>
          </div>
          <div className="downloadReport">
            <input
              type="submit"
              value="Download Monthly Report"
              onClick={() => {
                const input = document.getElementById("pettyCashBook");
                html2canvas(input, {
                  logging: true,
                  letterRendering: 1,
                  useCORS: true,
                }).then((canvas) => {
                  const imgWidth = 210;
                  const imgHeight = (canvas.height * imgWidth) / canvas.width;
                  const imgData = canvas.toDataURL("img/png");
                  const receiptPdf = new jsPDF("p", "mm", "a4");
                  receiptPdf.addImage(
                    imgData,
                    "PNG",
                    0,
                    0,
                    imgWidth,
                    imgHeight
                  );
                  receiptPdf.save("pettycashreport.pdf");
                });
              }}
            />
          </div>
        </>
      );
    } else if (fundAllocations.length === 0) {
      return <div>Empty</div>;
    }
  };

  return (
    <>
      {initialAmountWindow && (
        <div className="initialAmountWindow">
          <IoCloseSharp
            className="closeReceiptCard"
            onClick={() => setInitialAmountWindow(false)}
          />
          <div className="initialAmountCard">
            <h4>Set Intial Petty Cash Amount for the Month</h4>
            <div className="amountInput">
              <TextField
                variant="outlined"
                className="amountInputField"
                label="Enter amount"
                type="tel"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                helperText={inputError}
                FormHelperTextProps={
                  regex.test(amount) === false
                    ? { style: { color: "red" } }
                    : { style: { color: "green" } }
                }
              />
            </div>
            <input
              type="submit"
              value="Set Amount"
              className="setAmountBtn"
              onClick={setInitialAmount}
              disabled={!amount || regex.test(amount) === false}
            />
            <p className="amountError">{amountError}</p>
            <p className="amountSuccess">{amountSuccess}</p>
          </div>
        </div>
      )}
      <AccountantSidebar />
      <div className="pettyCash">
        <h3>Petty Cash Records</h3>
        <div
          className="setInitialAmount"
          onClick={() => {
            setInitialAmountWindow(true);
          }}
        >
          <IoAdd className="addIcon" />
          <p>Set initial amount</p>
        </div>
        <div className="transactions">
          {transactions.map((transaction) => (
            <div
              className={
                transaction.id === 1
                  ? "initialAmount"
                  : transaction.id === 2
                  ? "monthly"
                  : transaction.id === 3
                  ? "balance"
                  : "yearly"
              }
              key={transaction.id}
            >
              <p className="transactionTitle">{transaction.title}</p>
              <p className="transactionAmount">KES {transaction.amount}</p>
            </div>
          ))}
        </div>
        <div className="filterMonthly">
          <p>Filter By Month</p>
          <FormControl className="selectMonth">
            <Select
              className="months"
              value={monthValue}
              variant="outlined"
              onChange={(e) => setMonthValue(e.target.value)}
            >
              {months.map((monthName, index) => (
                <MenuItem value={monthName} key={index}>
                  {monthName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Petty cash report table */}
        {filterReport()}
      </div>
    </>
  );
};

export default PettyCashBook;
