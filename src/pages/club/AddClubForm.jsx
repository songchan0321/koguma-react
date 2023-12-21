import { useState, useEffect } from "react";
import AddClubCategoryForm from "./AddClubCategoryForm";
import AddClubDetailForm from "./AddClubDetailForm";
import AddClubImage from "./AddClubImage";
import AddClubNicknameForm from "./AddClubNicknameForm";
import { addClubAPI } from "../../apis/api/club";
import AddClubMaxCapacity from "./AddClubMaxCapacity";
import AddClubConfirm from "./AddClubConfirm";

const AddClubForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [clubId, setClubId] = useState();

  const handleNext = async (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));

    setStep((prevStep) => prevStep + 1);

    // 마지막 단계에 도달하면 서버로 데이터를 전송합니다
    if (step === 5) {
      try {
        console.log(`---------`);
        console.log(formData);
        console.log(`--------`);
        // 서버 엔드포인트를 실제 엔드포인트로 대체하세요
        const saveClub = await addClubAPI(data);
        setClubId(saveClub);
        console.log(saveClub);
      } catch (error) {
        console.error("서버에 데이터를 보내는 중 오류 발생:", error);
      }
    }
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleConfirm = (data) => {
    console.log("회원가입 완료", data);
  };

  useEffect(() => {
    console.log("Current formData:", formData);
  }, [step]);

  return (
    <div>
      {step === 1 && <AddClubCategoryForm onNext={handleNext} />}
      {step === 2 && (
        <AddClubDetailForm
          onPrev={handlePrev}
          onNext={handleNext}
          data={formData}
        />
      )}
      {step === 3 && (
        <AddClubImage onPrev={handlePrev} onNext={handleNext} data={formData} />
      )}
      {step === 4 && (
        <AddClubMaxCapacity
          onPrev={handlePrev}
          onNext={handleNext}
          data={formData}
        />
      )}
      {step === 5 && (
        <AddClubNicknameForm
          onPrev={handlePrev}
          onNext={handleNext}
          data={formData}
        />
      )}
      {step === 6 && (
        <AddClubConfirm
          onConfirm={handleConfirm}
          data={formData}
          clubId={clubId}
        />
      )}
    </div>
  );
};

export default AddClubForm;
