"use client";

import React, { useState } from "react";
import { addDays, format } from "date-fns";
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
import { ShiftCalendar } from "@/components/shift/calendar";
import { Calendar } from "@/components/ui/calendar";
import { getAllEmployee } from "@/lib/data";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/loading-spinner";

const fetcher = async () => {
  return getAllEmployee();
};

export default function ShiftManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  const { data, error } = useSWR("employees", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const employees = data || [];

  console.log("employees", employees)

  return (
    <div className="container p-4">
      <h1 className="mb-6 text-3xl font-bold">Quản lý ca làm việc</h1>
      <div className="mb-6 flex items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
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

      <ShiftCalendar year={selectedYear} month={selectedMonth} employees={employees} />

    </div>
  );

}
