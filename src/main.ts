import { ShowLoginPage } from './loginPage'
import { ShowDashboardPage } from './dashboard'
import { isloggedin, login } from './login'

const app = document.querySelector<HTMLDivElement>('#app')


// check if logged in?
if (isloggedin()) {
 ShowDashboardPage()
} else {
  ShowLoginPage()
}