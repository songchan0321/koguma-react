import React from "react";
import ListClubMap from "../../component/club/common/ListClubMap";
import TopBarClub from "../../component/club/common/TopBarClub";
import MarginEmpty from "../../component/payment/MarginEmpty";

const ListClubNear = () => {
  return (
    <div>
      <TopBarClub>내 근처 모임</TopBarClub>
      <MarginEmpty value={60} />
      <ListClubMap />
    </div>
  );
};

export default ListClubNear;
