import ApexCharts from "apexcharts";

export function initializeProgressChart() {
  const options = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 400,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["transparent"], 
        opacity: 0.5,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#8e4ec6"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
  };

  const chartElement = document.querySelector("#progress-chart");
  if (chartElement) {
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  } else {
    console.error("Chart container not found");
  }
}
