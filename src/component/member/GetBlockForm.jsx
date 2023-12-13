import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlockAPI, deleteBlockAPI } from '../../apis/api/member';

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
                // 여기에서 필요한 추가 로직 수행


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
        <div>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <div>
                    <p>차단 상대: {getBlock.targetMember.nickname}</p>
                    <p>차단 사유: {getBlock.content}</p>
                    <p>차단 일시: {getBlock.targetMember.regDate}</p>
                    <button onClick={handleUnblock}>차단 해제</button>
                </div>
            )}
        </div>
    );
};

export default GetBlockForm;
