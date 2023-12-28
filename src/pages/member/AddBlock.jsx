import React from "react";
import AddBlockForm from "../../component/member/AddBlockForm";
import BottomBar from "../../component/common/BottomBar";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
const AddBlock = () => {
  const handleSubmitSuccess = () => {};

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AddBlockForm onSubmit={handleSubmitSuccess} />
      <BottomBar />
      <TopBar>차단 추가</TopBar>
      <Back />
    </div>
  );
};

export default AddBlock;
