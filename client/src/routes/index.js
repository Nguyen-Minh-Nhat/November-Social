import routes from "../config/routes";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import AcctiveAccountPage from "../pages/Auth/AcctiveAccount";

const publicRoutes = [
  {
    path: routes.auth,
    component: AuthPage,
  },
  { path: routes.userActive, component: AcctiveAccountPage },
];
const privateRoutes = [{ path: routes.home, component: HomePage }];

export { publicRoutes, privateRoutes };
