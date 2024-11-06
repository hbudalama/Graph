import { ShowLoginPage } from './loginPage'
import { ShowDashboardPage } from './dashboard'
import { login } from './login'

const app = document.querySelector<HTMLDivElement>('#app')


// check if logged in?
if (!true) {
  ShowLoginPage()
} else {
  ShowDashboardPage()
}