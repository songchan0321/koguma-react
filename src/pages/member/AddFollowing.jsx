import React from "react";
import AddFollowingForm from "../../component/member/AddFollowingForm";


const AddFollowing = () => {


    const handleSubmitSuccess = () => {

    };

    return (
        <div>
            <h2>팔로잉 추가 페이지</h2>
            <AddFollowingForm onSubmit={handleSubmitSuccess} />
        </div>
    );
};

export default AddFollowing;