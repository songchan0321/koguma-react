import React, { useState, useEffect } from "react";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";
import { authInstance } from "../../apis/utils/instance";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// 테마 정의
const theme = createTheme({
    palette: {
        primary: {
            main: "#D070FB", // 보라색
        },
    },
});

const AddBlockForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");
    const [inputError, setInputError] = useState(false); // State to manage input error
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const confirmBlock = () => {
        const confirmed = window.confirm("정말 차단하시겠습니까?");
        if (confirmed) {
            handleSubmit();
        }
    };

    const handleContentChange = (e) => {
        const inputValue = e.target.value;
        setContent(inputValue);

        // Check if the input length is less than 2 characters
        if (inputValue.length < 6) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleSubmit = async () => {
        if (content.length < 10) {
            window.alert("차단 사유는 5자 이상 입력해야 합니다.");
            return;
        }

        try {
            // API 호출
            const response = await authInstance.post(`/member/relationship/block/add/`, {
                targetMember: {
                    id: location.state.id,
                },
                content,
                memberRelationshipType: "BLOCK",
            });

            console.log("응답 상태 코드:", response.status);
            console.log("응답 내용:", response.data);

            if (response.status === 200) {
                // 차단 추가 성공 시 리스트로 이동
                onSubmit();
                window.alert("회원을 차단했습니다.");
                navigate("/member/relationship/block/list");
            } else {
                window.alert("차단 추가 실패.");
            }
        } catch (error) {
            window.alert("차단 추가 중 오류 발생");
        }
    };

    useEffect(() => {
        // id가 변경될 때마다 처리하는 로직 추가 가능
    }, [id]);

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <TextField
                    label="차단 사유"
                    value={content}
                    onChange={handleContentChange}
                    style={{ width: "100%", marginTop: "160px" }}
                    multiline
                    rows={4}
                    error={inputError} // Set error state
                    helperText={inputError ? "차단 사유는 5자 이상 입력해야 합니다." : ""} // Display error message
                />
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <Button variant="contained" color="primary" onClick={confirmBlock}>
                        차단 등록
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default AddBlockForm;
