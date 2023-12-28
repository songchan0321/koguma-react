import { Paper, InputBase, Divider, IconButton } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useState } from "react";
import { addCommentAPI } from "../../apis/api/community";
import { useNavigate, useParams } from "react-router-dom";

const AddComment = ({ callList }) => {
  const navigate = useNavigate();
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
      callList();
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

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          height: "60px",
          width: "100%",
          backgroundColor: "#E7E3E3",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, pl: "1rem" }}
          id="content"
          placeholder="댓글을 입력해주세요."
          value={formData.content}
          onChange={handleChange}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
        <IconButton
          disabled={formData.content === ""}
          color="secondary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleSubmit}
        >
          <RateReviewIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default AddComment;
