import React, { useEffect, useState } from "react";
import {
  addClubPost,
  getClubAPI,
  listClubPostCategories,
} from "../../../apis/api/club";
import { useLocation } from "react-router-dom";
import AddPostCategoryModal from "../../../component/club/board/AddPostCategoryModal";
import TopBarAddClubPost from "../../../component/club/common/TopBarAddClubPost";
import MarginEmpty from "../../../component/payment/MarginEmpty";
import {
  Button,
  Card,
  CardMedia,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImageAPI } from "../../../apis/api/common";

const AddClubPost = () => {
  const location = useLocation();
  const clubId = location.state.clubId;
  const clubMember = location.state.clubMember;

  const [title, setTitle] = useState("제목을 입력하세요");
  const [content, setContent] = useState("내용을 입력하세요");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("카테고리를 설정해주세요");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [club, setClub] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubPostCategories(clubId);
        setCategories(data);
        const clubData = await getClubAPI(clubId);
        setClub(clubData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const [selectedFile, setSelectedFile] = useState([""]);

  const handleUpload = async (event) => {
    const imageList = new FormData();
    Object.keys(event.target.files).forEach((key) => {
      imageList.append("file", event.target.files[key]);
    });

    if (imageList) {
      try {
        const response = await uploadImageAPI(imageList);
        console.log(response);
        setSelectedFile(response);
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    } else {
      console.warn("이미지를 선택하세요.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 데이터 생성
    const formData = { title, content };

    // 서버로 데이터 전송
    try {
      setIsSubmitting(true);
      const response = await addClubPost(clubId, formData, selectedCategory);

      // 성공적으로 작성된 경우에 대한 처리
      console.log("게시글이 성공적으로 작성되었습니다.", response.data);

      // 폼 초기화 또는 닫기 등의 작업 수행
      setTitle("제목을 입력하세요");
      setContent("내용을 입력하세요");
    } catch (error) {
      // 작성 실패 시 에러 처리
      console.error("게시글 작성 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTitleFocus = () => {
    if (title === "제목을 입력하세요") {
      setTitle("");
    }
  };

  const handleContentFocus = () => {
    if (content === "내용을 입력하세요") {
      setContent("");
    }
  };

  return (
    <>
      <TopBarAddClubPost>{club.title}</TopBarAddClubPost>
      <MarginEmpty />

      <div>
        <div>
          <AddPostCategoryModal
            clubId={clubId}
            onSelectCategory={handleCategoryChange}
            clubMember={clubMember}
          />
        </div>
      </div>
      <Divider />
      <br />
      <Paper style={{ marginLeft: "20px" }} elevation={0}>
        <div>
          <TextField
            label="제목"
            variant="standard"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            onFocus={handleTitleFocus}
            InputProps={{
              disableUnderline: true,
              style: { borderBottom: "1px solid white" },
            }}
          />
        </div>
        <br />
        <Divider />
        <TextField
          label="내용"
          variant="standard"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={handleContentChange}
          onFocus={handleContentFocus}
          InputProps={{
            disableUnderline: true,
            style: { borderBottom: "5px solid white" },
          }}
        />
      </Paper>
      <Paper elevation={0}>
        <div>
          {selectedFile && (
            <Card style={{ maxWidth: 345, margin: "20px 0" }}>
              <CardMedia
                component="img"
                image={selectedFile}
                style={{ width: "100%" }} // 이미지를 Card 폭에 맞게 조절
              />
            </Card>
          )}
        </div>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onChange={handleUpload}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Paper>
      <div>
        <Button
          style={fixedButtonStyle}
          //   disabled={nextStep && !activeSubmit}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </div>
    </>
  );
};

export default AddClubPost;

const fixedButtonStyle = {
  position: "fixed",
  bottom: 10,
  left: 20,
  width: "90%",
  padding: "5px",
  textAlign: "center",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
