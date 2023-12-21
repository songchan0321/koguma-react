import React from 'react';
import ListFollowingForm from '../../component/member/ListFollowingForm';
import BottomBar from "../../component/common/BottomBar";
import TopBar from "../../component/payment/TopBar";
const ListFollowing = () => {
    return (
        <div style={{  alignItems: 'center', marginTop: '50px' }}>
            <ListFollowingForm />
            <BottomBar/>
            <TopBar>팔로우 목록</TopBar>
        </div>
    );
};

export default ListFollowing;