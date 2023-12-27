import React from "react";
import ListBlockForm from "../../component/member/ListBlockForm";
import BottomBar from "../../component/common/BottomBar";
import TopBar from "../../component/payment/TopBar";
const ListBlock = () => {
  return (
    <div style={{ alignItems: "center", marginTop: "50px" }}>
      <ListBlockForm />
      <BottomBar />
      <TopBar>차단 목록</TopBar>
    </div>
  );
};

export default ListBlock;
