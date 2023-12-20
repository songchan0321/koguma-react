import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateMemberForm from "../../component/member/UpdateMemberForm";
import { authInstance } from "../../apis/utils/instance";

const UpdateMember = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await authInstance.get("/member/profile/get", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setMember(response.data);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error("오류 발생: ", error);
                setLoading(false); // Set loading to false on error
            }
        };
        fetchMemberData();
    }, []);

    const handleUpdateSuccess = async () => {
        // 업데이트 성공 시 다시 멤버 정보를 가져와서 화면을 갱신
        try {
            setLoading(true); // Set loading to true before fetching updated data
            const response = await authInstance.get("/member/profile/get", {
                headers: {
                    Accept: "application/json",
                },
            });
            setMember(response.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("오류 발생: ", error);
            setLoading(false); // Set loading to false on error
        }
    };

    return (
        <Box p={3} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    {/* 로딩 중일 때 CircularProgress 표시 */}
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        // 로딩이 완료되면 멤버 이미지 표시
                        member && (
                            <img
                                src={member.profileURL}
                                alt="Profile"
                                style={{ width: "20%", borderRadius: "20%" }}
                            />
                        )
                    )}
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* 닉네임 */}
                    <Typography variant="h4" gutterBottom>
                        {/* 로딩 중일 때 CircularProgress 표시 */}
                        {loading ? (
                            <CircularProgress size={20} />
                        ) : (
                            // 로딩이 완료되면 멤버 닉네임 표시
                            member?.nickname
                        )}
                    </Typography>
                    {/* UpdateMemberForm 사용 */}
                    <UpdateMemberForm member={member} onUpdateSuccess={handleUpdateSuccess} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdateMember;
