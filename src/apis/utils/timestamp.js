export const absoulte_timestamp = (timestamp, yearFlag) => {
  const [year, month, day] = timestamp.split("T")[0].split("-");
  const [hour, sec] = timestamp.split("T")[1].split(":");
  return `${yearFlag ? year + "년 " : ""}${month}월 ${day}일 ${hour}:${sec}`;
};

export const formatTimeAgo = (dateTimeString) => {
  const inputDate = new Date(dateTimeString);
  const currentDate = new Date();
  const timeDifference = currentDate - inputDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds}초 전`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 7) {
    return `${days}일 전`;
  } else if (weeks < 4) {
    return `${weeks}주 전`;
  } else if (months < 12) {
    return `${months}달 전`;
  } else if (years < 1) {
    return `${years}년 전`;
  } else {
    return `${years}년 전`;
  }
};
