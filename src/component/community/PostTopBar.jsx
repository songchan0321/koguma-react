import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../payment/TopBar";
const PostTopBar = ({ location, setLocation }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = [
    { id: "view", name: "인기글" },
    { id: 23, name: "동네소식" },
    { id: 24, name: "동네맛집" },
    { id: 25, name: "동네질문" },
    { id: 26, name: "취미생활" },
    { id: 27, name: "일상" },
    { id: 28, name: "분실/실종" },
  ];
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCategorySelect = (selectedCategoryId) => {
    console.log(selectedCategoryId);
    // useNavigate를 사용하여 페이지 이동
    navigate(`/post/list/category/${selectedCategoryId.id}`);
  };

  return (
    <>
      <TopBar>동네생활</TopBar>
      <div style={{ position: "fixed", top: "0.5rem", right: 0, zIndex: 1100 }}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={handleModalOpen}>
            <MenuOpenIcon sx={{ fontSize: 30, color: "black" }} />
          </Button>
        </ButtonGroup>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        PaperProps={{
          sx: { p: "0rem 1.5rem 0.8rem 1.5rem", borderRadius: "1rem" },
        }}
      >
        <DialogTitle>카테고리 선택</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
              </MenuItem>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostTopBar;
