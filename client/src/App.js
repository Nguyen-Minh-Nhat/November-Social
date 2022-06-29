import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import FirstConfig from "./components/FirstConfig/FirstConfig";
import { logout } from "./redux/slices/authSlice";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AuthPage from "./pages/Auth";
import authApi from "./api/authApi";
import Login from "./pages/Auth/components/Login";
import Register from "./pages/Auth/components/Register";
import { AnimatePresence } from "framer-motion";

const isLogged = false;
function App() {
  const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  // const isLogged = !!user;
  // const handleLogout = async () => {
  //   try {
  //     await authApi.logout();
  //     const action = logout();
  //     dispatch(action);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const location = useLocation();
  return (
    <div className="App w-screen h-screen flex dark:bg-dark-very-light overflow-hidden">
      {/* <div onClick={handleLogout}>Logout</div> */}
      <FirstConfig />

      <Routes>
        <Route element={<PublicRoutes isLogged={isLogged} />}>
          <Route path={"/login"} element={<AuthPage />} />
          <Route path={"/register"} element={<AuthPage />} />

          {/* {publicRoutes.map((route, index) => (
            <Route
            key={index}
            path={route.path}
            element={<route.component />}
            />
          ))} */}
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
