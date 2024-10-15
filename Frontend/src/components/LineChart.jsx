// REFERENCE: https://apexcharts.com/docs/creating-first-javascript-chart/#
// Types of Budgets: https://localfirstbank.com/article/budgeting-101-personal-budget-categories/?fb_content_cat=fb-tsm
import React from "react";
import Chart from "react-apexcharts";
// import Dropdown from "react-bootstrap/Dropdown";

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



// MAP THROUGH DATA TO GRAB IT AND SET TOTAL AMOUNTS FOR PIE CHART.

// const lineChartData = useCallback(() => {



//   setSeries([
//     mortgage_rent,
//     utilities,
//     insurance,
//     loans,
//     transportation,
//     food,
//     other,
//   ]);
// }, [props.expense]);

// const [date, setDate] = useState(props.date)
// const [principal, setPrincipal] = useState(props.principal)
// const [interest, setInterest] = useState(props.interest)
// const [total, setTotal] = useState(props.total)

//   console.log(props.date)
//   console.log(props.principal)
//   console.log(props.interest)
//   console.log(props.total)

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
        "#FEB019",
        "#00E396",
      ],
      dataLabels: {
        enabled: false,
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
        }
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: `${props.title} Projection`,
        align: "left",
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: props.date,
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + ":"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + ":"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + ":";
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
    series: [{
      name: "Principal",
      data: props.principal
    },
    {
      name: "Interest",
      data: props.interest
    },
    {
      name: "Total Due",
      data: props.total
    }
      
    ],
  };


// const [dropdownTime, setDropdownTime] = useState("Week");
// const dropdownSubmit = (eventKey) => {
//     setDropdownTime(eventKey);
//   }

  // return (
  //   <div id="chart">
  //     {/* <h2>Expense Line Chart</h2>
  //     {console.log(dropdownTime)}
  //     <Dropdown onSelect={dropdownSubmit}>
  //       <Dropdown.Toggle variant="primary" id="dropdown-basic">
  //       {dropdownTime || 'Select an option'}
  //       </Dropdown.Toggle>

  //       <Dropdown.Menu>
  //         <Dropdown.Item eventKey="Week">Last Week</Dropdown.Item>
  //         <Dropdown.Item eventKey="Month">Last Month</Dropdown.Item>
  //         <Dropdown.Item eventKey="Year">Last Year</Dropdown.Item>
  //       </Dropdown.Menu>
  //     </Dropdown> */}

  //     <Chart
  //       options={state.options}
  //       series={state.series}
  //       type="line"
  //       // colors={state.colors}
  //       // legend={state.legend}
  //     />
  //   </div>
  // );

  return (<Chart
        options={state.options}
        series={state.series}
        type="line"
      />
  );
}

export default LineChart;
