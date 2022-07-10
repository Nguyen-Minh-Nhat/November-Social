import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../../api/userApi";
import AccountQuickView from "../../../components/AccountQuickView/AccountQuickView";
import Popover from "../../../components/Popover";
import Spinner from "../../../components/Spinner";
import SpinnerV2 from "../../../components/Spinner/SpinnerV2";
import useDebounce from "../../../hooks/useDebounce";
const Search = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);
  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        const res = await userApi.searchUsers(debouncedValue, accessToken);
        setSearchResult(res.data.searchUser);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleClearSearch = (e) => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  return (
    <Popover
      visible={showSearchResult && searchResult.length > 0}
      setVisible={setShowSearchResult}
      className="w-80 origin-top"
      render={searchResult.map((user, index) => (
        <AccountQuickView key={index} user={user} />
      ))}
    >
      <div
        className="w-80 h-10 rounded-full px-4 py-2
            flex items-center justify-between
          dark:bg-dark-very-light overflow-hidden border border-transparent group focus-within:border-primary/50"
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Search"
          className="w-full outline-none bg-transparent dark:text-dark-text-regular
                placeholder-[#4e6183]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowSearchResult(true)}
        />
        {searchValue && (
          <div className="mx-3 flex">
            {isLoading ? (
              <Spinner className="w-4 h-4 mr-0 -ml-0" />
            ) : (
              // <SpinnerV2 />
              <i
                className="fa-solid fa-circle-xmark text-slate-400 cursor-pointer"
                onClick={handleClearSearch}
              ></i>
            )}
          </div>
        )}
        <div
          className="relative w-12 h-12 shrink-0 -mr-4 flex justify-center items-center 
                cursor-pointer hover:dark:bg-dark-light/50"
        >
          <div
            className="absolute left-0 w-[1px] h-1/2 top-1/2 -translate-y-1/2 
                dark:bg-dark-border "
          ></div>
          <i
            className={`fa-regular fa-magnifying-glass text-xl ${
              searchValue ? "dark:text-primary" : "dark:text-[#4e6183]"
            }`}
          ></i>
        </div>
      </div>
    </Popover>
  );
};

export default Search;
