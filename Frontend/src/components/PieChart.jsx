// REFERENCE: https://apexcharts.com/docs/creating-first-javascript-chart/#
// Types of Budgets: https://localfirstbank.com/article/budgeting-101-personal-budget-categories/?fb_content_cat=fb-tsm
import React from "react";
import Chart from "react-apexcharts";

function PieChart(props) {
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

  let state = {
    options: {
        labels: ["Mortgage/Rent", "Utilities", "Insurance", "Loans", "Transportation", "Food", "Other"],
        // colors: ["#008FFB", "#00E396", "#FFB01A", "#EC5D25", "#FF4560", "#775DD0", "#1C2758"],
        colors: ["#008FFB", "#00F0E6", "#00E396", "#FFB01A", "#D60027", "#F038CA", "#775DD0"]
    },
    series: props.series,
  };


  return (
    <div id="chart">
      <h2>Expense Sectors</h2>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        height={height}
        width={width}
        // colors={state.colors}
        // legend={state.legend}
      />
    </div>
  );
}

export default PieChart;
