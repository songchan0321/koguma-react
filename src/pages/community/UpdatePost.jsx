import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Typography, Grid } from "@mui/material";
import { updatePostAPI } from "../../apis/api/community";
import Back from "../../component/common/Back";

const UpdatePost = () => {
  const categorys = [
    "동네소식",
    "동네맛집",
    "동네질문",
    "취미생활",
    "일상",
    "분실/실종",
  ];
  const { postId } = useParams();
  const navigate = useNavigate();

  // Data 양식
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      const { data } = await updatePostAPI(postId, formData);
      const updatedPostId = data.postId;
      navigate(`/post/${updatedPostId}`);
    } catch (error) {
      console.error("Error Point: updatePostAPI", error);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await updatePostAPI(postId);
        setFormData({
          categoryName: postData.categoryName,
          title: postData.title,
          content: postData.content,
          latitude: postData.latitude,
          longitude: postData.longitude,
          views: postData.views,
        });
        console.log(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <Fragment>
      <Back />
      <Typography
        variant="h6"
        color="secondary"
        component="h2"
        sx={{ textAlign: "center", mb: 1.5 }}
      >
        <i>게시글 수정</i>

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
          to={`/post/${postId}`}
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
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
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
          "& > :not(style)": { m: 1, width: "100%" },
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

export default UpdatePost;
