import routes from "../config/routes";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";

const publicRoutes = [{ path: routes.login, component: LoginPage }];
const privateRoutes = [{ path: routes.home, component: HomePage }];

export { publicRoutes, privateRoutes };
