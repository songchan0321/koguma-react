import { Fragment, forwardRef } from "react";
import { useModal } from "../../context/ModalContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = () => {
  const { isModalOpen, modalMessage, modalSuccess, closeModal } = useModal();
  return (
    <Fragment>
      <Dialog
        open={isModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ pt: "1rem", color: modalSuccess ? "black" : "red" }}>
          {modalSuccess ? "알림" : "경고"}
        </DialogTitle>
        <DialogContent sx={{ width: "18rem" }}>
          <DialogContentText id="alert-dialog-slide-description">
            {modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: "0.7rem" }}>
          {/* <Button onClick={closeModal}>Disagree</Button> */}
          <Button
            variant="contained"
            onClick={closeModal}
            fullWidth
            sx={{
              backgroundColor: "#D070FB",
              "&:hover": {
                backgroundColor: "#D070FB", // hover 효과 시 변경할 배경색
              },
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
