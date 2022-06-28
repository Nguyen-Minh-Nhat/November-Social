import { Route, Routes } from "react-router-dom";
import FirstConfig from "./components/FirstConfig/FirstConfig";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

const isLogged = false;
function App() {
  // const user = useSelector((state) => state.auth.user);
  // const isLogged = !!user;
  return (
    <div className="App w-screen h-screen flex dark:bg-dark-very-light overflow-hidden">
      <FirstConfig />
      <Routes>
        <Route element={<PublicRoutes isLogged={isLogged} />}>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>

        <Route element={<PrivateRoutes isLogged={isLogged} />}>
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
