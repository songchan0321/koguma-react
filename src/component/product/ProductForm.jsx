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
} from "@mui/material";

import { formatMoney } from "../../apis/services/product";
import ImageList from "../common/ImageList";
import { addImageAPI } from "../../apis/api/common";
import { addProductAPI } from "../../apis/api/Product";
import { Navigate, useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const imageRegHandler = (images) => {
    setFormData((prev) => ({ ...prev, images: images }));
  };
  const imageDelHandler = (id) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== id),
    }));
  };
  const [formData, setFormData] = useState({
    title: "",
    categoryName: "",
    categoryId: 0,
    price: 0,

    content: "",
    // image: images,
    images: [],
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

  const handlePriceChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, "");
    if (parseInt(inputValue, 10) > 99999999) {
      inputValue = "99999999";
    } else if (parseInt(inputValue, 0) === 0) {
      inputValue = "0";
    }
    setFormData({
      ...formData,
      // price: formatMoney(inputValue),
      price: inputValue,
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const updatedFormData = {
      title: form.get("title"),
      categoryName: formData.categoryName,
      categoryId: formData.categoryId,
      price: parseInt(form.get("price").replace(/,/g, ""), 10),

      content: form.get("content"),
      images: formData.images,
    };

    setFormData({ ...updatedFormData });
    console.log(updatedFormData);

    const imageList = new FormData();
    updatedFormData.images.forEach((el) => {
      imageList.append("file", el);
    });
    (async () => {
      try {
        // const { data } = await addProductAPI(dto);
        // console.log(data);

        const imageUrlList = await addImageAPI(imageList);
        console.log(imageUrlList);
        const dto = {
          productDTO: {
            title: form.get("title"),
            categoryName: formData.categoryName,
            categoryId: formData.categoryId,
            price: parseInt(form.get("price").replace(/,/g, ""), 10),
            content: form.get("content"),
            images: imageUrlList,
          },
        };
        console.log(dto);
        await addProductAPI(dto.productDTO)
          .then((response) => {
            console.log(response);
            navigate(`/product/get/${response.data.id}`, { replace: true });
          })
          .catch((error) => {
            console.error("Error in addProductAPI:", error);
            // Handle the error appropriately
          });
      } catch (error) {
        alert("등록 실패입니다.");
        console.log(error);
        // Handle the error appropriately
      }
    })();
  };

  return (
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

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs={7}>
                <TextField
                  margin="normal"
                  required
                  id="title"
                  label="상품 이름"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  fullWidth
                />
              </Grid>

              <Grid item mt={2} xs={5}>
                <FormControl sx={{ minWidth: 100 }}>
                  <InputLabel id="category">카테고리</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    value={formData.categoryName || ""}
                    label="카테고리"
                    onChange={(event) => {
                      const selectedCategory = event.target.value;
                      const categoryIndex = categorys.indexOf(selectedCategory);
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
              type="number" // type을 "text"로 변경
              label="상품 가격"
              value={formData.price} // 표시할 때 포맷팅된 값을 사용
              onChange={handlePriceChange}
              InputProps={{
                inputProps: {
                  min: 0,
                  max: 99999999,
                },
              }}
              autoComplete="price"
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
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {text}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProductForm;
