import React from "react";

const SpinnerV2 = ({ className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      version="1.1"
      viewBox="0 0 16 16"
      className="animate-spin text-primary"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0c-4.355 0-7.898 3.481-7.998 7.812 0.092-3.779 2.966-6.812 6.498-6.812 3.59 0 6.5 3.134 6.5 7 0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-4.418-3.582-8-8-8zM8 16c4.355 0 7.898-3.481 7.998-7.812-0.092 3.779-2.966 6.812-6.498 6.812-3.59 0-6.5-3.134-6.5-7 0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5c0 4.418 3.582 8 8 8z"></path>
    </svg>
  );
};

export default SpinnerV2;
