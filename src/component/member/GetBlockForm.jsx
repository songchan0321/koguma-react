import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authInstance } from '../../apis/utils/instance';

const GetBlock = () => {
    const { targetMemberId } = useParams();
    const [getBlock, setGetBlock] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGetBlock = async () => {
            try {
                const response = await authInstance.get(`/member/relationship/block/get/${targetMemberId}`);
                setGetBlock(response.data);
                setLoading(false);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
                setLoading(false);
            }
        };

        fetchGetBlock();
    }, [targetMemberId]);

    return (
        <div>
            <h2>차단 상세 정보</h2>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <div>
                    <p>차단 상대 닉네임: {getBlock.targetMember.nickname}</p>
                    <p>차단 일시: {getBlock.regDate}</p>
                    {/* 추가적인 차단 상세 정보 표시 */}
                </div>
            )}
        </div>
    );
};

export default GetBlock;