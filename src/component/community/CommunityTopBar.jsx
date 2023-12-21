// TitleWithButton.js

import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Back from "../common/Back";

const CommunityTopBar = ({ title, buttonText, handleSubmit, toPath }) => {
  return (
    <>
      <Back />
      <Typography
        variant="h6"
        color="secondary"
        component="h2"
        sx={{ textAlign: "center", mb: 1.5 }}
      >
        <i>{title}</i>
        <Button
          style={{
            position: "absolute",
            right: "5px",
            variant: "h8",
            color: "ThreeDShadow",
          }}
          variant="text"
          onClick={handleSubmit}
          component={Link}
          to={toPath}
        >
          완료
        </Button>
      </Typography>
    </>
  );
};

export default CommunityTopBar;
