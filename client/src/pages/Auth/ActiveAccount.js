import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import authApi from "../../api/authApi";
import TickIcon from "../../assets/icons/TickIcon";
import XMarkIcon from "../../assets/icons/XMarkIcon";
import Button from "../../components/Button";
import routes from "../../config/routes";

const success = {
  icon: <TickIcon />,
  title: "Your account is verified.",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, ipsum.",
  color: "green-500",
  button: {
    redirect: routes.login,
    title: "Log in now",
  },
};

const fail = {
  icon: <XMarkIcon />,
  title: "Verification failed.",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, ipsum.",
  button: {
    redirect: routes.register,

    title: "Register again",
  },
};

const ActiveAccount = () => {
  const { data } = useParams();
  const { t } = useTranslation();
  const [result, setResult] = useState(fail);

  const navigate = useNavigate();

  useEffect(() => {
    const activeAccount = async () => {
      try {
        await authApi.activeAccount({ activation_token: data });
        setResult(success);
      } catch (e) {
        setResult({ ...fail, description: e.response.data.msg });
      }
    };
    activeAccount();
  }, [data]);
  return (
    <div className="w-full h-full flex justify-center">
      <div
        className="w-2/5 p-4 flex items-center
        bg-white dark:bg-dark-very-light
      "
      >
        <div
          className={`w-full rounded-xl p-4 overflow-hidden
          flex flex-col gap-4 items-center 
        bg-slate-200 dark:bg-dark-regular`}
        >
          <div className="w-32 h-32 rounded-xl">{result.icon}</div>
          <span className="font-bold text-primary text-xl">{result.title}</span>
          <span className="text-center text-light-text-regular dark:text-dark-text-regular">
            {result.description}
          </span>
          <Button
            type="submit"
            primary
            p-3
            onClick={() => {
              navigate(result.button.redirect, { replace: true });
            }}
          >
            <span className="font-bold text-md">{t(result.button.title)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveAccount;
