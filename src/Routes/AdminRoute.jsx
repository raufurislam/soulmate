import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }

  if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate
      // state={location.pathname} to={"/auth/login"}
      state={{ from: location }}
      to={redirectTo}
    ></Navigate>
  );
};

export default AdminRoute;
