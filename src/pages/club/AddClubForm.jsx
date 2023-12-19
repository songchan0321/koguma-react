import { useState } from "react";
import AddClubCategoryForm from "./AddClubCategoryForm";
import AddClubDetailForm from "./AddClubDetailForm";
import AddClubImage from "./AddClubImage";

const AddClubForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleConfirm = (data) => {
    console.log("회원가입 완료", data);
  };

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
      {/* {step === 4 && (
        <Step3 onPrev={handlePrev} onConfirm={handleConfirm} data={formData} />
      )} */}
    </div>
  );
};

export default AddClubForm;
