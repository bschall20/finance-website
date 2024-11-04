import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import DeleteGoalModal from "./DeleteGoalModal";
import GoalModal from "./GoalModal";
import { useCookies } from "react-cookie";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function GoalsTable(props) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [modalData, setModalData] = useState({});
  const [modalNum, setModalNum] = useState(0);
  const [goal, setGoal] = useState([]);
  const [deleteGoalModalShow, setDeleteGoalModalShow] = useState(false);
  const [goalModalShow, setGoalModalShow] = useState(false);

  // const [currentGoals, setCurrentGoals] = useState(0);
  // let currentGoals = 0;
  // let overdueGoals = 0;
  // let completedGoals = 0;

  const getGoalData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goal/${cookies.Email}`);
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

  // Set Date from yyyy-mm-dd to mm-dd-yyyy
  const formatDate = (dataDate) => {
    var d = new Date(dataDate);
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString();
  };

  const createTable = (typeOfGoal) => {
    let count = 0;
    return (
      <Table
        striped
        bordered
        hover
        style={{ margin: "0rem auto 3.5rem", width: "80%" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Goal Title</th>
            <th>Goal Amount </th>
            <th>Goal Start</th>
            <th>Goal End</th>
            <th>
              Save per Day{" "}
              <span style={{ fontSize: ".75rem" }}>(from Start)</span>
            </th>
            <th>Days Left</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {goal.map((dataObj, index) => {
            // Return Overdue Goals Table
            if (
              typeOfGoal === "overdueGoals" &&
              daysLeft(dataObj.goal_date, true)[0] === "-" &&
              dataObj.completed !== "on"
            ) {
              count++;
              return (
                <tr key={index}>
                  <td>{count}</td>
                  <td>{dataObj.title}</td>
                  <td>{dataObj.amount}</td>
                  <td>{formatDate(dataObj.start_date)}</td>
                  <td>{formatDate(dataObj.goal_date)}</td>
                  <td>
                    $
                    {daysLeft(
                      dataObj.goal_date,
                      2,
                      dataObj.start_date,
                      dataObj.amount
                    )}
                  </td>
                  <td>{daysLeft(dataObj.goal_date, true)}</td>

                  <td
                    className="tableEdit"
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    onClick={() => {
                      setGoalModalShow(true);
                      setModalData(dataObj);
                      setModalNum(count);
                    }}
                  >
                    <MdEdit />
                  </td>

                  <td
                    className="tableDelete"
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    onClick={() => {
                      setDeleteGoalModalShow(true);
                      setModalData(dataObj);
                      setModalNum(count);
                    }}
                  >
                    <MdDelete />
                  </td>
                </tr>
              );
            }
            // Return Current Goals Table
            else if (
              typeOfGoal === "currentGoals" &&
              daysLeft(dataObj.goal_date, true)[0] !== "-" &&
              dataObj.completed !== "on"
            ) {
              count++;
              return (
                <tr key={index}>
                  <td>{count}</td>
                  <td>{dataObj.title}</td>
                  <td>{dataObj.amount}</td>
                  <td>{formatDate(dataObj.start_date)}</td>
                  <td>{formatDate(dataObj.goal_date)}</td>
                  <td>
                    $
                    {daysLeft(
                      dataObj.goal_date,
                      2,
                      dataObj.start_date,
                      dataObj.amount
                    )}
                  </td>
                  <td>{daysLeft(dataObj.goal_date, true)}</td>

                  <td
                    className="tableEdit"
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    onClick={() => {
                      setGoalModalShow(true);
                      setModalData(dataObj);
                      setModalNum(count);
                    }}
                  >
                    <MdEdit />
                  </td>

                  <td
                    className="tableDelete"
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    onClick={() => {
                      setDeleteGoalModalShow(true);
                      setModalData(dataObj);
                      setModalNum(count);
                    }}
                  >
                    <MdDelete />
                  </td>
                </tr>
              );
            }

            // Return Completed Goals Table
            else if (
              typeOfGoal === "completedGoals" &&
              dataObj.completed === "on"
            ) {
              count++;
              return (
                <tr key={index}>
                  <td>{count}</td>
                  <td>{dataObj.title}</td>
                  <td>{dataObj.amount}</td>
                  <td>{formatDate(dataObj.start_date)}</td>
                  <td>{formatDate(dataObj.goal_date)}</td>
                  <td>
                    $
                    {daysLeft(
                      dataObj.goal_date,
                      2,
                      dataObj.start_date,
                      dataObj.amount
                    )}
                  </td>
                  <td>Completed</td>

                  <td
                    className="tableEdit"
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    onClick={() => {
                      setGoalModalShow(true);
                      setModalData(dataObj);
                      setModalNum(count);
                    }}
                  >
                    <MdEdit />
                  </td>

                  <td
                    className="tableDelete"
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    onClick={() => {
                      setDeleteGoalModalShow(true);
                      setModalData(dataObj);
                      setModalNum(count);
                    }}
                  >
                    <MdDelete />
                  </td>
                </tr>
              );
            }

            //   return (
            //     <tr key={index}>
            //       {tableIndex}
            //       {tableTitle}
            //       {tableAmount}
            //       {tableStart}
            //       {tableDate}
            //       {tableSave}
            //       {tableLeft}
            //       {/* <td>{index + 1}</td>
            //  <td>{dataObj.title}</td>
            //  <td>{dataObj.amount}</td>
            //  <td>{dataObj.start_date}</td>
            //  <td>{dataObj.goal_date}</td>
            //  {daysLeft(dataObj.goal_date, false)} */}

            //       <td
            //         className="tableEdit"
            //         style={{ paddingLeft: "0px", paddingRight: "0px" }}
            //         onClick={() => {
            //           setGoalModalShow(true);
            //           setModalData(dataObj);
            //           setModalNum(index + 1);
            //         }}
            //       >
            //         <MdEdit />
            //       </td>

            //       <td
            //         className="tableDelete"
            //         style={{ paddingLeft: "0px", paddingRight: "0px" }}
            //         onClick={() => {
            //           setDeleteGoalModalShow(true);
            //           setModalData(dataObj);
            //           setModalNum(index + 1);
            //         }}
            //       >
            //         <MdDelete />
            //       </td>
            //     </tr>
            //   );
            return null;
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
            completed={modalData.completed}
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
            completed={modalData.completed}
            // daysleft={daysLeft(modalData.start_date, modalData.goal_date).toString()}
            daysleft={daysLeft(modalData.goal_date, true).toString()}
          />
        </tbody>
      </Table>
    );
  };

  return (
    <Tabs style={{ width: "80%", margin: "auto", borderBottom: "none" }}>
      <Tab eventKey="currentGoals" title="Current Goals">
        {createTable("currentGoals")}
      </Tab>
      <Tab eventKey="overdueGoals" title="Overdue Goals">
        {createTable("overdueGoals")}
      </Tab>
      <Tab eventKey="completedGoals" title="Completed Goals">
        {createTable("completedGoals")}
      </Tab>
    </Tabs>
  );
}

export default GoalsTable;
