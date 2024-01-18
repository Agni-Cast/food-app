import Calendar from "react-calendar";
import { useState } from "react";

function CalendarComp({
  value,
  onChange,
  onSavedPage,
  onHomePage,
  hike,
  updateDate,
}) {
  // const [value, onChange] = useState([new Date(), new Date()]);
  // console.log("VALUE: ", value);

  return (
    <div>
      {onSavedPage === true ? (
        <Calendar
          onChange={onChange}
          defaultValue={[hike.startDate, hike.endDate]}
          // value={value}
          selectRange={true}
        />
      ) : null}
      {onHomePage === true ? (
        <Calendar
          onChange={onChange}
          // defaultValue={hike.date}
          value={value}
          selectRange={true}
        />
      ) : null}
    </div>
  );
}

export default CalendarComp;
