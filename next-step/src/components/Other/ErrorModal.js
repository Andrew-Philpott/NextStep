import React, { usestate } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

export const ErrorModal = (props) => {
  const { errors, setErrors } = props;
  const [open, setOpen] = usestate(true);

  const handleClose = () => {
    setOpen(false);
    setErrors(null);
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onclose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{errors && <p>{errors}</p>}</Fade>
      </Modal>
    </React.Fragment>
  );
};
