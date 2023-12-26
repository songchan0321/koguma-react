import * as React from "react";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";

const AddFloatingButton = ({ arrival }) => {
  return (
    <div style={{ position: "fixed", bottom: "80px", right: "30px" }}>
      <Fab
        variant="contained"
        // color="secondary"
        aria-label="add"
        component={Link}
        to={arrival}
        sx={{ backgroundColor: "#D070FB", color: "white" }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
export default AddFloatingButton;
