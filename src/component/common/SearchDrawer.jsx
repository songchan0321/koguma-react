import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { Chip, Drawer, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const chipStyle = {
  margin: "6px", // Adjust as needed
  backgroundColor: "#E9ECEF",
};
const chipContainerStyle = {
  display: "flex",
  overflowX: "auto",
  whiteSpace: "nowrap",
  alignItems: "center",
  maxWidth: "100%", // Ensure the container can scroll
  position: "fixed",
  height: "3rem",
  backgroundColor: "rgba(0,0, 0, 0)",
  top: "3.6rem",
};
const SearchDrawer = ({ open, toggleDrawer }) => {
  const navigator = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const deleteHandlerSearch = (idx) => {
    const updateSearchHistory = searchHistory.filter(
      (_, index) => index !== idx
    );
    localStorage.setItem("searchHistory", JSON.stringify(updateSearchHistory));
    setSearchHistory(updateSearchHistory);
  };
  const handleSearch = () => {
    if (searchQuery === "") return;
    // 현재 검색어를 검색 기록에 추가
    const newSearchHistory = [searchQuery, ...searchHistory];

    // 로컬 스토리지에 검색 기록 저장
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));

    // 검색 기록 업데이트
    setSearchHistory(newSearchHistory);

    navigator("/search/tab", { state: { query: searchQuery } });
  };
  useEffect(() => {
    // 페이지 로딩 시 로컬 스토리지에서 검색 기록을 가져옴
    const storedSearchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedSearchHistory.slice(0, 10));
  }, []);

  return (
    <>
      <Drawer anchor="top" open={open} onClose={() => toggleDrawer(false)}>
        <Paper
          //   component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            // width: 400,
          }}
          // onClick={() => toggleDrawer(false)}
          // onKeyDown={() => toggleDrawer(false)}
        >
          <IconButton
            sx={{ p: "10px" }}
            aria-label="menu"
            onClick={() => toggleDrawer(false)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Divider sx={{ height: 36, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, height: "3.5rem" }}
            placeholder="검색할 키워드를 입력하세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Divider sx={{ height: 36, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => handleSearch()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Paper elevation={0} style={chipContainerStyle}>
          {searchHistory.map((item, index) => (
            <Chip
              key={index}
              label={item}
              size="small"
              variant="outlined"
              style={chipStyle}
              onClick={() => setSearchQuery(item)}
              onDelete={() => deleteHandlerSearch(index)}
              //   onClick={() => {}}
              // Add other Chip props as needed
            />
          ))}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Paper>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
