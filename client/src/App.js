import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";
import I18n from "./i18n";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
const isLogged = false;
function App() {
  return (
    <div className="App h-screen w-screen flex dark:bg-dark-light">
      <I18n />
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
