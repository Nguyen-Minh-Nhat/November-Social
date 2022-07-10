import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import routes from "../../config/routes";

const PrivateRoutes = ({ isLogged }) => {
  const location = useLocation();
  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ form: location }} replace />
  ); // render route if not login, if already can not render
};

PrivateRoutes.propTypes = {
  isLogged: PropTypes.bool,
};

export default PrivateRoutes;
