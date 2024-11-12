"use client";

import React, { useState } from "react";
import {
  addDays,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  startOfWeek,
  isSameMonth,
  format,
} from "date-fns";
import { vi } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "lucide-react";

const shifts = [
  { id: 1, name: "Ca sáng", time: "8:00 - 16:00" },
  { id: 2, name: "Ca chiều", time: "12:00 - 20:00" },
];

const employees = [
  { id: 1, name: "Nguyễn Văn A" },
  { id: 2, name: "Nguyễn Văn B" },
  { id: 3, name: "Trần Thị C" },
  { id: 4, name: "Lê Văn D" },
];

export default function ShiftManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [employeeSchedule, setEmployeeSchedule] = useState<{
    [key: string]: { [shiftId: number]: string[] };
  }>({});

  const renderCalendar = (year: number, month: number) => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

    return weeks.map((week, weekIndex) => (
      <div key={weekIndex} className="flex">
        {[...Array(7)].map((_, dayIndex) => {
          const day = addDays(startOfWeek(week, { weekStartsOn: 1 }), dayIndex);
          const isCurrentMonth = isSameMonth(day, start);

          return (
            <div
              key={dayIndex}
              className={cn(
                "w-12 h-12 flex items-center justify-center border rounded-md",
                isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"
              )}
            >
              <span>{format(day, "d")}</span>
            </div>
          );
        })}
      </div>
    ));
  };

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  return (
    <div className="mx-auto w-full p-4">
      <h1 className="mb-4 text-2xl font-bold">Quản lý ca làm việc</h1>
      <div className="mb-4 flex items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "LLLL yyyy", { locale: vi })
              ) : (
                <span>Chọn tháng</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(day) => day && setSelectedDate(day)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSelectedDate((prevDate) => addDays(prevDate, -30))
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedDate((prevDate) => addDays(prevDate, 30))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-7 gap-1 font-semibold text-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="w-12 text-sm text-gray-600">
              {day}
            </div>
          ))}
        </div>
        {renderCalendar(selectedYear, selectedMonth)}
      </div>
    </div>
  );
}
