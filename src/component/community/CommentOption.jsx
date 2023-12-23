import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CommentOption = ({ onEdit, onDelete, onReport }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    onEdit();
    handleCloseModal();
  };

  const handleDelete = () => {
    onDelete();
    handleCloseModal();
  };

  const handleReport = () => {
    onReport();
    handleCloseModal();
  };

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <MoreVertIcon />
      </IconButton>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>댓글/답글 관리</DialogTitle>
        <DialogContent>
          <Button onClick={handleEdit} color="secondary">
            수정
          </Button>
          <Button onClick={handleDelete} color="secondary">
            삭제
          </Button>
          <Button onClick={handleReport} color="secondary">
            신고
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentOption;
