import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ThemeProvider, createTheme, IconButton, CircularProgress } from '@mui/material';
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from 'react-router-dom';
import Back from "../../component/common/Back";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
// 테마 정의
const theme = createTheme({
    palette: {
        primary: {
            main: "#cfe8fc",
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
                console.log('Response:', response);
                console.log('Data:', response.data);
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
                    <List sx={{ width: '100%' }}>
                        {blockList.map((block) => (
                            <ListItem
                                key={block.id}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                <SentimentDissatisfiedOutlinedIcon/>
                                <ListItemText
                                    primary={block.targetMember.nickname}
                                    sx={{ marginLeft: '15px' }}
                                />
                                <IconButton
                                    onClick={() => handleNavigateToBlockDetail(block.targetMember.id)}
                                    aria-label="comment"
                                >
                                    <ArticleOutlinedIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                        <Back />
                    </List>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ListBlockForm;
