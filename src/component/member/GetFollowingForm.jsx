import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authInstance } from '../../apis/utils/instance';

const GetFollowing = () => {
    const { targetMemberId } = useParams();
    const [getFollowing, setGetFollowing] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGetFollowing = async () => {
            try {
                const response = await authInstance.get(`/member/relationship/block/get/${targetMemberId}`);
                setGetFollowing(response.data);
                setLoading(false);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
                setLoading(false);
            }
        };

        fetchGetFollowing();
    }, [targetMemberId]);

    return (
        <div>
            <h2>팔로잉 상세 정보</h2>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <div>
                    <p>팔로잉 상대 닉네임: {getFollowing.targetMember.nickname}</p>
                    <p>팔로잉 일시: {getFollowing.regDate}</p>
                    {/* 추가적인 차단 상세 정보 표시 */}
                </div>
            )}
        </div>
    );
};

export default GetFollowing;