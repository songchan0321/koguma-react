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
import { Navigate, useNavigate } from "react-router-dom";
import SearchDrawer from "../common/SearchDrawer";
const ProductTopBar = ({ location, setLocation }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };
  const categorys = [
    "디지털 기기",
    "인테리어",
    "유아",
    "의류",
    "생활가전",
    "주방용품",
    "가공식품",
    "스포츠",
    "게임",
    "뷰티",
    "식물",
    "반려용품",
    "티켓",
    "도서",
    "유아도서",
    "기타",
  ];

  // !location && navigate("/common/location", { state: { init: true } });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
        {/* {location && (
          <LocationBox
            variant="text"
            location={location}
            setLocation={setLocation}
          />
        )} */}
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
          <DialogContent sx={{ overflowY: "auto", maxHeight: "300px" }}>
            <DialogContentText>
              {categorys.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
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

export default ProductTopBar;
