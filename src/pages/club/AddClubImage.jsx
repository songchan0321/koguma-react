import React, { useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { uploadImageAPI } from "../../apis/api/common";

const AddClubImage = ({ onPrev, onNext, data }) => {
  const [formData, setFormData] = useState({
    categoryId: data.categoryId || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    title: data.title || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    content: data.content || "", // 기존 데이터가 있으면 사용, 없으면 빈 문자열
    urls: data.urls || "",
  });
  const [selectedFile, setSelectedFile] = useState([]);

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
        setFormData((prevData) => ({ ...prevData, urls: response }));
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    } else {
      console.warn("이미지를 선택하세요.");
    }
  };

  const handlePrevClick = () => {
    onPrev();
  };

  const handleNextClick = () => {
    const urls = selectedFile;
    onNext({ urls });
  };

  return (
    <>
      <Typography
        variant="h4"
        style={{ marginTop: "20px", marginLeft: "30px" }}
      >
        모임 대표 이미지 업로드
      </Typography>
      <Container style={{ marginTop: "30px", marginLeft: "20px" }}>
        <input type="file" onChange={handleUpload} />
      </Container>
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

export default AddClubImage;

const nextButtonStyle = {
  position: "fixed",
  bottom: 20,
  right: 30,
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
