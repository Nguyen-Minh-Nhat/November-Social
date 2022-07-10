import { useRef } from "react";

const PostMenu = ({ onDelete, onEdit }) => {
  const menutItems = useRef([
    {
      title: "Edit post",
      icon: <i className="fa-light fa-pen-to-square"></i>,
      action: onEdit,
    },
    {
      title: "Delete post",
      icon: <i className="fa-light fa-trash-can-xmark"></i>,
      action: onDelete,
    },
    {
      title: "Logout",
      icon: <i className="fa-light fa-arrow-right-from-bracket"></i>,
    },
  ]);
  return (
    <div className="w-56 -mx-2">
      {menutItems.current.map((item) => (
        <div
          key={item.title}
          onClick={item.action}
          className="flex items-center py-2 cursor-pointer hover:dark:bg-dark-very-light"
        >
          <div className="w-10 h-4 flex justify-center items-center text-base dark:text-dark-text-regular">
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
  );
};

export default PostMenu;
