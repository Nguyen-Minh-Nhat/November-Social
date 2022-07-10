import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../config/routes";

const Logo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    if (location.pathname === routes.home) {
    } else navigate(routes.home);
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      viewBox="-200 291.3 210.7 210.7"
      className="cursor-pointer"
      onClick={handleClick}
    >
      <path
        d="M-122.3 410.3h16.8l81.9-102.1h-142v177l43.2-53.9v-21h.1zm0-56.8h62.4l-10.2 12.7h-52.2v-12.7z"
        fill="#fff"
      />
    </svg>
  );
};

export default Logo;
