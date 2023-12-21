import React, { useState, useEffect } from "react";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";
import { authInstance } from "../../apis/utils/instance";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// 테마 정의
const theme = createTheme({
    palette: {
        primary: {
            main: "#673AB7", // 보라색
        },
    },
});

const AddFollowingForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const confirmFollowing = () => {
        const confirmed = window.confirm("정말 팔로우 하시겠습니까?");
        if (confirmed) {
            handleSubmit();
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // API 호출
            const response = await authInstance.post(`/member/relationship/following/add/`, {
                targetMember: {
                    id: location.state.id,
                },
                content,
                memberRelationshipType: "FOLLOWING",
            });

            console.log("응답 상태 코드:", response.status);
            console.log("응답 내용:", response.data);

            if (response.status === 200) {
                // 팔로우 추가 성공 시 리스트로 이동
                onSubmit();
                window.alert("회원을 팔로우 했습니다.");
                navigate("/member/relationship/following/list");
            } else {
                window.alert("팔로우 추가 실패.");
            }
        } catch (error) {
            window.alert("팔로우 추가 중 오류 발생");
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
                    label="팔로우 메모"
                    value={content}
                    onChange={handleContentChange}
                    style={{ width: "100%", marginTop:'160px'}}
                />
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <Button variant="contained" color="primary" onClick={confirmFollowing}>
                        팔로우
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default AddFollowingForm;
