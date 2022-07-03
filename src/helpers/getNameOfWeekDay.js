import { daysOfWeek } from "@/helpers/constants";

function getNameOfWeekDay(day) {
  return daysOfWeek[day];
}

export default getNameOfWeekDay;
