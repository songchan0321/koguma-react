export const getMemberAPIService = async (data) => {
    const { phone } = data;

    const formattedPhone = formatPhoneNumber(phone);

    return {
        phone: formattedPhone,
    };
};

const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // 숫자 이외의 문자 제거
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }

    // 변환 실패 시 기존 번호 그대로 반환
    return phoneNumber;
};