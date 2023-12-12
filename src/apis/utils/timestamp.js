export const absoulte_timestamp = (timestamp) => {
  const [year, month, day] = timestamp.split("T")[0].split("-");
  const [hour, sec] = timestamp.split("T")[1].split(":");
  return `${month}월 ${day}일 ${hour}:${sec}`;
};
