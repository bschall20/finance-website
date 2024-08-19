// import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import React from "react";

// import ReactDOM from 'react-dom';
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

function HeatMap(props) {
  // return <div>
  //     <p>Heat Map goes here.</p>
  // </div>

  // let dateAmtArr = [];
  // const [dateAmtArr, setDateAmtArr] = useState([])
  // const [dateAmt, setDateAmt] = useState([])
  const dateAmountTotal = () => {
    let dateAmtArr = [];
    props.expense.map((expenseObj) => {
      dateAmtArr.push({
        date: expenseObj.date,
        amountSpent: expenseObj.amount,
      });
      return 0;
    });
    // console.log('dateAmtArr')
    // console.log(dateAmtArr)

    dateAmtArr = dateAmtArr.reduce((acc, next) => {
      // acc stands for accumulator
      const lastItemIndex = acc.length - 1;
      const accHasContent = acc.length >= 1;

      if (accHasContent && acc[lastItemIndex].date === next.date) {
        acc[lastItemIndex].amountSpent += next.amountSpent;
      } else {
        // first time seeing this entry. add it!
        acc[lastItemIndex + 1] = next;
      }
      return acc;
    }, []);

    return dateAmtArr
  }
  // dateAmountTotal();
  // console.log(dateAmountTotal());
  // console.log("after function call")
  // console.log(dateAmtArr)

  const today = new Date();
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  // function getRandomInt(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // const randomValues = getRange(365).map((index) => {
  //   return {
  //     date: shiftDate(today, -index),
  //     count: getRandomInt(1, 3), // call in expense data here and add all values of same day for day total
  //     // if expense.date === shiftDate(today, -index).toISOString().slice(0, 10), return expense.amount
  //     // else return 0?
  //   };
  // });


  const dataValues = getRange(365).map((index) => {

    let date = shiftDate(today, -index);
    let count;
    let dateIndex = dateAmountTotal().findIndex(value => value.date === date.toISOString().slice(0, 10));

    if (dateIndex !== -1){
      count = dateAmountTotal()[dateIndex].amountSpent
    } else {count = 0}

    return {
      date: date,
      count: count
    };
  });



  return (
    <div>
      <h2>Daily Expenses</h2>
      {/* <h1>react-calendar-heatmap demos</h1>
      <p>Random values with onClick and react-tooltip</p> */}
      <CalendarHeatmap
        startDate={shiftDate(today, -365)}
        endDate={today}
        values={dataValues}
        classForValue={(value) => {
          // if (!value) {
          //   return "color-empty";
          // }

          // console.log(value)
          // value = parseInt(value)

          // Set colors in table. Could do multiple shades to show 20% spend up to 200%. (25, 50, 75, 100, 125, 150, 175, 200)
          if (value.count === 0) {
            return "color-github-0";
          }
          else if (value.count <= props.dailyAllowance){
            return `color-github-1`;
          }
          else if (value.count > props.dailyAllowance){
            return `color-github-2`;
          }
          // return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": `${value.date.toISOString().slice(0, 10)} has count: ${
            // "data-tip": `${value.date} has count: ${
              value.count
            }`,
          };
        }}
        showWeekdayLabels={true}
        onClick={(value) =>
          alert(`You spent $${value.count} on ${value.date}.`)
        }
      />
      <ReactTooltip />
    </div>
  );
}

export default HeatMap;
