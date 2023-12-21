import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { listClubPostCategories } from "../../../apis/api/club";

export default function SwipeableBottomDrawer({
  clubId,
  onSelectCategory,
  clubMember,
}) {
  const [state, setState] = useState({
    bottom: true,
  });

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
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer("bottom", false)}
      onKeyDown={toggleDrawer("bottom", false)}
    >
      <List>
        {/* Fetch and render club post categories */}
        {categories.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(category.id)}>
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
        <Button onClick={toggleDrawer("bottom", true)}>{list}</Button>
        <SwipeableDrawer
          anchor="bottom"
          open={state.bottom}
          onClose={toggleDrawer("bottom", false)}
          onOpen={toggleDrawer("bottom", true)}
        >
          {list}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
