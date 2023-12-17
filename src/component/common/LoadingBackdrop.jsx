import { Backdrop, Button, CircularProgress } from "@mui/material";

const LoadingBackdrop = ({ open, progress }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {/* <CircularProgress color="inherit" /> */}
        <CircularProgress variant="determinate" value={progress} />
      </Backdrop>
    </div>
  );
};

export default LoadingBackdrop;
