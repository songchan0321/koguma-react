import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { listClubPostCategories } from "../../../apis/api/club";
import { Typography } from "@mui/material";

export default function SwipeableBottomDrawer({
  clubId,
  onSelectCategory,
  clubMember,
  selectedCategory,
}) {
  const [state, setState] = useState({
    bottom: true,
  });

  console.log(selectedCategory);

  const [categories, setCategories] = useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleCategoryClick = (categoryId) => {
    // Pass the selected category ID to the parent component
    onSelectCategory(categoryId);

    // Close the drawer after selecting a category
    setState({ ...state, bottom: false });
  };

  const list = (
    <Box
      sx={{
        width: "auto",
        borderRadius: "10px", // 테두리를 둥글게 만드는 속성
        overflow: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer("bottom", false)}
      onKeyDown={toggleDrawer("bottom", false)}
    >
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(category)}>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubPostCategories(clubId);
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  return (
    <div>
      <React.Fragment key="bottom">
        {/* 아이콘을 포함하는 Typography */}
        <Typography
          onClick={toggleDrawer("bottom", true)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "10px", // 내용을 좌우로 공간 배분
          }}
        >
          {selectedCategory.name}
          <ArrowForwardIosIcon sx={{ marginRight: "20px" }} />{" "}
          {/* 오른쪽 여백 추가 */}
        </Typography>
        <SwipeableDrawer
          sx={{
            width: "auto",
            borderRadius: "10px", // 테두리를 둥글게 만드는 속성
            overflow: "hidden",
          }}
          anchor="bottom"
          open={state.bottom}
          onClose={toggleDrawer("bottom", false)}
          onOpen={toggleDrawer("bottom", true)}
        >
          <Typography
            variant="h6"
            style={{ marginLeft: "10px", marginTop: "10px" }}
          >
            게시글 주제를 선택해주세요 !
          </Typography>
          {list}
        </SwipeableDrawer>
      </React.Fragment>
      <></>
    </div>
  );
}
