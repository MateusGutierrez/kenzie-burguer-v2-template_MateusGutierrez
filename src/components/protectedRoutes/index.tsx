import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { LoadingComponent } from "../loadingComponent/loadingComponent";

export const ProtectedRoutes = () => {
  const { user, mesage } = useContext(UserContext);

  if (mesage) {
    return <LoadingComponent />;
  }
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};
