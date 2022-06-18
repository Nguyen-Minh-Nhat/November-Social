import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../../config/routes";

const PublicRoutes = ({ isLogged }) => {
  return isLogged ? <Navigate to={routes.home} /> : <Outlet />; // render route if not login, if already can not render
};

PublicRoutes.propTypes = {
  isLogged: PropTypes.bool,
};

export default PublicRoutes;
