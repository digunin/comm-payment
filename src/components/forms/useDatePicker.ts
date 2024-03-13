import { Months } from "../../store/payment/paymentReducer.utils";

export const useDatePicker = (
  minYear: number,
  minMonth: number,
  onchange: (year: number, month: Months) => void
) => {
  const onPickDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, _] = event.target.value.split("-");
    onchange(Number(year), Number(month) - 1);
  };
  const minDate =
    minYear === -1 ? "" : `${minYear}-${("0" + (minMonth + 1)).slice(-2)}-01`;
  return { minDate, onPickDate };
};
