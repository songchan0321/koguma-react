import { useState, useRef } from "react";

import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Card";
import { Button } from "@mui/material";
import styled from "styled-components";
import { ReactComponent as Delete } from "../../delete.svg";
import { addImageAPI } from "../../apis/api/common";

const ImageList = ({ images, setImages, imageRegHandler, imageDelHandler }) => {
  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...images];
    // console.log(imageLists);
    imageRegHandler(
      Object.keys(event.target.files).map((key) => event.target.files[key])
    );
    // imageRegHandler(imageLists);
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    console.log(imageUrlLists);
    setImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
    imageDelHandler(id);
  };
  const selectFile = useRef("");

  return (
    <div className="addPicture">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <label
            className="addButton"
            style={{ display: "block" }}
            onChange={handleAddImages}
          >
            <Button onClick={() => selectFile.current.click()}>
              파일 업로드
            </Button>
            <input
              type="file"
              ref={selectFile}
              multiple
              className="addButton"
              style={{ display: "none" }}
            />
          </label>
        </Grid>
        <Grid item xs={9}>
          <CView>
            {images.map((image, id) => (
              <C key={id}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={image}
                    alt={`${image}-${id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Delete
                    onClick={() => handleDeleteImage(id)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
              </C>
            ))}
          </CView>
        </Grid>
      </Grid>
    </div>
  );
};
export default ImageList;

export const CView = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  margin: 0 auto;
  text-align: center;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent; /* 스크롤 막대를 숨김 */
  }
`;

export const C = styled.div`
  width: 20%;
  height: 20%;
  margin-right: 5px;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    // 이미지 비율 유지
  }
`;
