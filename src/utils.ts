export function getKoreanTime(time: string, date: string) {
  const dateArr = date.split("-");
  const timeArr = time.split(":");
  const newDate = new Date(
    Number(dateArr[0]),
    Number(dateArr[1]),
    Number(dateArr[2])
  );
  newDate.setHours(Number(timeArr[0]) + 9);
  return `${newDate.getHours()}:${timeArr[1]}:${timeArr[2]}`;
}
