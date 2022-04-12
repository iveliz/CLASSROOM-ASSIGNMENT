import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { addDays, subDays } from 'date-fns';
registerLocale('es', es);
export default function () {
  var hoy = new Date();
  var day1 = new Date('01/07/1970');
  var difference = Math.abs(hoy.getTime() - day1.getTime());
  var days = difference / (1000 * 3600 * 24);

  const [startDate, setStartDate] = useState(hoy);
  return (

      <DatePicker
        locale="es"
        selected={startDate}
        excludeDateIntervals={[
          { start: subDays(new Date(), days), end: addDays(hoy, -1) },
        ]}
        onChange={(date: React.SetStateAction<Date>) => setStartDate(date)}
      />


  );
}
