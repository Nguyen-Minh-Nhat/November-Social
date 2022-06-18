import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../../config/routes";

const PrivateRoutes = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to={routes.login} />; // render route if not login, if already can not render
};

PrivateRoutes.propTypes = {
  isLogged: PropTypes.bool,
};

export default PrivateRoutes;
