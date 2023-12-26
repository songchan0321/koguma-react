import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ModalAddCategory = ({ isOpen, onClose, onConfirm }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleConfirm = () => {
    onConfirm(categoryName);
    setCategoryName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>카테고리 추가</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="카테고리 이름"
          type="text"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button color="secondary" onClick={handleConfirm}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddCategory;
