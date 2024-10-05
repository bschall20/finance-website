// REFERENCE: https://apexcharts.com/docs/creating-first-javascript-chart/#
// Types of Budgets: https://localfirstbank.com/article/budgeting-101-personal-budget-categories/?fb_content_cat=fb-tsm
// import React from "react";
import React, { useState, useEffect, useCallback } from "react";
import Chart from "react-apexcharts";

function PieChart(props) {
  // let height = 600;
  // let width = 500;
  const [series, setSeries] = useState([]);

  // if (window.matchMedia("(max-width: 625px)").matches) {
  //   height = 450;
  //   width = 350;
  // } else if (window.matchMedia("(max-width: 850px)").matches) {
  //   height = 500;
  //   width = 600;
  // } else if (window.matchMedia("(max-width: 1300px)").matches) {
  //   height = 600;
  //   width = 800;
  // } else if (window.matchMedia("(max-width: 1500px)").matches) {
  //   width = 1000;
  // }

  // MAP THROUGH DATA TO GRAB IT AND SET TOTAL AMOUNTS FOR PIE CHART.
  const pieChartData = useCallback(() => {
    let mortgage_rent = 0;
    let utilities = 0;
    let insurance = 0;
    let loans = 0;
    let transportation = 0;
    let food = 0;
    let other = 0;
    if (props.expense.length === 0){
      mortgage_rent = 1;
      utilities = 1;
      insurance = 1;
      loans = 1;
      transportation = 1;
      food = 1;
      other = 1;
    } else {
      mortgage_rent = 0;
      utilities = 0;
      insurance = 0;
      loans = 0;
      transportation = 0;
      food = 0;
      other = 0;
    }

    props.expense.map((dataObj) => {
      let formAmount = dataObj.amount;
      let formType = dataObj.expense_type;

      if (formType === "Mortgage/Rent") {
        return (mortgage_rent += formAmount);
      } else if (formType === "Utilities") {
        return (utilities += formAmount);
      } else if (formType === "Insurance") {
        return (insurance += formAmount);
      } else if (formType === "Loans") {
        return (loans += formAmount);
      } else if (formType === "Transportation") {
        return (transportation += formAmount);
      } else if (formType === "Food") {
        return (food += formAmount);
      } else if (formType === "Other") {
        return (other += formAmount);
      } else {
        return console.log("null form entry");
      }
    });


    setSeries([
      mortgage_rent,
      utilities,
      insurance,
      loans,
      transportation,
      food,
      other,
    ]);
  }, [props.expense]);


  useEffect(() => {
    pieChartData();
  }, [pieChartData]);

  let state = {
    options: {
      labels: [
        "Mortgage/Rent",
        "Utilities",
        "Insurance",
        "Loans",
        "Transportation",
        "Food",
        "Other",
      ],
      // colors: ["#008FFB", "#00E396", "#FFB01A", "#EC5D25", "#FF4560", "#775DD0", "#1C2758"],
      colors: [
        "#008FFB",
        "#00F0E6",
        "#00E396",
        "#FFB01A",
        "#D60027",
        "#F038CA",
        "#775DD0",
      ],
    },
    series: series,
  };

  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        // height={height}
        // width={width}
        // colors={state.colors}
        // legend={state.legend}
      />
    </div>
  );
}

export default PieChart;
