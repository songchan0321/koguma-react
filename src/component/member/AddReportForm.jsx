import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from "react-router-dom";

const AddReportForm = ({ onSubmit }) => {
    const [reportTitle, setReportTitle] = useState("");
    const [reportContent, setReportContent] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const navigate = useNavigate();

    const handleReportTitleChange = (e) => {
        setReportTitle(e.target.value);
    };

    const handleReportContentChange = (e) => {
        setReportContent(e.target.value);
    };

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // API 호출
            const response = await authInstance.post(`/member/report/add`, {
                reportTitle,
                reportContent,
                categoryName,
            });

            console.log("응답 상태 코드:", response.status);
            console.log("응답 내용:", response.data);

            if (response.status === 200) {
                // 신고 추가 성공 시 리스트로 이동
                onSubmit();
                window.alert("신고를 추가했습니다.");
                navigate("/member/report/list");  // 리스트로 이동하도록 수정
            } else {
                window.alert("신고 추가 실패.");
            }
        } catch (error) {
            console.error("신고 추가 중 오류 발생:", error);
            window.alert("신고 추가 중 오류 발생");
        }
    };

    return (
        <div>
            <TextField label="신고 제목" value={reportTitle} onChange={handleReportTitleChange} />
            <TextField label="신고 카테고리" value={categoryName} onChange={handleCategoryNameChange} />
            <TextField label="신고 사유" value={reportContent} onChange={handleReportContentChange} />
            <div style={{ marginTop: 10 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    신고 등록
                </Button>
            </div>
        </div>
    );
};

export default AddReportForm;
