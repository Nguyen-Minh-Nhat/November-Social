import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import AccountQuickView from "../../../components/AccountQuickView";
import Box from "../../../components/Box";
import Button from "../../../components/Button";
import FollowButton from "../../../components/Button/FollowButton";

const SuggestionsUser = () => {
  const [suggestionsUser, setSuggestionsUser] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const getSuggestionsUser = async () => {
    try {
      const res = await userApi.suggestionsUser();
      setSuggestionsUser(res.data.users);
    } catch (error) {
      console.log(error);
    }
    setShowSuggestions(true);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getSuggestionsUser();
    }
    return () => (mounted = false);
  }, []);

  return (
    <Box
      header={
        <div className="text-lg flex justify-between items-center">
          <span>
            People in <span className="text-primary">NovSocial</span>
          </span>

          <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
            <div className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-dark-light  cursor-pointer">
              <i className="fa-solid fa-ellipsis-vertical dark:text-dark-text-light"></i>
            </div>
          </div>
        </div>
      }
      className="w-[310px] overflow-hidden"
    >
      {showSuggestions &&
        suggestionsUser.map((user) => (
          <div
            key={user._id}
            className="relative flex group gap-2 justify-center dark:hover:bg-dark-light p-2 border-t dark:border-dark-border"
          >
            {" "}
            <AccountQuickView className="text-sm" user={user} />
            <div className="ml-auto mr-2">
              <FollowButton followId={user._id} />
            </div>
          </div>
        ))}
      <div
        className="mx-auto rounded-full hover:bg-primary/10 cursor-pointer w-8 h-8 text-center"
        onClick={() => setShowSuggestions(!showSuggestions)}
      >
        {showSuggestions ? (
          <i className="fa-duotone fa-angles-up text-primary leading-8"></i>
        ) : (
          <i className="fa-duotone fa-angles-down text-primary leading-8"></i>
        )}
      </div>
    </Box>
  );
};

export default SuggestionsUser;
