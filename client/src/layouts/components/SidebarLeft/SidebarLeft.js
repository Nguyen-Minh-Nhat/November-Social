import { useState } from "react";
import SuggestionsUser from "./SuggestionsUser";

const SidebarLeft = () => {
  const [pin, setPin] = useState(true);

  return (
    <div className={`${pin ? "sticky top-0" : "relative"} flex-1  flex group`}>
      {/* <div
        className="group-hover:translate-x-0 absolute left-0 -translate-x-full mx-auto rounded-full hover:bg-primary/10 cursor-pointer w-8 h-8 text-center leading-8 text-white transition-all"
        onClick={() => setPin(!pin)}
      >
        {pin ? (
          <i className="fa-duotone fa-link-slash"></i>
        ) : (
          <i className="fa-duotone fa-link"></i>
        )}
      </div> */}
      <div>
        <SuggestionsUser />
      </div>
    </div>
  );
};

export default SidebarLeft;
