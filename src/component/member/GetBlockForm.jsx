import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlockAPI, deleteBlockAPI } from '../../apis/api/member';
import { Button, CircularProgress, ThemeProvider, createTheme } from '@mui/material';

// 테마 정의
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

    return (
        <ThemeProvider theme={theme}>
            <div>
                {loading ? (
                    <CircularProgress color="primary" />
                ) : (
                    <div>
                        <p>차단 상대: {getBlock.targetMember.nickname}</p>
                        <p>차단 사유: {getBlock.content}</p>
                        <p>차단 일시: {getBlock.targetMember.regDate}</p>
                        <Button variant="contained" color="primary" onClick={handleUnblock}>
                            차단 해제
                        </Button>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default GetBlockForm;
