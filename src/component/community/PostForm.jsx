import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Back from "../common/Back";
import { Typography, Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addPostAPI } from "../../apis/api/community";
import { uploadImageAPI } from "../../apis/api/common";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
  const imageRegHandler = (images) => {
    setFormData((prev) => ({ ...prev, thumbnail: images }));
  };
  const imageDelHandler = (id) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((_, index) => index !== id),
    }));
  };

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
    thumbnail: [], // Updated to include thumbnail property
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const imageList = new FormData();
    imageList.append("file", files[0]); // Assuming you only handle one file for simplicity

    try {
      const imageUrlList = await uploadImageAPI(imageList);
      setFormData((prevFormData) => ({
        ...prevFormData,
        thumbnail: imageUrlList,
      }));
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await addPostAPI(formData);
      console.log(data);

      const postId = data.postId;
      navigate(`/post/list`, { replace: true });
    } catch (error) {
      console.error("Error during post submission:", error);
    }
  };

  // const buttons = [
  //   <Button component="label" htmlFor="fileInput" key="one">
  //     <InsertPhotoIcon /> 사진
  //     <input
  //       type="file"
  //       id="fileInput"
  //       accept="image/*"
  //       style={{ display: "none" }}
  //       onChange={handleFileChange}
  //     />
  //   </Button>,
    // <Button key="two">
    //   <LocationOnIcon /> 장소
    // </Button>,
  // ];

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
      <TextField
        name="title"
        id="title"
        label="제목을 입력하세요."
        variant="standard"
        value={formData.title}
        onChange={handleChange}
        sx={{ width: "100%" }} // 좌우로 꽉 차게 설정
      />
      <br />
      <TextField
        name="content"
        id="content"
        label="궁금한 마을 이야기를 나누어보세요 "
        multiline
        rows={15}
        variant="standard"
        value={formData.content}
        onChange={handleChange}
        sx={{ width: "100%" }} // 좌우로 꽉 차게 설정
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          position: "fixed",
          bottom: 0,
          left: 0,
          "& > *": {
            m: 1,
          },
        }}
      >
        {/* <ButtonGroup
          color="secondary"
          aria-label="medium secondary button group"
        >
          {buttons}
        </ButtonGroup> */}
      </Box>
      {/* <ImageList
        images={images}
        setImages={setImages}
        imageRegHandler={imageRegHandler}
        imageDelHandler={imageDelHandler}
      /> */}
    </Fragment>
  );
};

export default PostForm;
