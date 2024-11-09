import ApexCharts from "apexcharts";
import { IRadarQuery } from "./spiderwebQuery";

export function initializeRadarChart(radarData: IRadarQuery[]) {
  const chartData = radarData.map((item) => item.amount);
  const chartCategories = radarData.map((item) => item.type);

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
        color: "#e5d3f2d1",
        fontSize: "30px", 
        fontFamily: "garamond",
        fontWeight: "bold",
      },
    },
    yaxis: {
      max: 100,
      stepSize: 20,
    },
    xaxis: {
      categories: chartCategories,
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

