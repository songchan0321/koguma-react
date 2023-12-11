import * as React from "react";
import { useState, useEffect } from "react";
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

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    suggest: false,
    content: "",
    image: images,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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
      price: formatMoney(inputValue),
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
      category: form.get("category"),
      price: form.get("price"),
      suggest: form.get("suggest") === "on", // suggest가 체크박스인 경우
      content: form.get("content"),
    };

    setFormData(updatedFormData);
    console.log(formData);
    // (async () => {
    //   try {
    //     setLoading(true);
    //     const data = await loginAPI(form.get("id"), form.get("password"));

    //     alert("로그인 성공");
    //     navigator("/product/list");
    //   } catch (err) {
    //     console.error(err);
    //     alert("로그인 실패");
    //   } finally {
    //     setLoading(false);
    //   }
    // })();
  };
  useEffect(() => {
    console.log(images);
    setImages(images);
  }, [images]);

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
          <Typography component="h1" variant="h5">
            {text}
          </Typography>
          <br />

          <ImageList images={images} setImages={setImages} />

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
                    value={formData.category || ""}
                    label="카테고리  "
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        category: event.target.value,
                      });
                    }}
                    MenuProps={MenuProps}
                  >
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
              type="text" // type을 "text"로 변경
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
            <FormControlLabel
              control={
                <Checkbox
                  value={formData.suggest}
                  name="suggest"
                  color="secondary"
                  onChange={handleChange}
                />
              }
              label="거래 제안 받기"
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
