import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Back from "../common/Back";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addPostAPI } from "../../apis/api/community";
import { uploadImageAPI } from "../../apis/api/common";
import TopBar from "../payment/TopBar";
import MarginEmpty from "../payment/MarginEmpty";
import ImageList from "../common/ImageList";

const PostForm = ({ text }) => {
  const categorys = [
    "동네소식",
    "동네맛집",
    "동네질문",
    "취미생활",
    "일상",
    "분실/실종",
  ];
  const [images, setImages] = useState([]);

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

  const imageUrlParse = (imageList) => {
    return uploadImageAPI(imageList);
  };
  const handleSubmit = async () => {
    try {
      const imageList = new FormData();
      formData.thumbnail.forEach((el) => {
        imageList.append("file", el);
      });

      const imageUrlList = await imageUrlParse(imageList);

      const postData = {
        ...formData,
        images: imageUrlList,
      };
      const { data } = await addPostAPI(postData);
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
      <TopBar>동네생활 글쓰기</TopBar>
      <MarginEmpty value={"75px"} />
      <div style={{ position: "fixed", top: "0.5rem", right: 0, zIndex: 1002 }}>
        {/* <i>동네생활 글쓰기</i> */}
        <Button
          variant="text"
          onClick={handleSubmit}
          component={Link}
          to="/post/list"
        >
          완료
        </Button>
      </div>
      <Grid sx={{ m: "0 2rem" }}>
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
        placeholder="제목을 입력하세요."
        // label="제목을 입력하세요."
        // variant="standard"
        value={formData.title}
        onChange={handleChange}
        sx={{ p: "2rem 2rem 0rem 2rem", width: "100%" }} // 좌우로 꽉 차게 설정
      />
      <br />
      <ImageList
        images={images}
        setImages={setImages}
        imageRegHandler={imageRegHandler}
        imageDelHandler={imageDelHandler}
      />
      <TextField
        name="content"
        id="content"
        placeholder="궁금한 마을 이야기를 나누어보세요."
        // label="궁금한 마을 이야기를 나누어보세요."
        multiline
        rows={15}
        // variant="standard"
        value={formData.content}
        onChange={handleChange}
        sx={{ width: "100%", p: "2rem 2rem" }} // 좌우로 꽉 차게 설정
      />
    </Fragment>
  );
};

export default PostForm;
