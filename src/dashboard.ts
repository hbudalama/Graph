import van from 'vanjs-core';
import { handleLogout } from './logout';
import { initializeRadarChart } from './spiderweb';
import { initializeProgressChart } from './progress';
import { initializeLevel } from './level';
import { fetchRadarData } from './radar';

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

export function ShowDashboardPage() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('App is not found');
  }

  app.innerHTML = '';

  app.append(DashboardPage());
  initializeRadarChart();
  initializeProgressChart();
  initializeLevel();
  fetchRadarData();
}
