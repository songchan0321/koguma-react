import React from 'react';
import GetFollowingForm from '../../component/member/GetFollowingForm';
import BottomBar from "../../component/common/BottomBar";
import TopBar from "../../component/payment/TopBar";

const GetFollowing = () => {
    return (
        <div>
            <GetFollowingForm />
            <TopBar>팔로우 상세 조회</TopBar>
            <BottomBar/>
        </div>
    );
};

export default GetFollowing;