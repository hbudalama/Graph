import van from 'vanjs-core';

const { div, img, button } = van.tags;

function DashboardPage(): HTMLDivElement {
  return div(
    {
      class: 'home-container',
    },
    div({ class: 'header' },
      div({ class: 'logo' }, img({ src: '/logo.svg' })),
      button({ type: 'submit', class: 'logout-btn'}, 'Logout')
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
