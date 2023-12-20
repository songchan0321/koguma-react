import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authInstance } from '../../apis/utils/instance';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {CircularProgress} from "@mui/material";

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
                <CircularProgress />
            ) : (
                <div>
                    <Typography variant="body1" sx={{ color: '#673AB7', display: 'flex', justifyContent: 'center' }}>
                        <img src={otherMember.profileURL} alt="" style={{ width: "40%", borderRadius: "40%", marginTop: "40px" }} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#673AB7', display: 'flex', justifyContent: 'center', marginTop: '40px', fontSize: '1.5rem' }}>
                        {otherMember.nickname}
                    </Typography>
                    {/* 차단 버튼 */}
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Button variant="contained" color="secondary" onClick={handleBlockButtonClick}>
                            차단
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleFollowingButtonClick} style={{ marginLeft: '10px' }}>
                            팔로우
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OtherProfileForm;
