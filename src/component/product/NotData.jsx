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
        mt: 3,
        mb: 3,
      }}
    >
      {children} 이 없어요.
    </Box>
  );
};
export default NotData;
