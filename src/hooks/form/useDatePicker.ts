import { Months } from "../../store/payment/types";

export const useDatePicker = (
  minYear: number,
  minMonth: number,
  onchange: (year: number, month: Months) => void
) => {
  const onPickDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, _] = event.target.value.split("-");
    const today = new Date();
    const [todayYear, todayMonth] = [today.getFullYear(), today.getMonth()];
    onchange(Number(year) || todayYear, Number(month) - 1 || todayMonth);
  };
  const minDate =
    minYear === -1 ? "" : `${minYear}-${("0" + (minMonth + 1)).slice(-2)}-01`;
  return { minDate, onPickDate };
};
