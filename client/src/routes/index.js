import routes from "../config/routes";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import ActiveAccountPage from "../pages/Auth/ActiveAccount";

const publicRoutes = [
  {
    path: routes.auth,
    component: AuthPage,
  },
  { path: routes.userActive, component: ActiveAccountPage },
];
const privateRoutes = [
  { path: routes.home, component: HomePage },
  { path: routes.friends, component: HomePage },
  { path: routes.photos, component: HomePage },
  { path: routes.Cinema, component: HomePage },
];

export { publicRoutes, privateRoutes };
