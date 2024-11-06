import { ShowLoginPage } from "./loginPage";

export async function handleLogout(_: SubmitEvent) {
  const url = "https://learn.reboot01.com/api/auth/signout";

  await fetch(url, {
    method: "POST",
    headers: {
        'x-jwt-token': localStorage.getItem("jwt_token") ?? ''
    } 
  });

  localStorage.removeItem("jwt_token");
  ShowLoginPage();
}
