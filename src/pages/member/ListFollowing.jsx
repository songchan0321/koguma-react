import React from 'react';
import ListFollowingForm from '../../component/member/ListFollowingForm';
import BottomBar from "../../component/common/BottomBar";
const ListFollowing = () => {
    return (
        <div style={{  alignItems: 'center', marginTop: '50px' }}>
            <ListFollowingForm />
            <BottomBar/>
        </div>
    );
};

export default ListFollowing;