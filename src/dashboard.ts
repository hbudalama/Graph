import van from "vanjs-core";
import { handleLogout } from "./logout";
import { initializeRadarChart } from "./spiderwebChart";
import { initializeProgressChart } from "./progressChart";
import { initializeLevel } from "./level";
import { fetchRadarData } from "./spiderwebQuery";
import { fetchUserInfo } from "./userInfo";

const { div, img, button, h1, p } = van.tags;

// export async function DashboardPage(): Promise<HTMLDivElement> {
//   const userInfo = await fetchUserInfo();
//   return div(
//     {
//       class: "home-container",
//     },
//     div(
//       { class: "header" },
//       div({ class: "logo" }, img({ src: "/logo.svg" })),
//       button({ class: "logout-btn", onclick: handleLogout }, "Logout")
//     ),
//     div(
//       { class: "home-content" },
//       div(
//         { class: "top-container" },
//         div(
//           { class: "student-info" },
//           h1({ class: "student-name" }, userInfo instanceof Error ? "Hello, Guest!" : `Hello, ${userInfo.firstName}`),
//           p({ class: "email" }, userInfo instanceof Error ? "N/A" : userInfo.email),
//           p({ class: "audit-ratio" }, userInfo instanceof Error ? "Audit ratio: N/A" : `Audit ratio: ${userInfo.auditRatio}`),
//           p({ class: "XP" }, "600KB")
//         ),
//         div({
//           id: "level",
//         })
//       ),
//       div(
//         { class: "bottom-container" },
//         div({ class: "bottom-left", id: "radar-chart" }),
//         div({ class: "bottom-right", id: "progress-chart" })
//       )
//     )
//   );
// }

export async function DashboardPage(): Promise<HTMLDivElement> {
  // Fetch user information asynchronously
  const userInfo = await fetchUserInfo();

  // Create the base container
  const page = div({ class: "home-container" },
    div({ class: "header" },
      div({ class: "logo" }, img({ src: "/logo.svg" })),
      button({ class: "logout-btn", onclick: handleLogout }, "Logout")
    ),
    div({ class: "home-content" },
      div({ class: "top-container" },
        div({ class: "student-info" },
          h1({ class: "student-name" }, userInfo instanceof Error ? "Hello, Guest!" : `Hello, ${userInfo.firstName}!`),
          p({ class: "email" }, userInfo instanceof Error ? "N/A" : userInfo.email),
          p({ class: "audit-ratio" }, userInfo instanceof Error ? "Audit ratio: N/A" : `Audit ratio: ${userInfo.auditRatio}`),
          // p({ class: "XP" }, "600KB") 
        ),
        div({ id: "level" })
      ),
      div({ class: "bottom-container" },
        div({ class: "bottom-left", id: "radar-chart" }),
        div({ class: "bottom-right", id: "progress-chart" })
      )
    )
  );

  return page;
}

export async function ShowDashboardPage() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) {
    throw new Error("App is not found");
  }

  app.innerHTML = "";

  const dashboardElement = await DashboardPage();
  app.append(dashboardElement);

  try {
    const radarData = await fetchRadarData();

    if (radarData instanceof Error) {
      console.error("Failed to load radar data");
      return; 
    }

    initializeRadarChart(radarData);
    initializeProgressChart();
    initializeLevel();
  } catch (error) {
    console.error("Error initializing the dashboard:", error);
  }
}
