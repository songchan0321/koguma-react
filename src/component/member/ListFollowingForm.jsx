import React, { useEffect, useState } from 'react';
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from 'react-router-dom';

const ListFollowingForm = () => {
    const [followingList, setFollowingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const response = await authInstance.get('/member/relationship/following/list');
                console.log('Response:', response); // 응답 전체를 출력
                console.log('Data:', response.data); // 응답에서 데이터만 출력
                setFollowingList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchFollowingList();

    }, []);

    const handleNavigateToFollowingDetail = (targetMemberId) => {
        // 차단 상세 페이지로 이동
        navigate(`/member/relationship/following/get/${targetMemberId}`);
    };

    return (
        <div>
            {loading ? (
                <p>데이터를 불러오는 중입니다...</p>
            ) : (
                <ul>
                    {followingList.map((following) => (
                        <li key={following.id}>
                            {following.targetMember.nickname}
                            {' '}
                            <button onClick={() => handleNavigateToFollowingDetail(following.targetMember.id)}>
                                팔로잉 상세
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListFollowingForm;
