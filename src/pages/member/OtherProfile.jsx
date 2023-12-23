import React from "react";
import OtherProfileForm from "../../component/member/OtherProfileForm";
import Back from "../../component/common/Back";
import BottomBar from "../../component/common/BottomBar";

const OtherProfile = () => {
  return (
    <div>
      <OtherProfileForm url={`/product/list`} />
      <Back />
      <BottomBar />
    </div>
  );
};

export default OtherProfile;
