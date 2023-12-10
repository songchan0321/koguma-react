import { Typography } from "@mui/material";
import Back from "../../component/common/Back";
import { Fragment } from "react";
import Button from "@mui/material/Button";

const AddPostTopBar = () => {
  return (
    <Fragment>
      <Back />
      <Typography
        variant="h6"
        color="secondary"
        component="h2"
        sx={{ textAlign: "center", mb: 1.5 }}
      >
        <i>동네생활 글쓰기</i>

        <Button
          style={{
            position: "absolute",
            right: "5px",
            variant: "h8",
            color: "ThreeDShadow",
          }}
          variant="text"
        >
          완료
        </Button>
      </Typography>
    </Fragment>
  );
};

export default AddPostTopBar;
