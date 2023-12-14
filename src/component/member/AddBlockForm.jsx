import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { authInstance } from "../../apis/utils/instance";
import { useNavigate, useParams,useLocation } from "react-router-dom";

const AddBlockForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // API 호출
            const response = await authInstance.post(`/member/relationship/block/add/`, {

                targetMember: {
                    id:location.state.id
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
        <div>
            <TextField label="차단 사유" value={content} onChange={handleContentChange}/>
            <div style={{ marginTop: 10 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    차단 등록
                </Button>
            </div>
        </div>
    );
};

export default AddBlockForm;
