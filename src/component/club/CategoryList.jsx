import { useEffect, useState } from "react";
import { categoryListAPI, listClubByCategoryAPI } from "../../apis/api/club";
import { Box, Button } from "@mui/material";
import styled from "styled-components";

const CategoryList = ({ onCategorySelect }) => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(29);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryListAPI();
        console.log(data);
        setCategory(data);
      } catch (err) {
        console.error(`Error Service categories`, err);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (categoryId) => {
    onCategorySelect(categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <CardView position="fixed">
        {category &&
          category.map((item) => (
            <span key={item.id}>
              <Card>
                <Button
                  size="small"
                  variant="contained"
                  color={selectedCategory === item.id ? "secondary" : "primary"}
                  onClick={() => handleButtonClick(item.id)}
                >
                  {item.name}
                </Button>
              </Card>
            </span>
          ))}
      </CardView>
    </div>
  );
};

export default CategoryList;

const CardView = styled.div`
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  margin-right: 10px;
  display: inline-block;
`;
