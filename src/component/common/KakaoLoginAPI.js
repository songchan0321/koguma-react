import { defaultInstance } from "../../apis/utils/instance";

const KakaoLoginAPI = async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    
    await defaultInstance.get(`http://localhost:8080/common/kakao/callback/?code=${code}`)
    .then((res)=>
        console.log(res)
    )
    
};

export default KakaoLoginAPI;