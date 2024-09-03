import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import DeleteGoalModal from "./DeleteGoalModal"
import GoalModal from "./GoalModal";

function GoalsTable(props) {
  const [modalData, setModalData] = useState({});
  const [modalNum, setModalNum] = useState(0);
  const [goal, setGoal] = useState([]);
  const [deleteGoalModalShow, setDeleteGoalModalShow] = useState(false);
  const [goalModalShow, setGoalModalShow] = useState(false);


  const getGoalData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/goal`);
      const goalJSON = await response.json();
      setGoal(
        goalJSON.sort(function (a, b) {
          // Default sort by DATE:
          var aa = a.goal_date.split("/").reverse().join(),
            bb = b.goal_date.split("/").reverse().join();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        })
      );
      // Only needed if I decide to allow goal table sorting later (no need to)
      // setGoalCopy(
      //   goalJSON.sort(function (a, b) {
      //     // Default sort by DATE:
      //     var aa = a.date.split("/").reverse().join(),
      //       bb = b.date.split("/").reverse().join();
      //     return bb < aa ? -1 : bb > aa ? 1 : 0;
      //   })
      // );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGoalData();
  }, []);




  // Days Between Goal Dates
  function daysLeft(goal_date, bool, start_date, amount) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var today = `${year}/${month}/${day}`;
    var todayDate = Date.parse(today);
    var goalDate = Date.parse(goal_date);
    var diff = new Date(goalDate - todayDate);
    var days = Math.ceil(diff / 1000 / 60 / 60 / 24);
    var daysString = days.toString();

    // Variables for returning goal amount to save/day
    var startDate = Date.parse(start_date);
    var amountDiff = new Date(goalDate - startDate);
    var amountDays = Math.ceil(amountDiff / 1000 / 60 / 60 / 24);
    var amountLeft = Math.round((amount / amountDays) * 100) / 100;

    if (todayDate === goalDate) {
    }
    // Avoid returning infinity if days left is 0
    if (amountDays === 0) {
      amountLeft = amount;
    }

    // Return days left on goal for delete goal modal
    if (bool === true) {
      return `${days}`;
    }
    // Using function to return amount to save per day from start date
    else if (bool === 2) {
      return amountLeft;
    }
    // Return negative days for being late
    else if (Array.from(daysString)[0] === "-") {
      return `${days} (late)`;
    }
  }






 return <Table striped bordered hover style={{ margin: "0rem auto 3.5rem" }}>
 <thead>
   <tr>
     <th>#</th>
     <th>Goal Title</th>
     <th>Goal Amount </th>
     <th>Goal Start</th>
     <th>Goal End</th>
     <th>Save per Day <span style={{fontSize: ".75rem"}}>(from Start)</span></th>
     <th>Days Left</th>
     <th></th>
     <th></th>
   </tr>
 </thead>
 <tbody>
   {goal.map((dataObj, index) => {
     // Need to go through this later to remove redundancy.
     let tableIndex;
     let tableTitle;
     let tableAmount;
     let tableStart;
     let tableDate;
     let tableSave;
     let tableLeft;
     // Return Overdue Goal
     if (daysLeft(dataObj.goal_date, true)[0] === "-") {
       tableIndex = (
         <td style={{ backgroundColor: "#D60027" }}>{index + 1}</td>
       );
       tableTitle = (
         <td style={{ backgroundColor: "#D60027" }}>{dataObj.title}</td>
       );
       tableAmount = (
         <td style={{ backgroundColor: "#D60027" }}>{dataObj.amount}</td>
       );
       tableStart = (
         <td style={{ backgroundColor: "#D60027" }}>
           {dataObj.start_date}
         </td>
       );
       tableDate = (
         <td style={{ backgroundColor: "#D60027" }}>
           {dataObj.goal_date}
         </td>
       );
       tableSave = (
         <td style={{ backgroundColor: "#D60027" }}>
           $
           {daysLeft(
             dataObj.goal_date,
             2,
             dataObj.start_date,
             dataObj.amount
           )}
         </td>
       );
       tableLeft = (
         <td style={{ backgroundColor: "#D60027" }}>
           {daysLeft(dataObj.goal_date, true)}
         </td>
       );
     }
     // Return Goal with Days Left
     else {
       tableIndex = <td>{index + 1}</td>;
       tableTitle = <td>{dataObj.title}</td>;
       tableAmount = <td>{dataObj.amount}</td>;
       tableStart = <td>{dataObj.start_date}</td>;
       tableDate = <td>{dataObj.goal_date}</td>;
       tableSave = (
         <td>
           $
           {daysLeft(
             dataObj.goal_date,
             2,
             dataObj.start_date,
             dataObj.amount
           )}
         </td>
       );
       tableLeft = <td>{daysLeft(dataObj.goal_date, true)}</td>;
     }

     return (
       <tr key={index}>
         {tableIndex}
         {tableTitle}
         {tableAmount}
         {tableStart}
         {tableDate}
         {tableSave}
         {tableLeft}
         {/* <td>{index + 1}</td>
         <td>{dataObj.title}</td>
         <td>{dataObj.amount}</td>
         <td>{dataObj.start_date}</td>
         <td>{dataObj.goal_date}</td>
         {daysLeft(dataObj.goal_date, false)} */}

         <td
           className="tableEdit"
           style={{ paddingLeft: "0px", paddingRight: "0px" }}
           onClick={() => {
             setGoalModalShow(true);
             setModalData(dataObj);
             setModalNum(index + 1);
           }}
         >
           edit
         </td>

         <td
           className="tableDelete"
           style={{ paddingLeft: "0px", paddingRight: "0px" }}
           onClick={() => {
             setDeleteGoalModalShow(true);
             setModalData(dataObj);
             setModalNum(index + 1);
           }}
         >
           X
         </td>
       </tr>
     );
   })}
   <GoalModal
     show={goalModalShow}
     showsubmit={0}
     onHide={() => setGoalModalShow(false)}
     id={modalData.id}
     num={modalNum}
     title={modalData.title}
     amount={modalData.amount}
     startdate={modalData.start_date}
     goaldate={modalData.goal_date}
     editgoal={1}
   />
   <DeleteGoalModal
     show={deleteGoalModalShow}
     onHide={() => setDeleteGoalModalShow(false)}
     id={modalData.id}
     num={modalNum}
     title={modalData.title}
     amount={modalData.amount}
     startdate={modalData.start_date}
     goaldate={modalData.goal_date}
     // daysleft={daysLeft(modalData.start_date, modalData.goal_date).toString()}
     daysleft={daysLeft(modalData.goal_date, true).toString()}
   />
 </tbody>
</Table>
}

export default GoalsTable;
