import React, { useEffect, useState } from "react";
import { getCommentCountsAPI } from "../../apis/api/community";
import { Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const CommentCounts = ({ postId }) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const count = await getCommentCountsAPI(postId);
        setCommentCount(count);
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    fetchCommentCount();
  }, [postId]);

  // Conditionally render based on commentCount
  return commentCount > 0 ? (
    <Typography variant="body2" color="text.secondary">
      <ChatBubbleOutlineIcon /> {commentCount}
    </Typography>
  ) : null;
};

export default CommentCounts;
