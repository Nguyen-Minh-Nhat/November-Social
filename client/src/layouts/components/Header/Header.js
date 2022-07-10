import Logo from "../../../assets/icons/Logo";
import Navbar from "../Navbar";
import { Search } from "../Search";
import LeftAction from "./LeftAction";

const Header = () => {
  return (
    <div
      className="fixed top-0 z-[49] w-full h-20 px-6
      flex justify-between items-center 
    dark:bg-dark-semiBold"
    >
      <div className="flex-1 flex items-center">
        <div className="mr-6 border-r border-primary/30 hover:border-primary/60 transition-all">
          <div className="mr-4">
            <Logo />
          </div>
        </div>
        <Search />
      </div>
      <div className="flex-1">
        <Navbar />
      </div>
      <LeftAction />
    </div>
  );
};

export default Header;
