import { Route, Routes } from "react-router-dom";
import AdminProduct from "../pages/Admin/Products/AdminProduct";
import AdminUser from "../pages/Admin/Users/AdminUser";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='products' element={<AdminProduct />} />
      <Route path='users' element={<AdminUser />} />
    </Routes>
  )
}
