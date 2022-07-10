import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RegisterForm from "./Form";

const Register = () => {
  const { t } = useTranslation();
  return (
    <div
      className="min-h-[460px] w-[460px] min-w-100%  
      flex flex-col gap-4 "
    >
      <div
        className="mb-4 font-bold text-[36px] capitalize 
      text-light-text-bold dark:text-dark-text-bold "
      >
        {t("register")}
        <span className="text-primary"> {process.env.REACT_APP_NAME}</span>
      </div>
      <RegisterForm />
      <div className="text-left text-[16px]">
        <span className="text-light-text-bold dark:text-dark-text-light">
          {t("Already have an account")}?{" "}
          <Link to={"/login"} className="font-bold text-primary cursor-pointer">
            {t("Login")}!!!
          </Link>
        </span>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
