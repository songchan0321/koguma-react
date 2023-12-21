import React, { useEffect, useState } from "react";
import { addClubPost, listClubPostCategories } from "../../../apis/api/club";
import { useLocation } from "react-router-dom";
import AddPostCategoryModal from "../../../component/club/board/AddPostCategoryModal";
import TopBarAddClubPost from "../../../component/club/common/TopBarAddClubPost";
import MarginEmpty from "../../../component/payment/MarginEmpty";
import { Divider, Paper, TextField } from "@mui/material";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listClubPostCategories(clubId);
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [clubId]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 데이터 생성
    const formData = { title, content };

    // 서버로 데이터 전송
    try {
      setIsSubmitting(true);
      const response = await addClubPost(clubId, formData);

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
      <TopBarAddClubPost></TopBarAddClubPost>
      <MarginEmpty />

      <Paper style={{ marginLeft: "10px" }} elevation={0}>
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
            style: { borderBottom: "1px solid white" },
          }}
        />
      </Paper>
    </>
  );
};

export default AddClubPost;
