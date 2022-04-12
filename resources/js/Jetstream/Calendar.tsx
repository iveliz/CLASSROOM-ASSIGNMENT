import React from 'react';
import { useState } from 'react';
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
export default function () {
  const today=new Date();
  return (
    <DatePicker
    defaultValue={today}
    valueEditFormat={{ dateStyle: "short" }}
    valueDisplayFormat={{ dateStyle: "medium" }} 
    dropUp={true}
    min={today}
    placeholder="m/dd/yy" />
  );
}
