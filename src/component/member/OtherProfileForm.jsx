import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authInstance } from '../../apis/utils/instance';

const OtherProfileForm = () => {
    const { id } = useParams();
    const [otherMember, setOtherMember] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOtherMember = async () => {
            try {
                const response = await authInstance.get(`/member/other/get/${id}`);
                setOtherMember(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching other member data:', error);
                setLoading(false);
            }
        };

        fetchOtherMember();
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h3>Other Member Profile</h3>
                    <p>닉네임: {otherMember.nickname}</p>
                    <p>프로필 사진: {otherMember.imageId}</p>
                    {/* 추가적인 회원 정보 표시 */}
                </div>
            )}
        </div>
    );
};

export default OtherProfileForm;
