import routes from "../config/routes";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import ChatPage from "../pages/Chat";
import ActiveAccountPage from "../pages/Auth/ActiveAccount";
import HeaderOnly from "../layouts/HeaderOnly";
import Main from "../pages/Chat/components/Main";
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
  { path: routes.cinema, component: HomePage },
  {
    path: routes.chat,
    component: ChatPage,
    layout: HeaderOnly,
    childrenPath: "/:id",
    children: { path: ":id", component: Main },
  },
];

export { publicRoutes, privateRoutes };
