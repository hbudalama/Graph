import van from 'vanjs-core';
import { login } from './login';
const { div, form, input, button, img, h1 } = van.tags;

async function formSubmitHandler(e: SubmitEvent) {
  e.preventDefault();

  const form = document.querySelector<HTMLFormElement>('#loginForm')

  if (!form) {
    console.error('form doesnt exist')
    return
  }

  const formIdentifier = form.elements.namedItem(
    'identifier'
  ) as HTMLInputElement;
  const formPassword = form.elements.namedItem('password') as HTMLInputElement;



  const jwtOrError = await login(formIdentifier.value, formPassword.value);

  if (jwtOrError instanceof Error) {
    alert(jwtOrError.message);
    return;
  }

  const trimJwtOrError = jwtOrError.replace(/^['"]|['"]$/g, '');
  localStorage.setItem("jwt_token", trimJwtOrError)

  localStorage.getItem("jwt_token")

  console.log(trimJwtOrError);
}

export function LoginPage() {
  return div(
    { class: 'login-container' },
    div({ class: 'logo absolute' }, img({ src: '/logo.svg' })),
    div(
      {
        class: 'loginForm-container',
      },
      form(
        {
          onsubmit: formSubmitHandler,
          class: 'loginForm',
          id: "loginForm"
        },
        h1('Login'),
        input({ type: 'text', placeholder: 'Username/Email', name: 'identifier' }),
        input({ type: 'password', placeholder: 'Password', name: 'password' }),
        button({ type: 'submit' }, 'Submit')
      )
    )
  );
}

export function ShowLoginPage() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('App is not found');
  }

  app.innerHTML = '';

  app.append(LoginPage());
}

