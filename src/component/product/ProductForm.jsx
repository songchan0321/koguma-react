import * as React from "react";
import { useState } from "react";

import {
  Button,
  CssBaseline,
  Backdrop,
  Box,
  Grid,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  createTheme,
  ThemeProvider,
  InputAdornment,
  Alert,
} from "@mui/material";

import ImageList from "../common/ImageList";
import { uploadImageAPI } from "../../apis/api/common";
import { addProductAPI } from "../../apis/api/Product";
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../common/LoadingProgress";
import { useModal } from "../../context/ModalContext";
import Modal from "../common/Modal";
import MarginEmpty from "../payment/MarginEmpty";

const ProductForm = ({ text }) => {
  const categorys = [
    "디지털 기기",
    "인테리어",
    "유아",
    "의류",
    "생활가전",
    "주방용품",
    "가공식품",
    "스포츠",
    "게임",
    "뷰티",
    "식물",
    "반려용품",
    "티켓",
    "도서",
    "유아도서",
    "기타",
  ];
  const defaultTheme = createTheme();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openModal } = useModal();
  const navigate = useNavigate();

  const [formattedPrice, setFormattedPrice] = useState(""); // 가격 표시용
  const [numericPrice, setNumericPrice] = useState(null); // 실제 가격

  const handlePriceChange = (event) => {
    let inputValue = event.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(inputValue, 10);

    // 콤마로 포맷된 문자열 생성
    const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormattedPrice(formattedValue);

    // 숫자 값으로 상태 업데이트
    setNumericPrice(numericValue);

    // 업데이트된 numericValue를 사용하여 formData.price를 설정
    setFormData((prevFormData) => ({
      ...prevFormData,
      price: numericValue,
    }));
  };
  const imageRegHandler = (images) => {
    setFormData((prev) => ({ ...prev, thumbnail: images }));
  };
  const imageDelHandler = (id) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((_, index) => index !== id),
    }));
  };
  const [formData, setFormData] = useState({
    title: "",
    categoryName: "",
    categoryId: 0,
    price: 0,
    content: "",
    thumbnail: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(formData);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "content") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        content: value,
      }));
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const imageUrlParse = (imageList) => {
    return uploadImageAPI(imageList);
  };
  const addProduct = async (productDTO) => {
    try {
      const response = await addProductAPI(productDTO);
      openModal("상품등록 성공", true, () => {
        console.log("모달 나옴");
        navigate(`/product/get/${response.data.id}`, { replace: true });
      });

      console.log(response);
    } catch (err) {
      openModal("상품등록 실패", false, () => {});
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadProduct = async () => {
    try {
      if (!formData.thumbnail || formData.thumbnail.length === 0) {
        openModal("이미지를 등록해주세요", false, () => {});
        return;
      }

      const imageList = new FormData();
      formData.thumbnail.forEach((el) => {
        imageList.append("file", el);
      });

      const imageUrlList = await imageUrlParse(imageList);

      const productDTO = {
        ...formData,
        images: imageUrlList,
      };

      await addProduct(productDTO);
    } catch (error) {
      console.error("Error during product upload:", error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingProgress />
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Modal />
          <Alert
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
              borderRadius: "0.5rem",
              top: "7rem",
              width: "16rem",
              fontSize: "1rem",
            }}
            severity="info"
          >
            가품 및 판매금지품목은
            <br /> 게시가 제한될 수 있어요.
          </Alert>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            ></Backdrop>
            <MarginEmpty value={"12rem"} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // height: "100vh",
              }}
            >
              {/* <br /> */}

              <ImageList
                images={images}
                setImages={setImages}
                imageRegHandler={imageRegHandler}
                imageDelHandler={imageDelHandler}
              />

              <Box noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item xs={7}>
                    <TextField
                      margin="normal"
                      required
                      id="title"
                      label="상품 이름"
                      name="title"
                      autoComplete="title"
                      onChange={handleChange}
                      autoFocus
                      fullWidth
                    />
                  </Grid>

                  <Grid item mt={2} xs={5}>
                    <FormControl sx={{ width: 140 }}>
                      <InputLabel id="category">카테고리</InputLabel>
                      <Select
                        labelId="category"
                        id="category"
                        value={formData.categoryName || ""}
                        label="카테고리"
                        onChange={(event) => {
                          const selectedCategory = event.target.value;
                          const categoryIndex =
                            categorys.indexOf(selectedCategory);
                          console.log(
                            `Selected Category: ${selectedCategory}, Category Number: ${
                              categoryIndex + 1
                            }`
                          );
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            categoryName: selectedCategory,
                            categoryId: categoryIndex + 1,
                          }));
                        }}
                        MenuProps={MenuProps}
                      >
                        <MenuItem value="" disabled>
                          카테고리 선택
                        </MenuItem>
                        {categorys.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  name="price"
                  type="text"
                  label="제안 가격"
                  value={formattedPrice}
                  onChange={handlePriceChange}
                  autoComplete="price"
                  InputProps={{
                    inputProps: {
                      maxLength: 7, // 10자리의 숫자 + 3자리의 콤마
                    },
                    endAdornment: (
                      <InputAdornment position="end">원</InputAdornment>
                    ),
                  }}
                />

                <Grid mt={2}>
                  <TextField
                    label="상품 내용"
                    name="content"
                    value={formData.content}
                    multiline
                    fullWidth
                    rows={4}
                    onChange={handleChange}
                  />
                </Grid>
                <Button
                  onClick={() => uploadProduct()}
                  fullWidth
                  // color="secondary"

                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#D070FB" }}
                >
                  {text}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default ProductForm;
