import { Box, Button, Fab, Grid, TextField } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState, useEffect } from "react";
import { addCommentAPI, addPostAPI } from "../../apis/api/community";
import { useParams } from "react-router-dom";

const AddComment = () => {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    writerId: 0,
    postId: postId,
    content: "",
    activeFlag: true,
    parentId: null,
  });

  const handleSubmit = async (event) => {
    try {
      const { data } = await addCommentAPI(
        formData.postId,
        formData.writerId,
        formData.content,
        formData.activeFlag,
        formData.parentId
      );
      console.log(data);

      // 입력창 초기화
      setFormData({
        writerId: 0,
        postId: postId,
        content: "",
        activeFlag: true,
        parentId: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // useEffect를 사용하여 완료 버튼 클릭 후 입력창 초기화
  useEffect(() => {
    // 여기에 원하는 조건을 추가하여 입력창 초기화가 필요한 경우에만 실행되도록 설정 가능
    // 예: 특정 상태가 변할 때에만 실행
  }, [formData.content]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={9} sm={9}>
          <TextField
            id="content"
            label="댓글을 입력해보세요"
            variant="standard"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              inputProps: { maxLength: 50 },
            }}
          />
        </Grid>
        <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
          <Fab
            variant="contained"
            color="secondary"
            style={{
              height: "35px", // 조정 가능한 높이
              width: "35px", // 조정 가능한 너비
              borderRadius: "60%", // 동그라미 모양
              aspectRatio: 1, // 너비와 높이를 동일하게 유지하여 완전한 동그라미로 만들기
            }}
            onClick={handleSubmit}
          >
            <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddComment;
