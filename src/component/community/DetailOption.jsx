import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const DetailOption = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreVertClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    // Edit logic here
    console.log("Edit clicked");
    handleModalClose();
  };

  const handleDelete = () => {
    // Delete logic here
    console.log("Delete clicked");
    handleModalClose();
  };

  const handleReport = () => {
    // Report logic here
    console.log("Report clicked");
    handleModalClose();
  };

  return (
    <Fragment>
      <Button variant="text" color="secondary" onClick={handleMoreVertClick}>
        <MoreVertIcon />
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            게시물 옵션
          </Typography>

          <Button
            variant="contained"
            onClick={handleEdit}
            color="secondary"
            component={Link}
            to="/post/update"
          >
            수정
          </Button>

          <Button
            variant="contained"
            onClick={handleDelete}
            color="secondary"
            component={Link}
            to="/post/delete"
          >
            삭제
          </Button>

          <Button
            variant="contained"
            onClick={handleReport}
            color="secondary"
            component={Link}
            to="/common/" //신고로 Navigation 연결
          >
            신고
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
};
export default DetailOption;
