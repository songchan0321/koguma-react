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
    <Button
      style={{ position: "fixed", top: "8px", left: "-10px", zIndex: 10000 }}
      onClick={goBack}
    >
      <ArrowBackIosNewIcon sx={{ color: "#000000" }} />
    </Button>
  );
};

export default Back;
