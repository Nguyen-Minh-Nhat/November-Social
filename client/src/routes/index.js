import routes from "../config/routes";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";

const publicRoutes = [{ path: routes.auth, component: AuthPage }];
const privateRoutes = [{ path: routes.home, component: HomePage }];

export { publicRoutes, privateRoutes };
