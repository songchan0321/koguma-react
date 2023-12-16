import { TextField } from "@mui/material";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";

const DaumPost = ({ daumAddressGetHandler, address }) => {
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const handleComplete = (data) => {
    console.log(data.address);
    let fullAddress = data.address;
    let extraAddress = ""; //추가될 주소
    let localAddress = data.sido + " " + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
    if (data.addressType === "R") {
      //주소타입이 도로명주소일 경우
      if (data.bname !== "") {
        extraAddress += data.bname; //법정동, 법정리
      }
      if (data.buildingName !== "") {
        //건물명
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      //지역주소 제외 전체주소 치환
      fullAddress = fullAddress.replace(localAddress, "");
      console.log(fullAddress);
      //조건 판단 완료 후 지역 주소 및 상세주소 state 수정
      //   props.setAddressObj({
      //     areaAddress: localAddress,
      //     townAddress: fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '')
      //   });
      //   daumAddressGetHandler(
      //     fullAddress + (extraAddress !== "" ? `(${extraAddress})` : "")
      //   );
      daumAddressGetHandler(data.address);
      //주소 검색이 완료된 후 결과를 매개변수로 전달
      //   다음에 수행할 작업을 명시
    }
  };
  //클릭 시 발생할 이벤트
  const handleClick = () => {
    //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
    open({ onComplete: handleComplete });
  };
  return (
    <TextField
      id="outlined-basic"
      label="주소를 입력해주세요."
      value={address}
      InputLabelProps={{
        shrink: !address ? false : true,
      }}
      variant="outlined"
      onClick={handleClick}
    />
    // <button type="button" onClick={handleClick}>
    //   주소찾기
    // </button>
  );
};

export default DaumPost;
