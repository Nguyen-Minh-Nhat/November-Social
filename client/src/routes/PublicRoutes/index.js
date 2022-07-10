import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import routes from "../../config/routes";

const PublicRoutes = ({ isLogged }) => {
  const location = useLocation();
  const from = location.state?.form?.pathname || routes.home;
  return isLogged ? <Navigate to={from} /> : <Outlet />;
};

PublicRoutes.propTypes = {
  isLogged: PropTypes.bool,
};

export default PublicRoutes;
