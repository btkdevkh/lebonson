import { Route, Routes } from "react-router-dom";
import ProductDetails from "../pages/Product/ProductDetails";
import Products from "../pages/Product/Products";

export default function ProductRoutes() {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path=':id' element={<ProductDetails />} />
    </Routes>
  )
}
