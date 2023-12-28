import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { deletePostAPI } from "../../apis/api/community";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

const DetailOption = ({ editTo, deleteTo, reportTo, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { postId } = useParams();

  const handleMoreVertClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = () => {
    console.log("수정 클릭");
    console.log(postId);
    handleModalClose();
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePostAPI({ postId });
      console.log(postId);
    } catch (error) {
      console.error("포스트 삭제 오류:", error);
    } finally {
      handleModalClose();
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleReport = () => {
    console.log("신고 클릭");
    handleModalClose();
  };

  return (
    <Fragment>
      <Button
        sx={{ color: "#000000" }}
        variant="text"
        color="secondary"
        onClick={handleMoreVertClick}
        style={{ position: "fixed", right: 0 }}
      >
        <MoreVertIcon />
      </Button>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{/* 내용 입력 */}</Typography>
          <Button
            onClick={handleEdit}
            color="secondary"
            component={Link}
            to={editTo}
          >
            수정
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            component={Link}
            // to={`/post/list`}
          >
            삭제
          </Button>
          <Button
            onClick={handleReport}
            color="secondary"
            component={Link}
            to={reportTo}
          >
            신고
          </Button>
        </Box>
      </Modal>

      <Dialog open={isDeleteModalOpen} onClose={handleDeleteCancel}>
        <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color="secondary">
            확인
          </Button>
          <Button onClick={handleDeleteCancel} color="secondary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DetailOption;
