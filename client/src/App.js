import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import routes from "../src/config/routes";
import FirstConfig from "./components/FirstConfig/FirstConfig";
import DefaultLayout from "./layouts/DefaultLayout";
import HeaderOnly from "./layouts/HeaderOnly";
import AuthPage from "./pages/Auth";
import ActiveAccount from "./pages/Auth/ActiveAccount";
import { privateRoutes } from "./routes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
function App() {
  const user = useSelector((state) => state.auth.user);
  const isLogged = !!user;

  return (
    <div className="App w-screen h-screen dark:bg-dark-very-light overflow-hidden">
      <FirstConfig />
      <Routes>
        <Route element={<PublicRoutes isLogged={isLogged} />}>
          <Route path={routes.login} element={<AuthPage />} />
          <Route path={routes.register} element={<AuthPage />} />
          <Route path={routes.userActive} element={<ActiveAccount />} />
        </Route>

        <Route element={<PrivateRoutes isLogged={isLogged} />}>
          {privateRoutes.map((route, index) => {
            const Layout = DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <route.component />
                  </Layout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
