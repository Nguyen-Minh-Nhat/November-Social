import { NavLink, useLocation } from "react-router-dom";
import Tooltip from "../../../components/Tooltip";
import { AnimatePresence, motion } from "framer-motion";

const menuItem = [
  {
    path: "/",
    icon: <i className="fa-duotone fa-house-user"></i>,
    title: "Home",
  },
  {
    path: "/friends",
    icon: <i className="fa-duotone fa-user-group"></i>,
    title: "Friends",
  },
  {
    path: "/photos",
    icon: <i className="fa-duotone fa-image"></i>,
    title: "Photos",
  },
  {
    path: "/cinema",
    icon: <i className="fa-duotone fa-film"></i>,
    title: "Cinema",
  },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="w-full flex justify-between gap-4">
      {menuItem.map((item) => {
        let isActive = false;
        if (location.pathname === "/" && item.path === "/") isActive = true;
        else if (location.pathname !== "/")
          isActive = item.path.includes(location.pathname);
        return (
          <Tooltip
            key={item.title}
            content={item.title}
            className={"flex-1 flex justify-center"}
          >
            <NavLink
              to={item.path}
              className={`relative flex-1 p-2 w-full rounded-full
                text-2xl text-center dark:text-dark-text-regular
                hover-brightness cursor-pointer transition-all 
                ${isActive ? "text-primary dark:text-primary" : ""}`}
            >
              {item.icon}
              {isActive && (
                <motion.div
                  variants={animate}
                  initial="hidden"
                  animate="visible"
                  className="absolute -bottom-4 left-1/2 w-full h-1 rounded-full bg-primary origin-center"
                ></motion.div>
              )}
            </NavLink>
          </Tooltip>
        );
      })}
    </nav>
  );
};

const animate = {
  hidden: {
    width: 0,
    opacity: 0,
    x: "-50%",
  },
  visible: { width: "100%", opacity: 1 },
  transition: {
    type: "spring",
    damping: 15,
    stiffness: 300,
  },
};

export default Navbar;
