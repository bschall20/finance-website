import React from "react";
import Chart from "react-apexcharts";

function ColumnChart(props) {
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






  

  
  let state = {
    series: [{
        data: [21, 10, 28, 16, 24]
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



// THIS IS THE INFO FOR A REGULAR COLUMN CHART. NO Y DETAIL OR COLORS.
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
