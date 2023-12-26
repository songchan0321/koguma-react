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

const ModalState = () => {
  const {
    isModalOpen,
    modalMessage,
    successHandler,
    modalSuccess,
    closeModal,
  } = useModal();
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

        <DialogActions
          sx={{ pt: 0, display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0, 0.2)",
              color: "black",
              width: "90%",
            }}
            onClick={closeModal}
          >
            취소
          </Button>
        </DialogActions>
        <DialogActions
          sx={{
            pt: 0,
            pb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            // fullWidth
            sx={{ width: "90%" }}
            color="error"
            onClick={successHandler}
          >
            바꾸기
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ModalState;
