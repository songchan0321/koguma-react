import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PostTopBar from "../../component/community/PostTopBar";

const ListPost = () => {
  const navigator = useNavigate();

  return (
    <Fragment>
      <div>
        <PostTopBar />
      </div>

      <div style={{ position: "absolute", bottom: "80px", right: "30px" }}>
        <Fab
          variant="contained"
          color="secondary"
          aria-label="add"
          component={Link}
          to="/post/add"
        >
          <AddIcon />
        </Fab>
      </div>
    </Fragment>
  );
};

export default ListPost;
