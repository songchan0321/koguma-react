import React, { useState } from "react";

function PostThumbnail({ post }) {
  return (
    <div>
      <span>{post.categoryName}</span>
      <span>{post.title}</span>
      <span>{post.content}</span>
      {/* <span>{post.repImage}</span> */}
      {/* <span>{post.timestamp}</span> */}
      <span>{post.likeCount}</span>
      <span>{post.commentCount}</span>
    </div>
  );
}
export default PostThumbnail;
