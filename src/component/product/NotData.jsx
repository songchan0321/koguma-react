import { Box } from "@mui/material";

const NotData = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 세로 중앙 정렬
        justifyContent: "center", // 가로 중앙 정렬
        height: "100vh", // 전체 화면 높이
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "50%", // 세로 중앙 정렬을 위한 위치 조정
          transform: "translateY(-50%)", // 세로 중앙 정렬을 위한 추가 조정
        }}
      >
        <h5>
          <b>{children}</b>
        </h5>
      </Box>
    </Box>
  );
};
export default NotData;
