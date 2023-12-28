import React, { useEffect, useState } from "react";
import { getCommentCountsAPI } from "../../apis/api/community";
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
  return (
    commentCount > 0 && (
      <span style={{ display: "inline-block", paddingRight: "1rem" }}>
        <ChatBubbleOutlineIcon sx={{ fontSize: "1rem" }} />{" "}
        <span style={{ fontSize: "0.8rem" }}>{commentCount}</span>
      </span>
    )
  );
};

export default CommentCounts;
