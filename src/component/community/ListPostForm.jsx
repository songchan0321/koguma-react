import PostThumbnail from "./postThumbnail";
import React, { useState } from "react";

function ListPostForm({ postThumbnails }) {
  return (
    <div>
      {postThumbnails.map((postThumbnail) => (
        <PostThumbnail postThumbnail={postThumbnail} />
      ))}
    </div>
  );
}
export default ListPostForm;
