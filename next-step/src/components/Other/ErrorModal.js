import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

export const ErrorModal = (props) => {
  const { exception, setException } = props;
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setException(null);
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{exception && <p>{exception.toString()}</p>}</Fade>
      </Modal>
    </React.Fragment>
  );
};
