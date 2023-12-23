import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Fab, Grid, TextField, Collapse } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddIcon from "@mui/icons-material/Add";
import { addCommentAPI } from "../../apis/api/community"; // 수정: addReplyAPI 대신 addCommentAPI를 import

const AddReply = ({ commentId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    writerId: 0,
    postId: postId,
    content: "",
    activeFlag: true,
    parentId: commentId,
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
    } catch (err) {
      console.error(err);
    }

    // 드랍다운 닫기
    setDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={9} sm={9}>
          <Collapse in={isDropdownOpen}>
            <TextField
              id="content"
              label="답글을 입력해보세요"
              variant="standard"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              InputProps={{
                disableUnderline: true,
                inputProps: { maxLength: 50 },
              }}
            />
          </Collapse>
        </Grid>
        <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
          <Fab
            variant="contained"
            color="secondary"
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "50%",
              aspectRatio: 1,
            }}
            onClick={isDropdownOpen ? handleSubmit : handleDropdownToggle}
          >
            {isDropdownOpen ? (
              <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
            ) : (
              <AddIcon />
            )}
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddReply;
