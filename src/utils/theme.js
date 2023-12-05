import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "MyFont, sans-serif",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": {
          fontFamily: "MyFont",
          src: `local('MyFont'), url('../fonts/Pretendard-Bold.otf') format('opentype')`, // 경로에 맞게 조절
          fontWeight: "normal",
          fontStyle: "normal",
        },
      },
    },
  },
  // 다른 테마 설정...
});

export default theme;
