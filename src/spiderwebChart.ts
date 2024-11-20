import ApexCharts from "apexcharts";
import { IRadarQuery } from "./spiderwebQuery";

export function initializeRadarChart(radarData: IRadarQuery[]) {
  const chartData = radarData.map((item) => item.amount);
  const chartCategories = radarData.map((item) => item.type);

  // const options = {
  //   series: [
  //     {
  //       // name: "Series 1",
  //       data: chartData,
  //     },
  //   ],
  //   chart: {
  //     height: 400,
  //     type: "radar",
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   title: {
  //     text: "Skills",
  //     style: {
  //       color: "#e5d3f2d1",
  //       fontSize: "30px", 
  //       fontFamily: "garamond",
  //       fontWeight: "bold",
  //     },
  //   },
  //   yaxis: {
  //     max: 100,
  //     stepSize: 20,
  //   },
  //   xaxis: {
  //     categories: chartCategories,
  //   },
  // };

  const options = {
    series: [
      {
        // name: "Series 1",
        data: chartData,
      },
    ],
    chart: {
      height: 400,
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Skills",
      style: {
        color: "#e5d3f2d1", // Title color
        fontSize: "30px", 
        fontFamily: "garamond",
        fontWeight: "bold",
      },
    },
    yaxis: {
      max: 100,
      stepSize: 20,
      labels: {
        style: {
          color: "#FFFFFF", // Y-axis label color (numbers)
          fontSize: "14px",
          fontFamily: "garamond",
          fontWeight: "bold",
        },
      },
    },
    xaxis: {
      categories: chartCategories, // Categories for the radar chart (skills)
      labels: {
        style: {
          color: "#e5d3f2d1", // Color for the category labels (skills)
          fontSize: "14px",
          fontFamily: "garamond",
          fontWeight: "bold",
        },
      },
    },
    stroke: {
      show: true, // Show the line around each radar section
      width: 2, // Line width
      colors: ["#8e4ec6"], // Color of the radar lines
    },
    fill: {
      opacity: 0.4, // Fill opacity inside the radar area
      colors: ["#8e4ec6"], // Color of the fill inside the radar
    },
    markers: {
      size: 4, // Size of the markers on the radar chart
      colors: "#e5d3f2d1", // Color of the markers
      strokeColor: "#fff", // Stroke color of the markers
      strokeWidth: 2, // Stroke width of the markers
    },
    radar: {
      polygons: {
        strokeColors: "#8e4ec6", // Color of the polygon lines
        fill: {
          colors: ["#8e4ec6"], // Color of the area behind the radar chart
        },
      },
    },
    // Additional properties for customizing X/Y axis labels
    grid: {
      padding: {
        top: -10, // Adjust positioning if necessary
      },
    },
  };
  
  
  const chartElement = document.querySelector("#radar-chart");
  if (chartElement) {
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  } else {
    console.error("Chart container not found");
  }
}

