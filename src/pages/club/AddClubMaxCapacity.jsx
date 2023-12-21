import { Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import TopBarAddClub from "../../component/club/common/TopBarAddClub";
import MarginEmpty from "../../component/payment/MarginEmpty";

const AddClubMaxCapacity = ({ onPrev, onNext, data }) => {
  // const [formData, setFormData] = useState({
  //   categoryId: data.categoryId || "",
  //   title: data.title || "",
  //   content: data.content || "",
  //   urls: data.urls || "",

  //   maxCapacity: data.maxCapacity || 0,
  // });

  const [selectedMaxCapacity, setSelectedMaxCapacity] = useState();
  const maxCapacityList = [10, 20, 30, 40, 50];

  const handleNextClick = () => {
    // 전달할 데이터에 사용자가 선택한 maxCapacity를 추가
    onNext({ maxCapacity: selectedMaxCapacity });
  };
  const handlePrevClick = () => {
    onPrev();
  };

  return (
    <>
      <TopBarAddClub />
      <MarginEmpty value={70} />
      <Typography
        variant="h4"
        style={{ marginTop: "20px", marginLeft: "30px" }}
      >
        모임 규모를 설정해주세요
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingTop: "50px" }}
      >
        {maxCapacityList.map((selected) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={selected}
            sx={{ textAlign: "center", marginTop: "10px" }}
          >
            <Button
              value={selected}
              variant={
                selectedMaxCapacity === selected ? "contained" : "outlined"
              }
              size="large"
              sx={{
                width: "60%",
                height: "80%",
                backgroundColor:
                  selectedMaxCapacity === selected ? "secondary" : "initial",
              }}
              color="secondary"
              onClick={() => setSelectedMaxCapacity(selected)}
            >
              {selected}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Button
          variant="contained"
          color="secondary"
          style={backButtonStyle}
          onClick={handlePrevClick}
        >
          이전
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={nextButtonStyle}
          onClick={handleNextClick}
        >
          다음
        </Button>
      </Paper>
    </>
  );
};

export default AddClubMaxCapacity;

const nextButtonStyle = {
  position: "fixed",

  bottom: 20,
  right: 30, // 변경된 부분
  width: "45%",
  padding: "5px",
  textAlign: "center",
};

const backButtonStyle = {
  position: "fixed",

  bottom: 20,
  left: 40,
  width: "20%",
  padding: "5px",
  textAlign: "center",
};
