// import React, {useState, useEffect} from "react";
import React from "react";
import Chart from "react-apexcharts";
import getLast5YearsIncome from "./getLast5YearsIncome"

function ColumnChart(props) {
  // let d = new Date();
  // let thisYear = d.getFullYear();
  // const [income, setIncome] = useState();
  const last5Years = () => {
    const years = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 5; i++) {
      let year = currentYear - i;
      years.unshift(year.toString());
    }
    return years;
  };









  const colors = [
    "#008FFB",
    // "#00F0E6",
    "#00E396",
    "#FFB01A",
    "#D60027",
    // "#F038CA",
    "#775DD0",
  ]



  // useEffect(() => {
  //   setIncome(props.income)
  // }, []);



  // let last_5_years_income = [];
  let last_5_years_income = getLast5YearsIncome(props.income);
  // const getLast5YearsIncome = () => {
  //   let yearCurrent = 0;
  //   let yearOne = 0;
  //   let yearTwo = 0;
  //   let yearThree = 0;
  //   let yearFour = 0;
  //   props.income.map((dataObj) => {
  //     let amount = dataObj.amount;
  //     let time = dataObj.payment_interval;
  //     console.log(amount)
  //     console.log(dataObj.payment_interval)

  //     if (time === "Daily"){
  //       amount *= 365
  //     } else if (time === "Weekly"){
  //       amount *= 52
  //     } else if (time === "BiWeekly"){
  //       amount *= 26
  //     } else if (time === "SemiMonthly"){
  //       amount *= 24
  //     } else if (time === "Monthly"){
  //       amount *= 12
  //     }


  //     // occurring === null is if it's still an occurring payment
  //     if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) === thisYear -1)){
  //       yearCurrent += amount;
  //       yearOne += amount;
  //     } else if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) === thisYear -2)){
  //       yearCurrent += amount;
  //       yearOne += amount;
  //       yearTwo += amount;
  //     } else if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) === thisYear -3)){
  //       yearCurrent += amount;
  //       yearOne += amount;
  //       yearTwo += amount;
  //       yearThree += amount;
  //     } else if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) < thisYear)){
  //       yearCurrent += amount;
  //       yearOne += amount;
  //       yearTwo += amount;
  //       yearThree += amount;
  //       yearFour += amount;
  //     } else if (parseInt(dataObj.start_date) === thisYear){
  //       yearCurrent += amount;
  //     } else if (parseInt(dataObj.start_date) === thisYear - 1){
  //       yearOne += amount;
  //     } else if (parseInt(dataObj.start_date) === thisYear - 2){
  //       yearTwo += amount;
  //     } else if (parseInt(dataObj.start_date) === thisYear - 3){
  //       yearThree += amount;
  //     } else if (parseInt(dataObj.start_date) === thisYear - 4){
  //       yearFour += amount;
  //     }
  //     return 0;
  //   })
  //   last_5_years_income = [yearFour, yearThree, yearTwo, yearOne, yearCurrent]

  //   return last_5_years_income;
  // }


  
  let state = {
    series: [{
        // data: getLast5YearsIncome()
        data: last_5_years_income
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: last5Years(),
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        }
      },
  };


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
// THIS IS THE INFO FOR A REGULAR COLUMN CHART. NO Y DETAIL OR COLORS.
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//   let state = {
//     series: [
//       {
//         name: "Income",
//         data: [2.3, 3.1, 4.0, 10.1, 4.0],
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "bar",
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 10,
//           dataLabels: {
//             position: "top", // top, center, bottom
//           },
//         },
//       },
//       dataLabels: {
//         enabled: true,
//         formatter: function (val) {
//           return "%" + val;
//         },
//         offsetY: -20,
//         style: {
//           fontSize: "12px",
//           colors: ["#304758"],
//         },
//       },

//       xaxis: {
//         categories: last5Years(),
//         position: "top",
//         axisBorder: {
//           show: false,
//         },
//         axisTicks: {
//           show: false,
//         },
//         crosshairs: {
//           fill: {
//             type: "gradient",
//             gradient: {
//               colorFrom: "#D8E3F0",
//               colorTo: "#BED1E6",
//               stops: [0, 100],
//               opacityFrom: 0.4,
//               opacityTo: 0.5,
//             },
//           },
//         },
//         tooltip: {
//           enabled: true,
//         },
//       },
//       yaxis: {
//         axisBorder: {
//           show: false,
//         },
//         axisTicks: {
//           show: false,
//         },
//         labels: {
//           show: false,
//           formatter: function (val) {
//             return "$" + val;
//           },
//         },
//       },
//       title: {
//         text: "Last 5 Years of Income",
//         floating: true,
//         offsetY: 330,
//         align: "center",
//         style: {
//           color: "#444",
//         },
//       },
//     },
//   };

  return (
    <div>
      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ColumnChart;
