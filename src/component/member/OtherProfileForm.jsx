import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authInstance } from '../../apis/utils/instance';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const OtherProfileForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleBlockButtonClick = () => {
        // Navigate to "/member/relationship/block/add/:targetMemberId"
        navigate(`/member/relationship/block/add`, { state: { id: id } });
    };

    const handleFollowingButtonClick = () => {
        // Navigate to "/member/relationship/following/add/:targetMemberId"
        navigate(`/member/relationship/following/add`, { state: { id: id } });
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Typography variant="body1" sx={{ color: '#673AB7' }}>
                        닉네임: {otherMember.nickname}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#673AB7' }}>
                        프로필 사진: {otherMember.imageId}
                    </Typography>
                    {/* 추가적인 회원 정보 표시 */}
                    <Button variant="contained" color="secondary" onClick={handleBlockButtonClick} sx={{ marginTop: 2 }}>
                        차단
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleFollowingButtonClick} sx={{ marginTop: 2 }}>
                        팔로우
                    </Button>
                </div>
            )}
        </div>
    );
};

export default OtherProfileForm;
