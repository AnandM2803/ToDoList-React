import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CalendarController = ({ handleDateChange }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
    handleDateChange(selectedDate);
  };

  return (
    <div className="calendar-controller">
      <Calendar
        onChange={onChange}
        value={date}
      />
    </div>
  );
};

export default CalendarController;
