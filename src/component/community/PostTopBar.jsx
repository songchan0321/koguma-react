import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Badge, Drawer, Paper } from "@mui/material";
import LocationBox from "../location/LocationBox";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchDrawer from "../common/SearchDrawer";
const PostTopBar = ({ location, setLocation }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };
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
    <Paper
      sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
      elevation={3}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <LocationBox
          variant="text"
          location={location}
          setLocation={setLocation}
        />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={handleModalOpen}>
            <MenuOpenIcon sx={{ fontSize: 30 }} color="secondary" />
          </Button>
          {/* 통합 검색 완성 후  Navi */}
          <Button onClick={() => toggleDrawer(true)}>
            <SearchIcon sx={{ fontSize: 30 }} color="secondary" />
          </Button>
          <Button onClick={() => navigate("/alert/list")}>
            <NotificationsNoneIcon sx={{ fontSize: 30 }} color="secondary" />
          </Button>
        </ButtonGroup>

        {/* Modal */}
        <Dialog open={isModalOpen} onClose={handleModalClose}>
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
      </Box>
      <SearchDrawer open={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </Paper>
  );
};

export default PostTopBar;
