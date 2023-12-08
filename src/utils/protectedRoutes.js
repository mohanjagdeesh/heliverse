import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const jwtToken = Cookies.get("jwtToken");
  return jwtToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
