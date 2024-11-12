import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { addDays, startOfWeek, isSameMonth, format, isSameDay } from "date-fns";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
const employees = [
  { id: 1, name: "Nguyễn Văn A" },
  { id: 2, name: "Nguyễn Văn B" },
  { id: 3, name: "Trần Thị C" },
  { id: 4, name: "Lê Văn D" },
];

export function ShiftCart({
  dayIndex,
  start,
  end,
  week,
}: {
  dayIndex: number;
  start: Date;
  end: Date;
  week: Date;
}) {
  const [selectedEmployees, setSelectedEmployees] = useState<{
    [key: string]: number;
  }>({});

  const day = addDays(startOfWeek(week, { weekStartsOn: 1 }), dayIndex);
  const isCurrentMonth = isSameMonth(day, start);
  const isToday = isSameDay(day, new Date());
  const dayString = format(day, "yyyy-MM-dd");

  const handleEmployeeChange = (date: string, employeeId: string) => {
    setSelectedEmployees((prev) => ({
      ...prev,
      [date]: Number(employeeId),
    }));

    console.log("selectedEmployees", selectedEmployees);
  };
  return (
    <Card
      className={cn(
        "h-32 overflow-hidden",
        !isCurrentMonth && "opacity-50",
        isToday && "border-primary",
      )}
    >
      <CardHeader className="p-2">
        <CardTitle className="flex justify-between text-sm font-normal">
          <div>{format(day, "d")}</div>
          <div>
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(day)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="h-8 w-full text-xs">
            {selectedEmployees[dayString]
              ? employees.find((e) => e.id === selectedEmployees[dayString])
                  ?.name
              : "Select"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50">
            {employees.map((employee) => (
              <DropdownMenuItem
                key={employee.id}
                onSelect={() =>
                  handleEmployeeChange(dayString, employee.id.toString())
                }
              >
                {employee.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {selectedEmployees[dayString] && (
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <User className="mr-1 h-3 w-3" />
            {employees.find((e) => e.id === selectedEmployees[dayString])?.name}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
