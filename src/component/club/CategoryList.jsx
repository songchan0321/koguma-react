import { useEffect, useState } from "react";
import { categoryListAPI } from "../../apis/api/club";
import { Tabs, Tab, Box, Button, Typography } from "@mui/material";
import styled from "styled-components";

const CategoryList = ({ onCategorySelect }) => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(29);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryListAPI();
        setCategory(data);
        console.log(data);
        onCategorySelect(29);
        setSelectedCategory(29);
      } catch (err) {
        console.error(`Error Service categories`, err);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    onCategorySelect(newValue);
    setSelectedCategory(newValue);
  };

  return (
    <div>
      <Typography variant="h5">우리 동네 모임</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedCategory}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="category tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {category &&
            category.map((item) => (
              <Tab key={item.id} label={item.name} value={item.id} />
            ))}
        </Tabs>
      </Box>
    </div>
  );
};

export default CategoryList;

// Rest of the styled components
