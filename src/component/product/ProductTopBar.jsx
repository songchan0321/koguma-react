import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ProductTopBar = () => {
  const [dong, setDong] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
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

  const handleChange = (event) => {
    setDong(event.target.value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <FormControl sx={{ minWidth: 120 }}>
        {/* <InputLabel htmlFor="demo-simple-select-label">내 동네</InputLabel> */}
        <Select
          //  multiple
          displayEmpty
          // labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dong}
          onChange={handleChange}
          input={<OutlinedInput label="대표동" id="demo-simple-select-label" />}
          sx={{
            fontSize: 14,
            padding: "0px",
            "& .MuiSelect-outlined": { borderBottom: "none" },
          }}
          // inputProps={{ maxLength: 5 }} // 최대 5글자 설정
          // MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label", maxLength: 5 }}
        >
          <MenuItem disabled value="">
            <em>홍제동</em>
          </MenuItem>
          <MenuItem value={"인헌동"}>인헌동</MenuItem>
          <MenuItem value={"역삼동"}>역삼동</MenuItem>
          <MenuItem value={"홍제동"}>홍제동</MenuItem>
          <MenuItem value={"동네 설정"}>동네 설정</MenuItem>
        </Select>
      </FormControl>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={handleModalOpen}>
          <MenuOpenIcon sx={{ fontSize: 30 }} color="secondary" />
        </Button>
        {/* 통합 검색 완성 후  Navi */}
        <Button>
          <SearchIcon sx={{ fontSize: 30 }} color="secondary" />
        </Button>
        <Button>
          <NotificationsNoneIcon sx={{ fontSize: 30 }} color="secondary" />
        </Button>
      </ButtonGroup>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>카테고리 선택</DialogTitle>
        <DialogContent sx={{ overflowY: "auto", maxHeight: "300px" }}>
          <DialogContentText>
            {categorys.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductTopBar;
