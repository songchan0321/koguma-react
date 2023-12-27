import React, { useEffect, useState } from "react";
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from "react-router-dom";
import Back from "../../component/common/Back";
import {
  ThemeProvider,
  createTheme,
  CircularProgress,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const ListReportForm = () => {
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportList = async () => {
      try {
        const response = await authInstance.get("/member/report/list");

        setReportList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchReportList();
  }, []);

  const handleNavigateToReportDetail = (reportTitle) => {
    // 신고 상세 페이지로 이동
    navigate(`/member/report/get`);
  };

  const handleAddReportButtonClick = () => {
    navigate("/member/report/add");
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#8a2be2", // 보라색
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <div>
            <List>
              {reportList.map((report) => (
                <ListItem key={report.reportTitle}>
                  <Typography variant="body1" color="primary">
                    {report.reportTitle}{" "}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleNavigateToReportDetail(report.reportTitle)
                      }
                    >
                      신고 상세 정보
                    </Button>
                  </Typography>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddReportButtonClick}
          style={{ marginTop: "10px" }}
        >
          문의 및 신고 추가
        </Button>
        <Back />
      </div>
    </ThemeProvider>
  );
};

export default ListReportForm;
