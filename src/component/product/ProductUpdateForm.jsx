import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  CssBaseline,
  Backdrop,
  Box,
  Grid,
  Typography,
  Container,
  FormControlLabel,
  FormControl,
  CardMedia,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  TextField,
  createTheme,
  ThemeProvider,
  InputAdornment,
} from "@mui/material";

import { formatMoney } from "../../apis/services/product";
import ImageList from "../common/ImageList";
import { addImageAPI, uploadImageAPI } from "../../apis/api/common";
import {
  addProductAPI,
  getProductAPI,
  updateProductAPI,
} from "../../apis/api/Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { set } from "date-fns";

const ProductUpdateForm = () => {
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
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const { productId } = useParams();
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
    console.log(formData.thumbnail);
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
  const initializePrices = (initialPrice) => {
    const initialFormattedPrice = formatMoney(initialPrice);

    setNumericPrice(initialPrice);
    setFormattedPrice(initialFormattedPrice);
  };
  const getProductData = async () => {
    try {
      const productData = await getProductAPI(productId);
      setProduct(productData);

      const imageUrls = productData.imageDTO.map((image) => image.url);
      setImages(imageUrls);

      setFormData({
        title: productData.title,
        categoryName: productData.categoryName,
        categoryId: productData.categoryId,
        price: productData.price,
        content: productData.content,
        thumbnail: imageUrls,
      });
      initializePrices(productData.price || 0);
    } catch (error) {
      console.error("Error fetching product:", error);
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
  const imageUrlParse = async (imageList) => {
    try {
      const imageUrlList = await uploadImageAPI(imageList);
      return imageUrlList;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };
  const addProductRequest = async (productDTO) => {
    try {
      const response = await addProductAPI(productDTO);
      navigate(`/product/get/${response.data.id}`, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  const getImageDTOURL = () => {
    const urls = product.imageDTO.map((image) => image.url);
    console.log();
  };

  const uploadProduct = async () => {
    //images에 실 데이터, thumbnail에
    try {
      const imageList = new FormData(); //

      formData.thumbnail.forEach((el) => {
        imageList.append("file", el);
      });

      // const imageUrlList = await imageUrlParse(imageList);

      const productDTO = {
        ...product,
        title: formData.title,
        categoryName: formData.categoryName,
        categoryId: formData.categoryId,
        price: formData.price,
        content: formData.content,
      };
      await updateProductAPI(productDTO).then(() => {
        navigate(`/product/get/${productDTO.id}`, { replace: true });
      });
    } catch (error) {
      console.error("Error during product upload:", error);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      {product && (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            ></Backdrop>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <br />

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
                      value={formData.title}
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
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  상품 수정
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default ProductUpdateForm;
