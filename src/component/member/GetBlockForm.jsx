import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlockAPI, deleteBlockAPI } from '../../apis/api/member';
import { Button, CircularProgress, ThemeProvider, createTheme, Typography } from '@mui/material';
import Back from "../../component/common/Back";

const theme = createTheme({
    palette: {
        primary: {
            main: "#673AB7", // 보라색
        },
    },
});

const GetBlockForm = () => {
    const { targetMemberId } = useParams();
    const [getBlock, setGetBlock] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleUnblock = async () => {
        const confirmed = window.confirm('차단을 해제하시겠습니까?');
        if (confirmed) {
            try {
                await deleteBlockAPI(targetMemberId);
                alert('차단이 해제되었습니다.');

                navigate('/member/relationship/block/list');
            } catch (error) {
                console.error('Error deleting block:', error);
            }
        }
    };

    useEffect(() => {
        const fetchGetBlock = async () => {
            try {
                const blockData = await getBlockAPI(targetMemberId);
                console.log('Block Data:', blockData);
                setGetBlock(blockData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching block data:', error);
                setLoading(false);
            }
        };

        fetchGetBlock();
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
                            닉네임: {getBlock.targetMember.nickname}
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ fontSize: '1rem' }}>
                            차단 사유: {getBlock.content}
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ fontSize: '1rem' }}>
                            차단 일시: {extractDate(getBlock.targetMember.regDate)}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleUnblock} style={{ marginTop: '20px' }}>
                            차단 해제
                        </Button>
                        <Back />
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default GetBlockForm;
