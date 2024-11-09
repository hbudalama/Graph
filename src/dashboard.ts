import van from 'vanjs-core';
import { handleLogout } from './logout';
import { initializeRadarChart } from './spiderwebChart';
import { initializeProgressChart } from './progressChart';
import { initializeLevel } from './level';
import { fetchRadarData } from './spiderwebQuery';

const { div, img, button, h1, p } = van.tags;

export function DashboardPage(): HTMLDivElement {
  return div(
    {
      class: 'home-container',
    },
    div({ class: 'header' },
      div({ class: 'logo' }, img({ src: '/logo.svg' })),
      button({ class: 'logout-btn', onclick: handleLogout}, 'Logout')
     ),
    div({ class: 'home-content' },
      div({ class: 'top-container'},
        div({ class: 'student-info'},
          h1({ class: 'student-name'}, 'Hello, Hanin!'),
          p({ class: 'email'}, 'Haneenbudalama@gmail.com'),
          p({ class: 'audit-ratio'}, 'Audit ratio: 1.0!'),
          p({ class: 'XP'}, '600KB'),
        ),
        div({
          id: 'level'
        })
      ),
      div({ class: 'bottom-container'},
        div({ class: 'bottom-left', id: 'radar-chart'}),
        div({ class: 'bottom-right', id: 'progress-chart'})
      )
    )
  );
}


// export function ShowDashboardPage() {
//   const app = document.querySelector<HTMLDivElement>('#app');
//   if (!app) {
//     throw new Error('App is not found');
//   }

//   app.innerHTML = '';

//   app.append(DashboardPage());
//   initializeRadarChart();
//   initializeProgressChart();
//   initializeLevel();
//   fetchRadarData();
// }

export async function ShowDashboardPage() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('App is not found');
  }

  app.innerHTML = ''; // Clear existing content

  // Append the dashboard page (assuming this returns an HTML element)
  app.append(DashboardPage());

  try {
    // Fetch the radar data asynchronously
    const radarData = await fetchRadarData();

    // Check if the data is an error
    if (radarData instanceof Error) {
      console.error("Failed to load radar data");
      return; // Exit the function if data fetch failed
    }


    initializeRadarChart(radarData);
    initializeProgressChart();
    initializeLevel();
  } catch (error) {
    console.error("Error initializing the dashboard:", error);
  }
}

