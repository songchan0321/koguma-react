import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, List, ListItem, ListItemText, ThemeProvider, createTheme } from '@mui/material';
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from 'react-router-dom';

// 테마 정의
const theme = createTheme({
    palette: {
        primary: {
            main: "#673AB7", // 보라색
        },
    },
});

const ListBlockForm = () => {
    const [blockList, setBlockList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlockList = async () => {
            try {
                const response = await authInstance.get('/member/relationship/block/list');
                console.log('Response:', response); // 응답 전체를 출력
                console.log('Data:', response.data); // 응답에서 데이터만 출력
                setBlockList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchBlockList();

    }, []);

    const handleNavigateToBlockDetail = (targetMemberId) => {
        // 차단 상세 페이지로 이동
        navigate(`/member/relationship/block/get/${targetMemberId}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                {loading ? (
                    <CircularProgress color="primary" />
                ) : (
                    <List>
                        {blockList.map((block) => (
                            <ListItem key={block.id}>
                                <ListItemText primary={block.targetMember.nickname} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleNavigateToBlockDetail(block.targetMember.id)}
                                >
                                    차단 상세
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ListBlockForm;
