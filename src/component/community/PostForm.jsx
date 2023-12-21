import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Back from "../common/Back";
import { Typography, Grid } from "@mui/material";
import { addPostAPI } from "../../apis/api/community";
import { useNevigate } from "react-router-dom";

const PostForm = ({ text }) => {
  const categorys = [
    "동네소식",
    "동네맛집",
    "동네질문",
    "취미생활",
    "일상",
    "분실/실종",
  ];

  const navigate = useNavigate();

  //Data 양식
  const [formData, setFormData] = useState({
    categoryId: 0,
    categoryName: "",
    title: "",
    content: "",
    latitude: 0,
    longitude: 0,
    postType: true,
    activeFlag: true,
    views: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    //이미지 추가사항 적용해야함

    //Data
    try {
      const { data } = await addPostAPI(formData);
      console.log(data);

      const postId = data.postId;

      // navigate(`/post/get/${postId}`);
    } catch (error) {
      console.error("Error Point : addPostAPI", error);
    }
  };

  const buttons = [
    <Button key="one">
      <InsertPhotoIcon /> 사진
    </Button>,
    <Button key="two">
      <LocationOnIcon /> 장소
    </Button>,
  ];

  return (
    <Fragment>
      <Back />
      <Typography
        variant="h6"
        color="secondary"
        component="h2"
        sx={{ textAlign: "center", mb: 1.5 }}
      >
        <i>동네생활 글쓰기</i>

        <Button
          style={{
            position: "absolute",
            right: "5px",
            variant: "h8",
            color: "ThreeDShadow",
          }}
          variant="text"
          onClick={handleSubmit}
          component={Link}
          to="/post/list"
        >
          완료
        </Button>
      </Typography>
      <Grid item mt={2} xs={5}>
        <FormControl fullWidth>
          <InputLabel id="category">카테고리</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={formData.categoryName || ""}
            label="카테고리"
            onChange={(event) => {
              const selectedCategory = event.target.value;
              const categoryIndex = categorys.indexOf(selectedCategory);
              console.log(
                `Selected Category: ${selectedCategory}, CategoryId: ${
                  categoryIndex + 23
                }`
              );
              setFormData((prevFormData) => ({
                ...prevFormData,
                categoryName: selectedCategory,
                categoryId: categoryIndex + 23,
              }));
            }}
          >
            <MenuItem value="" disabled>
              카테고리 선택
            </MenuItem>
            {categorys.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" }, // width 값을 "100%"로 변경
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="title"
          id="title"
          label="제목을 입력하세요."
          variant="standard"
          value={formData.title}
          onChange={handleChange}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" }, // width 값을 "100%"로 변경
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="content"
          id="content"
          label="궁금한 마을 이야기를 나누어보세요 "
          multiline
          rows={15}
          variant="standard"
          value={formData.content}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start", // 왼쪽으로 정렬되도록 변경
          justifyContent: "flex-end", // 하단으로 정렬되도록 변경
          position: "fixed", // 고정 위치로 변경
          bottom: 0,
          left: 0,
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          color="secondary"
          aria-label="medium secondary button group"
        >
          {buttons}
        </ButtonGroup>
      </Box>
    </Fragment>
  );
};
export default PostForm;
