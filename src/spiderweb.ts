import ApexCharts from "apexcharts";

export function initializeRadarChart() {
    const options = {
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20],
        },
      ],
      chart: {
        height: 350,
        type: "radar",
        toolbar: {
            show: false
          }
      },
      title: {
        text: "Basic Radar Chart",
      },
      yaxis: {
        stepSize: 20,
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
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