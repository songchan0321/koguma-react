import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button style={{ position: "absolute", left: "10" }} onClick={goBack}>
      <ArrowBackIosNewIcon color="secondary" />
    </Button>
  );
};

export default Back;
