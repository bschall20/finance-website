import React, { useState } from "react";
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

  let expense = props.expense;
  let MortgageRentArr = [];
  let UtilitiesArr = [];
  let InsuranceArr = [];
  let LoansArr = [];
  let TransportationArr = [];
  let FoodArr = [];
  let OtherArr = [];
  const dropdownSubmit = (eventKey) => {
    if (eventKey === "Week") {
      setCategories(["01 - 07", "08 - 15", "16 - 23", "24 - 31"]);
      MortgageRentArr = [0, 0, 0, 0];
      UtilitiesArr = [0, 0, 0, 0];
      InsuranceArr = [0, 0, 0, 0];
      LoansArr = [0, 0, 0, 0];
      TransportationArr = [0, 0, 0, 0];
      FoodArr = [0, 0, 0, 0];
      OtherArr = [0, 0, 0, 0];
      expense.map((dataObj) => {
        // Check day numbers for Mortgage/Rent to push into bar chart.
        if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <=
            7 &&
          dataObj.expense_type === "Mortgage/Rent"
        ) {
          return (MortgageRentArr[0] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <=
            15 &&
          dataObj.expense_type === "Mortgage/Rent"
        ) {
          return (MortgageRentArr[1] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <=
            23 &&
          dataObj.expense_type === "Mortgage/Rent"
        ) {
          return (MortgageRentArr[2] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 24 && dataObj.date.slice(-2)) <=
            31 &&
          dataObj.expense_type === "Mortgage/Rent"
        ) {
          return (MortgageRentArr[3] += dataObj.amount);
        }

        // Check day numbers for Utilities to push into bar chart.
        else if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <=
            7 &&
          dataObj.expense_type === "Utilities"
        ) {
          return (UtilitiesArr[0] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <=
            15 &&
          dataObj.expense_type === "Utilities"
        ) {
          return (UtilitiesArr[1] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <=
            23 &&
          dataObj.expense_type === "Utilities"
        ) {
          return (UtilitiesArr[2] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 24 && dataObj.date.slice(-2)) <=
            31 &&
          dataObj.expense_type === "Utilities"
        ) {
          return (UtilitiesArr[3] += dataObj.amount);
        }

        // Check day numbers for Insurance to push into bar chart.
        else if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <=
            7 &&
          dataObj.expense_type === "Insurance"
        ) {
          return (InsuranceArr[0] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <=
            15 &&
          dataObj.expense_type === "Insurance"
        ) {
          return (InsuranceArr[1] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <=
            23 &&
          dataObj.expense_type === "Insurance"
        ) {
          return (InsuranceArr[2] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 24 && dataObj.date.slice(-2)) <=
            31 &&
          dataObj.expense_type === "Insurance"
        ) {
          return (InsuranceArr[3] += dataObj.amount);
        }

        // Check day numbers for Loans to push into bar chart.
        else if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <=
            7 &&
          dataObj.expense_type === "Loans"
        ) {
          return (LoansArr[0] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <=
            15 &&
          dataObj.expense_type === "Loans"
        ) {
          return (LoansArr[1] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <=
            23 &&
          dataObj.expense_type === "Loans"
        ) {
          return (LoansArr[2] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 24 && dataObj.date.slice(-2)) <=
            31 &&
          dataObj.expense_type === "Loans"
        ) {
          return (LoansArr[3] += dataObj.amount);
        }

        // Check day numbers for Transportation to push into bar chart.
        else if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <=
            7 &&
          dataObj.expense_type === "Transportation"
        ) {
          return (TransportationArr[0] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <=
            15 &&
          dataObj.expense_type === "Transportation"
        ) {
          return (TransportationArr[1] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <=
            23 &&
          dataObj.expense_type === "Transportation"
        ) {
          return (TransportationArr[2] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 24 && dataObj.date.slice(-2)) <=
            31 &&
          dataObj.expense_type === "Transportation"
        ) {
          return (TransportationArr[3] += dataObj.amount);
        }

        // Check day numbers for Food to push into bar chart.
        else if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <=
            7 &&
          dataObj.expense_type === "Food"
        ) {
          return (FoodArr[0] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <=
            15 &&
          dataObj.expense_type === "Food"
        ) {
          return (FoodArr[1] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <=
            23 &&
          dataObj.expense_type === "Food"
        ) {
          return (FoodArr[2] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 24 && dataObj.date.slice(-2)) <=
            31 &&
          dataObj.expense_type === "Food"
        ) {
          return (FoodArr[3] += dataObj.amount);
        }

        // Check day numbers for Other to push into bar chart.
        else if (
          parseInt(dataObj.date.slice(-2) >= 1 && dataObj.date.slice(-2)) <=
            7 &&
          dataObj.expense_type === "Other"
        ) {
          return (OtherArr[0] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 8 && dataObj.date.slice(-2)) <=
            15 &&
          dataObj.expense_type === "Other"
        ) {
          return (OtherArr[1] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 16 && dataObj.date.slice(-2)) <=
            23 &&
          dataObj.expense_type === "Other"
        ) {
          return (OtherArr[2] += dataObj.amount);
        } else if (
          parseInt(dataObj.date.slice(-2) >= 24 && dataObj.date.slice(-2)) <=
            31 &&
          dataObj.expense_type === "Other"
        ) {
          return (OtherArr[3] += dataObj.amount);
        }
        return 0;
      });
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
    } else if (eventKey === "Month") {
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
    } else {
      setCategories([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
    }
    setDropdownTime(eventKey);
  };

  // expense.map((dataObj) => {
  //   if (dataObj.expense_type === "Mortgage/Rent") {
  //     return MortgageRentArr.push(dataObj.amount);
  //   } else if (dataObj.expense_type === "Utilities") {
  //     return UtilitiesArr.push(dataObj.amount);
  //   } else if (dataObj.expense_type === "Insurance") {
  //     return InsuranceArr.push(dataObj.amount);
  //   } else if (dataObj.expense_type === "Loans") {
  //     return LoansArr.push(dataObj.amount);
  //   } else if (dataObj.expense_type === "Transportation") {
  //     return TransportationArr.push(dataObj.amount);
  //   } else if (dataObj.expense_type === "Food") {
  //     return FoodArr.push(dataObj.amount);
  //   } else if (dataObj.expense_type === "Other") {
  //     return OtherArr.push(dataObj.amount);
  //   }
  //   return 0;
  // });

  // function formatDate(date) {
  //   var dd = date.getDate();
  //   var mm = date.getMonth() + 1;
  //   var yyyy = date.getFullYear();
  //   if (dd < 10) {
  //     dd = "0" + dd;
  //   }
  //   if (mm < 10) {
  //     mm = "0" + mm;
  //   }
  //   return yyyy + "-" + mm + "-" + dd;
  // }

  // function Last7Days() {
  //   var result = [];
  //   for (var i = 0; i < 7; i++) {
  //     var d = new Date();
  //     d.setDate(d.getDate() - i);
  //     result.push(formatDate(d));
  //   }
  //   return result.join(",");
  // }

  let state = {
    // series: [
    //     // {
    //     //   name: "Marine Sprite",
    //     //   data: [44, 55, 41, 37, 22, 43, 21],
    //     // },
    //     // {
    //     //   name: "Striking Calf",
    //     //   data: [53, 32, 33, 52, 13, 43, 32],
    //     // },
    //     // {
    //     //   name: "Tank Picture",
    //     //   data: [12, 17, 11, 9, 15, 11, 20],
    //     // },
    //     // {
    //     //   name: "Bucket Slope",
    //     //   data: [9, 7, 5, 8, 6, 9, 4],
    //     // },
    //     // {
    //     //   name: "Reborn Kid",
    //     //   data: [25, 12, 19, 32, 25, 24, 10],
    //     // },
    //     {
    //         name: "Mortgage/Rent",
    //         data: MortgageRentArr,
    //       },
    //       {
    //         name: "Utilities",
    //         data: UtilitiesArr,
    //       },
    //       {
    //         name: "Insurance",
    //         data: InsuranceArr,
    //       },
    //       {
    //         name: "Loans",
    //         data: LoansArr,
    //       },
    //       {
    //         name: "Transportation",
    //         data: TransportationArr,
    //       },
    //       {
    //         name: "Food",
    //         data: FoodArr,
    //       },
    //       {
    //         name: "Other",
    //         data: OtherArr,
    //       },
    //   ],
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

  return (
    <div id="chart">
      {/* {console.log(dropdownTime)} */}
      <Dropdown onSelect={dropdownSubmit}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
