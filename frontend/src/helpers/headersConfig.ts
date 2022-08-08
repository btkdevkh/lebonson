export function headersConfig() {
  const user = JSON.parse(localStorage.getItem("user")!);
  return { headers: { "x-access-token": user.token } }
}
