import { useRef, useState } from "react";
import FillButon from "./FillButon";

const LikeButton = ({ onClick = () => {}, isActive, className }) => {
  const [isLiked, setIsLiked] = useState(isActive);
  const heartRef = useRef(null);
  const handleClick = (e) => {
    onClick();
    setIsLiked(!isLiked);
    if (heartRef) {
      heartRef.current.classList.add("bouncy");
      if (heartRef.current.classList.contains("bouncy")) {
        setTimeout(() => {
          heartRef.current.classList.remove("bouncy");
        }, 500);
      }
    }
  };
  return (
    <FillButon
      onClick={handleClick}
      className={className}
      fillColor="bg-red-500"
      isActive={isLiked}
    >
      <i ref={heartRef} className="fa-solid fa-heart heart"></i>
    </FillButon>
  );
};

export default LikeButton;
