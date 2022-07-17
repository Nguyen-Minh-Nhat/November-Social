import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi";
import { setUser } from "../../redux/slices/authSlice";
import FillButon from "./FillButon";

const FollowButton = ({ followId }) => {
  const user = useSelector((state) => state.auth.user);
  const [isFollowed, setIsFollowed] = useState(
    user.following.includes(followId),
  );
  useEffect(() => {
    setIsFollowed(user.following.includes(followId));
  }, [user.following]);
  const dispatch = useDispatch();
  const handleClick = async () => {
    setIsFollowed(!isFollowed);
    try {
      const res = await userApi.follow(followId);
      const action = setUser({ ...user, following: res.data.user.following });
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FillButon onClick={handleClick} className="shadow" isActive={isFollowed}>
      {isFollowed ? (
        <i className="fa-solid fa-user-minus"></i>
      ) : (
        <i className="fa-solid fa-user-plus"></i>
      )}
    </FillButon>
  );
};

export default FollowButton;
