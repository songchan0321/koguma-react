export const formatKoreanNumber = (number) => {
  if (number >= 10000) {
    const tenThousandPart = Math.floor(number / 10000);
    const remainder = number % 10000;

    // 만 단위 뒤에 1,000 단위 콤마 추가
    const formattedNumber = `${tenThousandPart}만${
      remainder > 0 ? ` ${remainder.toLocaleString()}원` : "원"
    }`;
    return formattedNumber;
  } else {
    // 1,000 단위 콤마만 추가
    return number.toLocaleString();
  }
};

export const formatCommaNumber = (number) => {
  return number.toLocaleString();
};
