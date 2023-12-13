import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFollowingAPI, deleteFollowingAPI } from '../../apis/api/member';

const GetFollowingForm = () => {
    const { targetMemberId } = useParams();
    const [getFollowing, setGetFollowing] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleUnfollowing = async () => {
        const confirmed = window.confirm('팔로잉을 해제하시겠습니까?');
        if (confirmed) {
            try {
                await deleteFollowingAPI(targetMemberId);
                alert('팔로잉이 해제되었습니다.');
                // 여기에서 필요한 추가 로직 수행


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

    return (
        <div>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <div>
                    <p>팔로잉 상대: {getFollowing.targetMember.nickname}</p>
                    <p>팔로잉 사유: {getFollowing.content}</p>
                    <p>팔로잉 일시: {getFollowing.targetMember.regDate}</p>
                    <button onClick={handleUnfollowing}>팔로잉 해제</button>
                </div>
            )}
        </div>
    );
};

export default GetFollowingForm;
