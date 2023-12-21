import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteFollowingAPI, getFollowingAPI} from '../../apis/api/member';
import { Button, CircularProgress, ThemeProvider, createTheme, Typography } from '@mui/material';
import Back from "../../component/common/Back";

const theme = createTheme({
    palette: {
        primary: {
            main: "#673AB7", // 보라색
        },
    },
});

const GetFollowingForm = () => {
    const { targetMemberId } = useParams();
    const [getFollowing, setGetFollowing] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleUnfollowing = async () => {
        const confirmed = window.confirm('팔로우를 취소하시겠습니까?');
        if (confirmed) {
            try {
                await deleteFollowingAPI(targetMemberId);
                alert('팔로우가 취소되었습니다.');

                navigate('/member/relationship/following/list');
            } catch (error) {
                console.error('Error deleting following:', error);
            }
        }
    };

    useEffect(() => {
        const fetchGetFollowing = async () => {
            try {
                const followingData = await getFollowingAPI(targetMemberId);
                console.log('Following Data:', followingData);
                setGetFollowing(followingData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching following data:', error);
                setLoading(false);
            }
        };

        fetchGetFollowing();
    }, [targetMemberId]);

    // 날짜 부분만 추출하는 함수
    const extractDate = (fullDate) => {
        const dateObj = new Date(fullDate);
        return dateObj.toISOString().split('T')[0];
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ textAlign: 'center' }}>
                {loading ? (
                    <CircularProgress color="primary" />
                ) : (
                    <div>
                        <Typography variant="h6" gutterBottom style={{ marginTop: '240px', fontWeight: 'bold', fontSize: '1.5rem' }}>
                            닉네임: {getFollowing.targetMember.nickname}
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ fontSize: '1rem' }}>
                            팔로우 메모: {getFollowing.content}
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ fontSize: '1rem' }}>
                            팔로우 일시: {extractDate(getFollowing.targetMember.regDate)}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleUnfollowing} style={{ marginTop: '20px' }}>
                            팔로우 취소
                        </Button>
                        <Back />
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default GetFollowingForm;
