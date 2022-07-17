import React, { useState } from "react";
import Box from "../Box";
import Button from "../Button";
import LoadingOverlay from "../LoadingOverlay";
import Modal from "../Modal";

const ConfirmBox = ({
  show,
  setShow,
  onConfirm,
  header,
  content,
  buttonText,
}) => {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };
  return (
    <Modal show={show} setShow={setShow}>
      <Box header={header}>
        <div className="p-4 dark:text-dark-text-regular">
          {content}
          <div className="flex justify-end mt-6 items-center gap-4 ">
            <Button
              small
              className="bg-transparent shadow-none dark:hover:bg-dark-very-light"
              onClick={() => setShow(false)}
            >
              <span className="text-primary">Cancel</span>
            </Button>
            <Button small primary onClick={handleConfirm}>
              {buttonText}
            </Button>
          </div>
        </div>
        {loading && <LoadingOverlay />}
      </Box>
    </Modal>
  );
};

export default ConfirmBox;
