import React, { useState, useEffect, useCallback } from "react";
// import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import Chart from "react-apexcharts";
import Dropdown from "react-bootstrap/Dropdown";

function BarChart(props) {
  let height = 600;
  let width = 1200;
  if (window.matchMedia("(max-width: 625px)").matches) {
    height = 450;
    width = 350;
  } else if (window.matchMedia("(max-width: 850px)").matches) {
    height = 500;
    width = 600;
  } else if (window.matchMedia("(max-width: 1300px)").matches) {
    height = 600;
    width = 800;
  } else if (window.matchMedia("(max-width: 1500px)").matches) {
    width = 1000;
  }

  const [categories, setCategories] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [dropdownTime, setDropdownTime] = useState("Day");
  const [series, setSeries] = useState([]);

  // Get Day name for day sorting
  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }


  // Placed in callback to aid in dependency error from useEffect
  const dropdownSubmit = useCallback((eventKey) => {
    let MortgageRentArr = [];
    let UtilitiesArr = [];
    let InsuranceArr = [];
    let LoansArr = [];
    let TransportationArr = [];
    let FoodArr = [];
    let OtherArr = [];
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // SET FOR QUARTERLY MONTHS (WEEK)
    if (eventKey === "Week") {
      setCategories(["01 - 07", "08 - 15", "16 - 23", "24 - 31"]);
      // Set arrays to hold 4 values. One per quarter of month.
      MortgageRentArr = [0, 0, 0, 0];
      UtilitiesArr = [0, 0, 0, 0];
      InsuranceArr = [0, 0, 0, 0];
      LoansArr = [0, 0, 0, 0];
      TransportationArr = [0, 0, 0, 0];
      FoodArr = [0, 0, 0, 0];
      OtherArr = [0, 0, 0, 0];
      props.expense.map((dataObj) => {
        let week;
        // Get array index to be placed into.
        if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <= 7
        ) {
          week = 0;
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <= 15
        ) {
          week = 1;
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <= 23
        ) {
          week = 2;
        } else {
          week = 3;
        }

        // Insert value into bar chart array based on expense type.
        if (dataObj.expense_type === "Mortgage/Rent") {
          return (MortgageRentArr[week] += dataObj.amount);
        } else if (dataObj.expense_type === "Utilities") {
          return (UtilitiesArr[week] += dataObj.amount);
        } else if (dataObj.expense_type === "Insurance") {
          return (InsuranceArr[week] += dataObj.amount);
        } else if (dataObj.expense_type === "Loans") {
          return (LoansArr[week] += dataObj.amount);
        } else if (dataObj.expense_type === "Transportation") {
          return (TransportationArr[week] += dataObj.amount);
        } else if (dataObj.expense_type === "Food") {
          return (FoodArr[week] += dataObj.amount);
        } else if (dataObj.expense_type === "Other") {
          return (OtherArr[week] += dataObj.amount);
        } else {
          return (OtherArr[week] += dataObj.amount);
        }
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // SET FOR MONTHS
    else if (eventKey === "Month") {
      setCategories([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
      // Set arrays to hold 12 values. One per month.
      MortgageRentArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      UtilitiesArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      InsuranceArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      LoansArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      TransportationArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      FoodArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      OtherArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      props.expense.map((dataObj) => {
        let month;
        // Get array index to be placed into.
        if (parseInt(dataObj.date.slice(5, 7)) === 1) {
          month = 0;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 2) {
          month = 1;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 3) {
          month = 2;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 4) {
          month = 3;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 5) {
          month = 4;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 6) {
          month = 5;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 7) {
          month = 6;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 8) {
          month = 7;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 9) {
          month = 8;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 10) {
          month = 9;
        } else if (parseInt(dataObj.date.slice(5, 7)) === 11) {
          month = 10;
        } else {
          month = 11;
        }

        // Insert value into bar chart array based on expense type.
        if (dataObj.expense_type === "Mortgage/Rent") {
          return (MortgageRentArr[month] += dataObj.amount);
        } else if (dataObj.expense_type === "Utilities") {
          return (UtilitiesArr[month] += dataObj.amount);
        } else if (dataObj.expense_type === "Insurance") {
          return (InsuranceArr[month] += dataObj.amount);
        } else if (dataObj.expense_type === "Loans") {
          return (LoansArr[month] += dataObj.amount);
        } else if (dataObj.expense_type === "Transportation") {
          return (TransportationArr[month] += dataObj.amount);
        } else if (dataObj.expense_type === "Food") {
          return (FoodArr[month] += dataObj.amount);
        } else {
          return (OtherArr[month] += dataObj.amount);
        }
        //  return 0;
      });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // SET FOR DAYS
    else {
      setCategories([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
      // Set arrays to hold 12 values. One per month.
      MortgageRentArr = [0, 0, 0, 0, 0, 0, 0];
      UtilitiesArr = [0, 0, 0, 0, 0, 0, 0];
      InsuranceArr = [0, 0, 0, 0, 0, 0, 0];
      LoansArr = [0, 0, 0, 0, 0, 0, 0];
      TransportationArr = [0, 0, 0, 0, 0, 0, 0];
      FoodArr = [0, 0, 0, 0, 0, 0, 0];
      OtherArr = [0, 0, 0, 0, 0, 0, 0];
      props.expense.map((dataObj) => {
        // Order day from yyyy-mm-dd to mm-dd-yyyy
        let dayReorder = `${dataObj.date.slice(5, 7)}-${dataObj.date.slice(
          8,
          10
        )}-${dataObj.date.slice(0, 4)}`;
        // Get day name
        let dayName = getDayName(dayReorder, "en-US");
        let day;
        // Get array index to be placed into.
        if (dayName === "Sunday") {
          day = 0;
        } else if (dayName === "Monday") {
          day = 1;
        } else if (dayName === "Tuesday") {
          day = 2;
        } else if (dayName === "Wednesday") {
          day = 3;
        } else if (dayName === "Thursday") {
          day = 4;
        } else if (dayName === "Friday") {
          day = 5;
        } else if (dayName === "Saturday") {
          day = 6;
        }

        // Insert value into bar chart array based on expense type.
        if (dataObj.expense_type === "Mortgage/Rent") {
          return (MortgageRentArr[day] += dataObj.amount);
        } else if (dataObj.expense_type === "Utilities") {
          return (UtilitiesArr[day] += dataObj.amount);
        } else if (dataObj.expense_type === "Insurance") {
          return (InsuranceArr[day] += dataObj.amount);
        } else if (dataObj.expense_type === "Loans") {
          return (LoansArr[day] += dataObj.amount);
        } else if (dataObj.expense_type === "Transportation") {
          return (TransportationArr[day] += dataObj.amount);
        } else if (dataObj.expense_type === "Food") {
          return (FoodArr[day] += dataObj.amount);
        } else {
          return (OtherArr[day] += dataObj.amount);
        }
      });
    }
    setDropdownTime(eventKey);
    setSeries([
      {
        name: "Mortgage/Rent",
        data: MortgageRentArr,
      },
      {
        name: "Utilities",
        data: UtilitiesArr,
      },
      {
        name: "Insurance",
        data: InsuranceArr,
      },
      {
        name: "Loans",
        data: LoansArr,
      },
      {
        name: "Transportation",
        data: TransportationArr,
      },
      {
        name: "Food",
        data: FoodArr,
      },
      {
        name: "Other",
        data: OtherArr,
      },
    ]);
  }, [props.expense]);
 

  let state = {
    series: series,
    options: {
      chart: {
        type: "bar",
        height: height,
        width: width,
        stacked: true,
      },
      colors: [
        "#008FFB",
        "#00F0E6",
        "#00E396",
        "#FFB01A",
        "#D60027",
        "#F038CA",
        "#775DD0",
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: `${dropdownTime} Expense Trends`,
      },
      xaxis: {
        categories: categories,
        labels: {
          formatter: function (val) {
            // return val + "K";
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            // return val + "K";
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  // Load props.expense or graph won't load first render here
  useEffect(() => {
    dropdownSubmit("Day")
  }, [dropdownSubmit, props.expense])

  return (
    <div id="chart">
      <Dropdown onSelect={dropdownSubmit}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{backgroundColor: "#1C2758"}}>
          {dropdownTime || "Select an option"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Day">Day</Dropdown.Item>
          <Dropdown.Item eventKey="Week">Week</Dropdown.Item>
          <Dropdown.Item eventKey="Month">Month</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={height}
      />
    </div>
  );
}

export default BarChart;
