import React from "react";
import OtherProfileForm from "../../component/member/OtherProfileForm";
import Back from "../../component/common/Back";
import BottomBar from "../../component/common/BottomBar";
import TopBar from "../../component/payment/TopBar";

const OtherProfile = () => {
  return (
    <div>
      <OtherProfileForm />
      <Back url={`/product/list`} />
      <BottomBar />
        <TopBar> 프로필 조회 </TopBar>
    </div>
  );
};

export default OtherProfile;
