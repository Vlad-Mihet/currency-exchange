import React from "react";
import { DatePicker } from "react-rainbow-components";

export default function RainbowDatepicker({
  date,
  setDate,
  setDateHelperState,
}) {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  return (
    <DatePicker
      id="datePicker-1"
      value={date}
      onChange={(inputDate) => {
        setDateHelperState(date);
        setDate(inputDate);
      }}
      formatStyle="large"
      placeholder="Select A Date"
      minDate={new Date(2000, 1, 1)}
      maxDate={new Date(year, month, day)}
    />
  );
}
