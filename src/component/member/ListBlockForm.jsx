import React, { useEffect, useState } from 'react';
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from 'react-router-dom';

const ListBlockForm = () => {
    const [blockList, setBlockList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlockList = async () => {
            try {
                const response = await authInstance.get('/member/relationship/block/list');
                setBlockList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
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
        <div>
            <h2>차단 목록</h2>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <ul>
                    {blockList.map((block) => (
                        <li key={block.id}>
                            {block.targetMember.nickname}
                            {' '}
                            <button onClick={() => handleNavigateToBlockDetail(block.id)}>
                                차단 상세
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListBlockForm;
