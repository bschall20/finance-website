import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

function HeatMap(props) {

  // Get total amount spent on a date in Expense
  const dateAmountTotal = () => {
    let dateAmtArr = [];
    props.expense.map((expenseObj) => {
      dateAmtArr.push({
        date: expenseObj.date,
        amountSpent: expenseObj.amount,
      });
      return 0;
    });
    // Reduce duplicates with same date
    dateAmtArr = dateAmtArr.reduce((acc, next) => {
      // acc stands for accumulator
      const lastItemIndex = acc.length - 1;
      const accHasContent = acc.length >= 1;
      if (accHasContent && acc[lastItemIndex].date === next.date) {
        acc[lastItemIndex].amountSpent += next.amountSpent;
      } else {
        // first time seeing this entry, add it
        acc[lastItemIndex + 1] = next;
      }
      return acc;
    }, []);
    return dateAmtArr
  }

  // Used for mapping days from current day on heatmap (starts with today and maps backwards)
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  // Return array of X values (ie. 365 values for 365 days, or 1 year)
  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }


  // Get today's date and map values to their respective date. Adds total amount to date
  const today = new Date();
  const dataValues = getRange(365).map((index) => {
    let date = shiftDate(today, -index);
    let count; // Keeps track of amount spent on index (day)
    let dateIndex = dateAmountTotal().findIndex(value => value.date === date.toISOString().slice(0, 10));
    if (dateIndex !== -1){
      count = dateAmountTotal()[dateIndex].amountSpent
    } else {count = 0}

    return {
      date: date,
      count: count
    };
  });


  if (dataValues.count) {return (
    <div>
      {/* <h2>Daily Allowance (${props.dailyAllowance}) Chart</h2> */}
      <h2>Daily Allowance Chart (${props.dailyAllowance})</h2>
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
          if (value.count === 0 || value.count === null) {
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
  )}
  else return null;
}

export default HeatMap;
