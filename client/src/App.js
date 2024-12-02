import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";

const App = () => {
  const role = useSelector((state) => state.auth.user?.role);

  return <RoleBasedRoutes role={role} />;
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
