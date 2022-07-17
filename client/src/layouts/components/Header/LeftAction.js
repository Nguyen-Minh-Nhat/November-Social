import { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import Popover from "../../../components/Popover";
import Tooltip from "../../../components/Tooltip";
import AccountDropdown from "../AccountDropdown";

const items = [
  { icon: <i className="fa-solid fa-message"></i>, title: "Messages" },
  { icon: <i className="fa-solid fa-bell"></i>, title: "Notification" },
];

const LeftAction = () => {
  const [showSettings, setShowSettings] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex-1 flex gap-4 justify-end text-lg dark:text-dark-text-regular">
      {items.map((item) => {
        return (
          <Tooltip key={item.title} content={item.title}>
            <div
              className="w-10 h-10 rounded-lg flex justify-center items-center 
              bg-dark-very-light
              cursor-pointer hover-brightness"
            >
              {item.icon}
            </div>
          </Tooltip>
        );
      })}

      <Popover
        visible={showSettings}
        setVisible={setShowSettings}
        className="w-72 origin-[93%_0%]"
        render={<AccountDropdown />}
        placement="right"
      >
        <div
          onClick={() => setShowSettings(!showSettings)}
          className="cursor-pointer"
        >
          <Avatar url={user.avatar} size="w-10 h-10" />
        </div>
      </Popover>
    </div>
  );
};

export default LeftAction;
