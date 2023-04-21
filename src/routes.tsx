import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoutes } from "./components/protectedRoutes";
import { FoodProvider } from "./contexts/foodContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/shop"
          element={
            <FoodProvider>
              <ShopPage />
            </FoodProvider>
          }
        />
      </Route>

      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/cadastro" element={<Navigate to="/register" />} />

      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
};

export default Router;
