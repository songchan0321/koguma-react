import React from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Close = ({ url }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(url ? url : -1);
  };

  return (
    <Button
      style={{ position: "fixed", top: "8px", left: "-10px", zIndex: 1002 }}
      onClick={goBack}
    >
      <CloseIcon sx={{ color: "#000000" }} />
    </Button>
  );
};

export default Close;
