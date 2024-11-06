import van from 'vanjs-core';
import { handleLogout } from './logout';

const { div, img, button } = van.tags;

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
      div({ class: 'top-container'}),
      div({ class: 'bottom-container'},
        div({ class: 'bottom-left'}),
        div({ class: 'bottom-right'})
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
}
