import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { addDays, startOfWeek, isSameMonth, format, isSameDay } from "date-fns";
import { createUserWorkShift, deleteUserWorkShift } from "@/lib/actions/shift";
import { cn } from "@/lib/utils";
import { getAllShift, getUserWorkShift } from "@/lib/data";
import useSWR from "swr";
import { UUID } from "crypto";

const fetcherShift = async () => getAllShift();
const fetcherUserWorkShift = async () => getUserWorkShift();

export function ShiftCart({
  dayIndex,
  start,
  end,
  week,
  employees,
}: {
  dayIndex: number;
  start: Date;
  end: Date;
  week: Date;
  employees: any;
}) {
  const day = addDays(startOfWeek(week, { weekStartsOn: 1 }), dayIndex);
  const isCurrentMonth = isSameMonth(day, start);
  const isToday = isSameDay(day, new Date());
  const dayString = format(day, "yyyy-MM-dd");

  const { data: shifts } = useSWR("shifts", fetcherShift);
  const { data: userWorkShifts } = useSWR("userWorkShifts", fetcherUserWorkShift);

  const [selectedEmployees, setSelectedEmployees] = useState<{
    [key: string]: { employee1: string | null; employee2: string | null };
  }>({});

  useEffect(() => {
    if (userWorkShifts) {
      const initialSelection = userWorkShifts.reduce((acc: any, shift: any) => {
        const workDate = format(new Date(shift.workDate), "yyyy-MM-dd");
        if (!acc[workDate]) acc[workDate] = { employee1: null, employee2: null };
        acc[workDate][shift.shiftId === shifts?.[0]?.id ? "employee1" : "employee2"] = shift.userId.toString();
        return acc;
      }, {});
      setSelectedEmployees(initialSelection);
    }
  }, [userWorkShifts, shifts]);

  const handleEmployeeChange = async (
    date: string,
    employeeId: string,
    selectType: "employee1" | "employee2",
    shiftId: string
  ) => {
    setSelectedEmployees((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [selectType]: employeeId,
      },
    }));

    const data = new FormData();
    data.append("id", `${date}-${shiftId}`);
    data.append("userId", employeeId);
    data.append("shiftId", shiftId);
    data.append("workDate", date);
    await createUserWorkShift(data);
  };

  return (
    <Card
      className={cn(
        "h-40 overflow-hidden",
        !isCurrentMonth && "opacity-50",
        isToday && "border-primary"
      )}
    >
      <CardHeader className="p-2">
        <CardTitle className="flex justify-between text-sm font-bold">
          <div>{format(day, "d")}</div>
          <div>
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(day)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-4 ">
        <div className="flex flex-col justify-center items-center gap-4 mt-2">

        {/* Dropdown 1 */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className={cn("h-8 w-full text-xs border rounded px-2", {
            "hidden": !isCurrentMonth,
            "bg-yellow-200": selectedEmployees[dayString]?.employee1,
          })}>
            {selectedEmployees[dayString]?.employee1
              ? employees.find(
                (e: any) =>
                  e.id.toString() === selectedEmployees[dayString]?.employee1
              )?.name
              : "Sáng"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 text-red-500">
            {employees.map((employee: any) => (
              <DropdownMenuItem
                key={employee.id}
                onSelect={() =>
                  shifts &&
                  handleEmployeeChange(
                    dayString,
                    employee.id.toString(),
                    "employee1",
                    shifts[0]?.id.toString()
                  )
                }
              >
                {employee.name}
              </DropdownMenuItem>
            ))}
              {
              selectedEmployees[dayString]?.employee1 &&
              <DropdownMenuItem onSelect={async () => {
                await deleteUserWorkShift(`${dayString}-${shifts?.[0]?.id.toString()}`);
              }}>
              Trống
            </DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown 2 */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className={cn("h-8 w-full text-xs border rounded px-2 bg-muted", {
            "hidden": !isCurrentMonth,
            "bg-blue-200": selectedEmployees[dayString]?.employee2
          })}>
            {selectedEmployees[dayString]?.employee2
              ? employees.find(
                (e: any) =>
                  e.id.toString() === selectedEmployees[dayString]?.employee2
              )?.name
              : "Chiều"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50">
            {employees.map((employee: any) => (
              <DropdownMenuItem
                key={employee.id}
                onSelect={() =>
                  shifts &&
                  handleEmployeeChange(
                    dayString,
                    employee?.id.toString(),
                    "employee2",
                    shifts[1]?.id.toString()
                  )
                }
              >
                {employee?.name}
              </DropdownMenuItem>
            ))}
            {
              selectedEmployees[dayString]?.employee2 &&
              <DropdownMenuItem
              key={null}
              onSelect={async () => {
                await deleteUserWorkShift(`${dayString}-${shifts?.[1].id.toString()}`);
              }}>
              Trống
            </DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

      </CardContent>
    </Card>
  );
}
