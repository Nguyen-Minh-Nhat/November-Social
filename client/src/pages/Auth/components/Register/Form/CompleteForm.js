import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import TickIcon from "../../../../../assets/icons/TickIcon";
import Button from "../../../../../components/Button";

const CompleteForm = (props) => {
  const { t } = useTranslation();
  return (
    <div className="h-[444.56px] flex flex-col gap-6">
      <div
        className="p-4 flex-1 flex flex-col gap-4 justify-center items-center 
        rounded-xl bg-slate-200 dark:bg-dark-regular"
      >
        <div className="w-36 h-36 p-4 rounded-xl">
          <TickIcon />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <span className="font-bold text-primary-bold dark:text-primary">
            {t("Congrats, you successfully created your account")}.
          </span>
          <p className="text-light-text-regular dark:text-dark-text-regular">
            {" "}
            {t(
              "We just sent you a confirmation email. Please confirm your account within 24 hours",
            )}
            .
          </p>
        </motion.div>
      </div>
      <div className="relative w-full flex justify-center text-[14px]">
        <div className="h-[0.1px] bg-primary/30 absolute top-1/2 z-0 left-0 w-full"></div>
        <span
          className="p-2 z-10 bg-white
          text-text-color-primary/80 dark:bg-dark-very-light dark:text-dark-text-regular"
        >
          {t("Completed")}
        </span>
      </div>
      <Button type="submit" primary large>
        <span className="font-bold capitalize">{t("go to login")}</span>
      </Button>
    </div>
  );
};

CompleteForm.propTypes = {};

export default CompleteForm;
