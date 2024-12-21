"use client";
import React, { useState, useEffect } from "react";
import {
  addDays,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  startOfWeek,
  isSameMonth,
  format,
  isSameDay,
} from "date-fns";
import { ShiftCart } from "@/components/shift/shift-cart";

export const ShiftCalendar = ({
  year,
  month,
  employees,
}: {
  year: number;
  month: number;
  employees: any;
}) => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

  return weeks.map((week, weekIndex) => (
    <div
      key={weekIndex}
      className="grid grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-7"
    >
      {[...Array(7)].map((_, dayIndex) => {
        const day = addDays(startOfWeek(week, { weekStartsOn: 1 }), dayIndex);
        const isCurrentMonth = isSameMonth(day, start);
        const isToday = isSameDay(day, new Date());
        const dayString = format(day, "yyyy-MM-dd");

        return (
          <ShiftCart
            key={dayIndex}
            dayIndex={dayIndex}
            start={start}
            end={end}
            week={week}
            employees={employees}
          />
        );
      })}
    </div>
  ));
};
