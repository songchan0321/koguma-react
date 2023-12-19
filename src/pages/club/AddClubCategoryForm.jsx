import { useEffect, useState } from "react";
import { categoryListAPI } from "../../apis/api/club";
import { Button, Grid, Paper, Typography } from "@mui/material";

const AddClubCategoryForm = ({ onNext }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(29);

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

  const handleNextClick = () => {
    onNext(selectedCategoryId);
  };
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <Typography
        variant="h4"
        style={{ marginTop: "20px", marginLeft: "30px" }}
      >
        어떤 모임을 만들까요?
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingTop: "50px" }}
      >
        {categories.map((category) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={category.id}
            sx={{ textAlign: "center", marginTop: "10px" }}
          >
            <Button
              value={selectedCategoryId}
              variant="contained"
              size="large"
              sx={{ width: "60%", height: "80%" }}
              color="secondary"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        style={fixedButtonStyle}
        onClick={handleNextClick}
      >
        다음
      </Button>
    </>
  );
};

export default AddClubCategoryForm;

const fixedButtonStyle = {
  position: "fixed",

  bottom: 20,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};
