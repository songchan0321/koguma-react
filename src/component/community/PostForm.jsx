import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Back from "../common/Back";
import { Typography } from "@mui/material";
import { Category } from "@mui/icons-material";

const PostForm = () => {
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.val78890pue);
  };

  const handleComplete = () => {
    console.log("Title : ", title);
    console.log("Content : ", content);
    console.log("Category : ", category);
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
          onClick={handleComplete}
          component={Link}
          to="/post/get"
        >
          완료
        </Button>
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            카테고리를 선택해주세요.
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={handleChange}
          >
            <MenuItem value={23}>동네소식</MenuItem>
            <MenuItem value={24}>동네맛집</MenuItem>
            <MenuItem value={25}>동네질문</MenuItem>
            <MenuItem value={26}>취미생활</MenuItem>
            <MenuItem value={27}>일상</MenuItem>
            <MenuItem value={28}>분실/실종</MenuItem>
          </Select>
        </FormControl>
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
          id="standard-basic"
          label="제목을 입력하세요."
          variant="standard"
          value={title}
          onChange={handleTitleChange}
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
          id="standard-multiline-static"
          label="궁금한 마을 이야기를 나누어보세요 "
          multiline
          rows={15}
          variant="standard"
          value={content}
          onChange={handleContentChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start", // 왼쪽으로 정렬되도록 변경
          justifyContent: "flex-end", // 하단으로 정렬되도록 변경
          position: "fixed", // 고정 위치로 변경
          bottom: 0, // 하단 위치로 변경 => 하단 바 없어지면 0으로 수정할 것
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
