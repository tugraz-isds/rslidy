import { LineChart, formatWithDecimalZero, select, format, timeFormat, timeYear, } from '../respvis/respvis.js';

//  Data Sources: Studierendenstatistik
//  Tu  Graz: https://online.tugraz.at/tug_online/studierendenstatistik.html
//  Med Uni Graz: https://online.medunigraz.at/mug_online/StudierendenStatistik.html

// Categories: Winter, Studierende, Ordentlich, gemeldet, gesamt

export function createLineChart(selector) {
  const chartWindow = select(selector).append('div')
  const chart = new LineChart(chartWindow, {
    "series": {
      "x": {
        "values": [
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ]
      },
      "y": {
        "values": [
          12764,
          13167,
          13454,
          13737,
          13373,
          13566,
          13673,
          13712,
          13672,
          13443,
          13533,
          3519,
          3534,
          3500,
          3413,
          3302,
          3305,
          3370,
          3472,
          3618,
          3688,
          3818,
        ]
      },
      "categories": {
        "values": [
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Tu Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
          "Med Uni Graz",
        ],
        "title": "University"
      },
      "markerTooltipGenerator": "(n,i)=>`Year:${i.xValue}<br/>Pow. Consumption: ${i.yValue}kWh`",
      "flipped": {
        "dependentOn": "width",
        "mapping": {
          "0": true,
          "2": false
        }
      },
      "zoom": {
        "in": 20,
        "out": 1
      }
    },
    "breakpoints": {
      "width": {
        "values": [
          25,
          30,
          50
        ],
        "unit": "rem"
      }
    },
    "title": {
      "dependentOn": "width",
      "mapping": {
        "0": "Students",
        "1": "Students",
        "3": "Students Registered"
      }
    },
    "subTitle": {
      "dependentOn": "width",
      "mapping": {
        "0": "Students",
        "1": ""
      }
    },
    "x": {
      "title": "Year",
      "subTitle": "[2014 to 2024]",
      "tickOrientation": {
        "dependentOn": "width",
        "scope": "self",
        "breakpointValues": {
          "0": 90,
          "2": 0
        }
      },
      "breakpoints": {
        "width": {
          "values": [
            10,
            30,
            50
          ],
          "unit": "rem"
        }
      },
      /*configureAxis: (axis) => {
        axis.ticks(timeYear.every(1));
        axis.tickFormat(timeFormat('%Y'));
      }
      gridLineFactor: 1*/
    },
    "y": {
      "title": "Students",
      "breakpoints": {
        "width": {
          "values": [
            10,
            30,
            50
          ],
          "unit": "rem"
        }
      },
      "tickOrientationFlipped": {
        "dependentOn": "width",
        "scope": "self",
        "breakpointValues": {
          "0": 90,
          "2": 0
        }
      }
    }
  })
  console.log("buildChart")
  chart.buildChart()
}
window.addEventListener("beforeprint", (event) => {
  console.log("beforeprint");
  createLineChart();
});