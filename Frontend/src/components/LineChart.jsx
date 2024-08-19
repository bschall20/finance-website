// REFERENCE: https://apexcharts.com/docs/creating-first-javascript-chart/#
// Types of Budgets: https://localfirstbank.com/article/budgeting-101-personal-budget-categories/?fb_content_cat=fb-tsm
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Dropdown from "react-bootstrap/Dropdown";

function LineChart(props) {
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

  let expense = props.expense;
  let MortgageRentArr = [];
  let UtilitiesArr = [];
  let InsuranceArr = [];
  let LoansArr = [];
  let TransportationArr = [];
  let FoodArr = [];
  let OtherArr = [];
  expense.map((dataObj) => {
    if (dataObj.expense_type === "Mortgage/Rent") {
      return MortgageRentArr.push(dataObj.amount);
    } else if (dataObj.expense_type === "Utilities") {
      return UtilitiesArr.push(dataObj.amount);
    } else if (dataObj.expense_type === "Insurance") {
      return InsuranceArr.push(dataObj.amount);
    } else if (dataObj.expense_type === "Loans") {
      return LoansArr.push(dataObj.amount);
    } else if (dataObj.expense_type === "Transportation") {
      return TransportationArr.push(dataObj.amount);
    } else if (dataObj.expense_type === "Food") {
      return FoodArr.push(dataObj.amount);
    } else if (dataObj.expense_type === "Other") {
      return OtherArr.push(dataObj.amount);
    }
    return 0;
  });

//   console.log("Line chart arrays:");
//   console.log(MortgageRentArr);
//   console.log(UtilitiesArr);
//   console.log(InsuranceArr);
//   console.log(LoansArr);
//   console.log(TransportationArr);
//   console.log(FoodArr);
//   console.log(OtherArr);
//   console.log("-------------------------");

  function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  }

  function Last7Days() {
    var result = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(formatDate(d));
    }

    return result.join(",");
  }

  let state = {
    options: {
      // chart: {
      //     height: 350,
      //     type: 'line',
      //     zoom: {
      //       enabled: false
      //     },
      //     colors: ["#008FFB", "#00F0E6", "#00E396", "#FFB01A", "#D60027", "#F038CA", "#775DD0"]
      //   },
      chart: {
        height: height,
        width: width,
        type: "line",
        zoom: {
          enabled: false,
        },
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        // width: [5, 7, 5],
        curve: "straight",
        // dashArray: [0, 8, 5]
      },
      title: {
        text: "Expense Statistics",
        align: "left",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan",
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
    series: [
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
    ],
  };


const [dropdownTime, setDropdownTime] = useState("Week");
const dropdownSubmit = (eventKey) => {
    setDropdownTime(eventKey);
  }

  return (
    <div id="chart">
      <h2>Expense Line Chart</h2>
      {console.log(dropdownTime)}
      <Dropdown onSelect={dropdownSubmit}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        {dropdownTime || 'Select an option'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="Week">Last Week</Dropdown.Item>
          <Dropdown.Item eventKey="Month">Last Month</Dropdown.Item>
          <Dropdown.Item eventKey="Year">Last Year</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Chart
        options={state.options}
        series={state.series}
        // colors={state.colors}
        // legend={state.legend}
      />
    </div>
  );
}

export default LineChart;
