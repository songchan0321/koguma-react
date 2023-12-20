import { useEffect, useState } from "react";
import { categoryListAPI } from "../../../apis/api/club";
import { Button, Grid } from "@mui/material";

const AddClubCategory = ({ onCategorySelect, onNext }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCatrogyId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryListAPI();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  return (
    <>
      <div>
        <h1>어떤 모임을 만들까요 ?</h1>{" "}
      </div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {categories.map((category, index) => (
          <Grid item key={index} xs={3} sm={3} md={2}>
            <Button variant="contained" onClick={onNext}>
              {category.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="secondary" disableElevation>
        다음
      </Button>
    </>
  );
};

export default AddClubCategory;
