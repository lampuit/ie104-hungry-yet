import React from "react";
import { CheckCircle, Truck, CookingPot, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const steps: { status: string; label: string; icon: React.ElementType }[] = [
  { status: "accepted", label: "Xác nhận", icon: Bell },
  { status: "cooking", label: "Đang nấu", icon: CookingPot },
  { status: "ready", label: "Sẵn sàng", icon: Truck },
  { status: "delivered", label: "Đã giao", icon: CheckCircle },
];

export function InvoiceTracking({
  status,
  id,
  deliveryTime,
  updatedAt,
}: {
  status: string;
  id: string;
  deliveryTime: number;
  updatedAt: Date;
}) {
  const currentStep = steps.findIndex((step) => step.status === status);
  const estimatedDelivery = deliveryTime - (currentStep + 1) * 10;

  return status === "pending" ? (
    <div className="flex w-full max-w-2xl justify-center overflow-hidden rounded-md border p-6">
      <h2 className="text-xl font-semibold">Đơn Hàng Đang Xử Lý</h2>
    </div>
  ) : (
    <div className="w-full max-w-2xl overflow-hidden rounded-md border bg-white">
      <div className="p-6">
        <h2 className="mb-6 flex items-center gap-2 text-xl">
          <span className="font-semibold">Hóa Đơn:</span>#{id}
          <CopyButton content={id} />
        </h2>
        {estimatedDelivery > 0 && (
          <p className="mb-6 text-gray-600">
            Giao hàng dự kiến: {estimatedDelivery}
          </p>
        )}

        <div className="relative mb-6">
          <div className="absolute left-4 right-4 top-8 hidden h-1 -translate-y-3.5 transform bg-gray-200 sm:block"></div>
          <div
            className="absolute left-4 right-4 top-8 hidden h-1 -translate-y-3.5 transform bg-green-500 transition-all duration-500 ease-in-out sm:block"
            style={{ width: `${(currentStep / (steps.length - 1)) * 90}%` }}
          />
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStep;
              const isActive = index === currentStep;

              return (
                <div key={step.status} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ease-in-out",
                      isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white",
                      isActive && "ring-4 ring-blue-200",
                    )}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm font-medium",
                      isCompleted ? "text-green-500" : "text-gray-500",
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-center text-muted-foreground">
          Cập nhập:{" "}
          {new Date(updatedAt).toLocaleString("vi-VN", {
            timeZone: "UTC",
          })}
        </div>
      </div>
    </div>
  );
}
