import { Typography } from "@mui/material";

const AddClubImage = ({ onPrev, onNext, data }) => {
  const handlePrevClick = () => {
    onPrev();
  };

  const handleNextClick = () => {
    // 여기에서 필요한 데이터를 다음 페이지로 전달
    onNext({ additionalData: "someValue" });
  };

  return (
    <>
      <div>
        <Typography variant="h4">
          모임의 대표이미지와 배경을 설정해주세요 !
        </Typography>
      </div>
    </>
  );
};

export default AddClubImage;
