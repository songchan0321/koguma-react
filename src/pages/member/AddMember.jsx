import React from "react";
import AddMemberForm from "../../component/member/AddMemberForm";
import { Box } from "@mui/material";
import Back from "../../component/common/Back";
import { useLocation } from "react-router-dom";

const AddMember = () => {
  const handleAddMemberSubmit = async (memberDTO) => {
    try {
      // AddMemberForm 컴포넌트에서 직접 API 호출을 수행하므로 여기서는 추가 작업 필요 없음
      console.log("회원 등록 정보:", memberDTO);
    } catch (error) {
      console.error("가입 중 오류 발생:", error);
    }
  };
  const { state } = useLocation();

  return (
    <Box p={3} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
      <AddMemberForm
        onSubmit={handleAddMemberSubmit}
        kakaoEmail={state?.kakaoEmail ?? null}
      />
      <Back />
    </Box>
  );
};

export default AddMember;
