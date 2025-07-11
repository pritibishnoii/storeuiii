import { useSelector } from "react-redux";
import { replace, Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;

// replace = history me current page ko nikal ke naya page dal do, taki user back na ja sake
// // ✅ Redirect non-admin or unauthenticated users
// if (!userInfo || !userInfo.isAdmin) {
//   return <Navigate to="/login" replace />;
// }
