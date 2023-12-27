import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from "react-router-dom";

const AddReportForm = ({ onSubmit }) => {
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleReportTitleChange = (e) => {
    setReportTitle(e.target.value);
  };

  const handleReportContentChange = (e) => {
    setReportContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // 확인 창 표시
      const confirmed = window.confirm("정말로 등록하시겠습니까?");
      if (!confirmed) {
        // 사용자가 취소한 경우
        return;
      }

      // API 호출
      const response = await authInstance.post(`/member/report/add`, {
        reportTitle,
        reportContent,
        categoryName,
        categoryId: "17",
      });

      console.log("응답 상태 코드:", response.status);
      console.log("응답 내용:", response.data);

      if (response.status === 200) {
        // 신고 추가 성공 시 리스트로 이동
        onSubmit();
        window.alert("신고를 추가했습니다.");
        navigate("/member/report/list"); // 리스트로 이동하도록 수정
      } else {
        window.alert("신고 추가 실패.");
      }
    } catch (error) {
      console.error("신고 추가 중 오류 발생:", error);
      window.alert("신고 추가 중 오류 발생");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        value={reportTitle}
        onChange={handleReportTitleChange}
        sx={{ marginBottom: 2 }}
        color="secondary" // Changing text field color to purple
      />

      <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>카테고리</InputLabel>
        <Select
          value={categoryName}
          onChange={handleCategoryChange}
          label="카테고리"
          color="secondary" // Changing select color to purple
        >
          <MenuItem value="회원">회원</MenuItem>
          <MenuItem value="상품">상품</MenuItem>
          <MenuItem value="모임">모임</MenuItem>
          <MenuItem value="채팅">채팅</MenuItem>
          <MenuItem value="거래">거래</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="내용"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={reportContent}
        onChange={handleReportContentChange}
        sx={{ marginBottom: 2 }}
        color="secondary" // Changing text field color to purple
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ backgroundColor: "#8a2be2" }} // Changing button color to purple
      >
        등록
      </Button>
    </div>
  );
};

export default AddReportForm;
