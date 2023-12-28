// AddMemberComplete.jsx

import React from "react";
import { Box, Button } from "@mui/material";

const AddMemberCompleteForm = ({ navigate }) => {
  const handleNavigate = (url) => {
    navigate(url);
  };
  return (
    <Box>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => handleNavigate("/common/login")}
        style={{ marginTop: 200, backgroundColor: "#D070FB" }}
      >
        로그인
      </Button>
    </Box>
  );
};

export default AddMemberCompleteForm;
