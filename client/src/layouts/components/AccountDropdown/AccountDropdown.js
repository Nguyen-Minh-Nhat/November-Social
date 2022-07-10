import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../../api/authApi";
import AccountQuickView from "../../../components/AccountQuickView";
import ToggleButton from "../../../components/ToggleButton";
import { logout } from "../../../redux/slices/authSlice";
import { setPostList } from "../../../redux/slices/postSlice";

const AccountDropdown = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await authApi.logout();
      let action = setPostList([]);
      dispatch(action);
      action = logout();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const dropdownItems = useRef([
    {
      title: "Setting",
      icon: <i className="fa-light  fa-gear"></i>,
      description: "Access widget settings.",
    },
    {
      title: "Help",
      icon: <i className="fa-light  fa-circle-info"></i>,
      description: "Contact our support.",
    },
    {
      title: "Logout",
      icon: <i className="fa-light fa-arrow-right-from-bracket"></i>,
      description: "Log out from your account.",
      action: handleLogout,
    },
  ]);
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <div className="px-4 py-2 pb-4 flex justify-end items-center border-b dark:border-dark-border -mx-2">
        <ToggleButton />
      </div>

      <div className="p-2 -mx-2">
        <AccountQuickView user={user} />
      </div>
      <div className="border-t dark:border-dark-border -mx-2">
        {dropdownItems.current.map((item) => (
          <div
            key={item.title}
            onClick={item.action}
            className="flex items-center px-4 py-2 cursor-pointer hover:dark:bg-dark-very-light"
          >
            <div className="w-8 h-8 mr-4 flex justify-center items-center text-base dark:text-dark-text-regular">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm dark:text-dark-text-bold">
                {item.title}
              </span>
              <span className="text-[12px] leading-3 dark:text-dark-text-light">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AccountDropdown;
