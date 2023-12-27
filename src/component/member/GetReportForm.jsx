import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReportAPI, getReportAPI } from "../../apis/api/member";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper, Typography, Button, CircularProgress } from "@mui/material";

const GetReportForm = () => {
  const [getReport, setGetReport] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDeleteReport = async () => {
    const confirmed = window.confirm("신고를 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await deleteReportAPI();
        alert("신고가 삭제되었습니다.");
        alert("신고 목록으로 돌아갑니다.");
        navigate("/member/report/list");
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
  };

  useEffect(() => {
    const fetchGetReport = async () => {
      try {
        const reportData = await getReportAPI();
        console.log("Report Data:", reportData);
        setGetReport(reportData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report data:", error);
        setLoading(false);
      }
    };

    fetchGetReport();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#8a2be2", // 보라색
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <div>
            <Typography variant="h5" color="primary" gutterBottom>
              신고 제목: {getReport.reportTitle}
            </Typography>
            <Typography variant="body1" color="primary" paragraph>
              신고 내용: {getReport.reportContent}
            </Typography>
            <Typography variant="body2" color="primary">
              신고 일시: {getReport.regDate}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteReport}
              style={{ marginTop: "10px" }}
            >
              신고 삭제
            </Button>
          </div>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default GetReportForm;
