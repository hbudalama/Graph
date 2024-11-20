import ApexCharts from "apexcharts";
import { fetchProgressQuery } from "./progressQuery";

export async function initializeProgressChart(userLogin: string) {
try {
    const progressData = await fetchProgressQuery(userLogin);

    if (progressData instanceof Error) {
      console.error("Failed to fetch progress:", progressData.message);
      return;
    }

    // const categories = progressData.map((transaction) => new Date(transaction.createdAt).toLocaleDateString());
    const data = progressData.map((transaction) => transaction.amount);
    const project = progressData.map((transaction) => transaction.objectName);

    const options = {
      series: [
        {
          name: "XP Progress",
          data: data, // XP amount per transaction
        },
      ],
      chart: {
        height: 400,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "XP Progress",
        style: {
          color: "#e5d3f2d1",
          fontSize: "30px", 
          fontFamily: "garamond",
          fontWeight: "bold",
        },
      },
      grid: {
        row: {
          colors: ["transparent"], // Background colors for rows
          opacity: 0.5,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#8e4ec6"], // Gradient color for the line
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      xaxis: {
        categories: project, // X-axis categories (project names)
        labels: {
          rotate: -45, // Rotate labels for better readability
          style: {
            colors: "#979797",
            fontSize: "12px", 
            fontFamily: "garamond", 
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#979797",
            fontSize: "15px", 
            fontFamily: "garamond",
            fontWeight: "bold"
          },
        },
      },
    };

    // Render the chart if the container is found
    const chartElement = document.querySelector("#progress-chart");
    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();
    } else {
      console.error("Chart container not found");
    }
  } catch (error) {
    console.error("Error initializing chart:", error);
  }
}