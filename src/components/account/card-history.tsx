"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Bike,
  ChevronRight,
  PenLine,
  PhoneCall,
  RefreshCcw,
  Star,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import React, { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { getInvoiceDetail, getUserById } from "@/lib/data";
import useSWR from "swr";
import { InformationForm } from "@/components/checkout/information-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateInvoices, updateStatus } from "@/lib/actions/invoice";
import { createCart } from "@/lib/actions/cart";
import { Textarea } from "../ui/textarea";
import { createRatings } from "@/lib/actions/rating";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Invoice {
  id: string;
  customerId: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
}

const fetcherInvoiceDetail = async (invoiceId: string) => {
  if (!invoiceId) return null;
  return await getInvoiceDetail(invoiceId);
};

const getUserInfo = async (userId: string) => {
  return await getUserById(userId);
};

const formSchema = z.object({
  invoiceId: z.string(),
  addressDelivery: z.string().min(1, "Địa chỉ không được để trống"), // Trường bắt buộc
  phone: z.string().regex(/^(\+84|0)\d{9,10}$/, "Số điện thoại không hợp lệ"), // Validation cho số điện thoại Việt Nam
  note: z.string().max(200, "Ghi chú không được vượt quá 200 ký tự"), // Giới hạn độ dài ghi chú
});

export function CardHistory({ invoice }: { invoice: Invoice }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [reviews, setReviews] = useState<{ [key: string]: string }>({});
  const [isAnonymous, setIsAnonymous] = useState(false);

  const pathname = usePathname();
  const isDeliveredPage = pathname.includes("/account/history/delivered");
  const isCancelPage = pathname.includes("/account/history/cancel");
  const isReadyPage = pathname.includes("/account/history/ready");
  const isCookingPage = pathname.includes("/account/history/cooking");
  const isAcceptedPage = pathname.includes("/account/history/accepted");

  const router = useRouter();
  const { toast } = useToast();

  // State for managing selected reasons
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const { data: invoiceData, error } = useSWR(
    invoice.id,
    fetcherInvoiceDetail,
    {
      revalidateOnFocus: true,
    },
  );

  const { data: shipperInfo } = useSWR(
    invoiceData?.shipperId || "",
    getUserInfo,
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching invoice data:", error);
    }
  }, [error]);

  const convertToVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const splitInvoiceId = (invoiceId: string) =>
    invoiceId?.split("-").join("").substr(0, 15);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceId: invoice.id,
      addressDelivery: "",
      phone: "",
      note: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("deliveryAddress", values.addressDelivery);
      formData.append("phone", values.phone);
      formData.append("note", values.note);
      formData.append("id", invoice.id);

      const result = await updateInvoices(formData);
      if (result.success) {
        toast({
          title: result.message,
        });
        setIsDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: result.message,
        });
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast({
        variant: "destructive",
        title: "Cập nhật thông tin đơn hàng thất bại",
      });
    }
  };

  const cancelOrder = async () => {
    try {
      const formData = new FormData();
      formData.append("id", invoice.id);
      formData.append("status", "cancelled");
      formData.append("reason", selectedReasons.join(", "));

      const result = await updateStatus(formData);
      if (result.success) {
        toast({
          title: result.message,
        });
        setConfirmDelete(false);
        router.push("/account/history/cancel");
      } else {
        toast({
          variant: "destructive",
          title: result.message,
        });
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast({
        variant: "destructive",
        title: "Cập nhật thông tin đơn hàng thất bại",
      });
    }
  };

  const handleBuyAgain = async () => {
    try {
      for (const order of invoiceData?.orders || []) {
        const formData = new FormData();
        formData.append("userId", invoice.customerId || "");
        formData.append("productId", order.products.id || "");
        formData.append("quantity", order.quantity.toString() || "");
        await createCart(formData);
      }
      toast({
        title: "Thêm vào giỏ hàng thành công!",
        description: "Tất cả sản phẩm đã duoc thêm vào giỏ hàng của bạn.",
        action: (
          <ToastAction
            altText="Xem giỏ hàng"
            onClick={() => router.push("/menu/cart")}
          >
            Xem
          </ToastAction>
        ),
      });
      router.push("/menu/cart");
    } catch (error) {
      console.error("Error creating cart:", error);
      toast({
        variant: "destructive",
        title: "Thêm sản phẩm vào giỏ hàng thất bại",
      });
    }
  };

  const handleCheckboxChange = (reason: string) => {
    setSelectedReasons(
      (prev) =>
        prev.includes(reason)
          ? prev.filter((item) => item !== reason) // Remove reason if already selected
          : [...prev, reason], // Add reason if not already selected
    );
  };

  const handleSubmitRatings = async () => {
    try {
      for (const [productId, rating] of Object.entries(ratings)) {
        const formData = new FormData();
        formData.append("userId", invoice.customerId || "");
        formData.append("productId", productId);
        formData.append("star", rating.toString());
        formData.append("review", reviews[productId] || "");
        formData.append("isAnonymous", isAnonymous ? "1" : "0");
        await createRatings(formData);
      }
      toast({
        title: "Đánh giá đã được gửi thành công",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting ratings:", error);
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra khi gửi đánh giá",
      });
    }
  };

  const handleRating = (productId: string, rating: any) => {
    setRatings((prev) => ({ ...prev, [productId]: rating }));
  };

  const handleReviewChange = (productId: string, review: any) => {
    setReviews((prev) => ({ ...prev, [productId]: review }));
  };

  return (
    <section className="flex w-full flex-col gap-2 rounded bg-white p-3 shadow-md sm:p-5">
      {/* Thông tin đơn hàng */}
      <div className="flex flex-col gap-1 px-2 lg:px-10">
        {isReadyPage ? (
          <div className="flex flex-col gap-1 text-xs">
            <p className="flex items-center gap-1">
              <Bike className="h-4 w-4" />
              <span>{shipperInfo?.[0]?.name}</span>
            </p>
            <p className="flex items-center gap-1">
              <PhoneCall className="h-4 w-4" />
              <span>{shipperInfo?.[0]?.phone}</span>
            </p>
          </div>
        ) : isCancelPage ? (
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1">
              Mã đơn hàng:
              <span className="font-semibold">
                {splitInvoiceId(invoiceData?.id || "").toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              Lý do hủy:{" "}
              <span className="font-semibold">{invoiceData?.reason}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm">
            Mã đơn hàng:
            <span className="font-semibold">
              {splitInvoiceId(invoiceData?.id || "").toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex flex-col items-start gap-1 text-xs text-gray-500 md:items-end">
          {isReadyPage ? (
            <p>
              Trạng thái:{" "}
              <span className="font-semibold text-green-500">Đang giao</span>
            </p>
          ) : isCancelPage ? (
            <p>
              Trạng thái:{" "}
              <span className="font-semibold text-red-500">Đã hủy</span>
            </p>
          ) : isCookingPage ? (
            <p>
              Trạng thái:{" "}
              <span className="font-semibold text-amber-500">
                Đang chuẩn bị
              </span>
            </p>
          ) : isAcceptedPage ? (
            <p>
              Trạng thái:{" "}
              <span className="font-semibold text-amber-500">Đã xác nhận</span>
            </p>
          ) : isDeliveredPage ? (
            <p>
              Trạng thái:{" "}
              <span className="font-semibold text-green-500">Hoàn thành</span>
            </p>
          ) : (
            <p>
              Trạng thái:{" "}
              <span className="font-semibold text-amber-500">Chờ xác nhận</span>
            </p>
          )}
          <p className="text-xs text-gray-500">
            Ngày đặt hàng:{" "}
            <span className="font-semibold">
              {invoice?.createdAt.toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      {/* Chi tiết đơn */}
      <div className="flex w-full flex-col gap-1 px-2 lg:px-10">
        <div
          className="flex items-center justify-between rounded border-2 p-2"
          key={invoiceData?.orders[0].invoiceId}
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative hidden sm:block sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-40 lg:w-40">
              <Image
                src={
                  invoiceData?.orders[0].products.imageUrl ||
                  "/path/to/default/image.jpg"
                }
                alt="..."
                fill
                sizes="100%"
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="rounded shadow"
              ></Image>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-1 sm:gap-2">
                <p className="text-sm font-semibold sm:text-base md:text-lg">
                  {invoiceData?.orders[0].products.name}
                </p>
                <span className="text-xs sm:text-sm md:text-base">
                  {invoiceData?.orders[0].products.category?.name}
                </span>
                <span className="flex gap-2 text-xs sm:text-sm md:text-base">
                  Số lượng: <span>x{invoiceData?.orders[0].quantity}</span>
                </span>
              </div>
            </div>
          </div>
          <span className="flex gap-2 pr-4 text-sm sm:text-base">
            Giá:{" "}
            <span className="font-medium text-red-500">
              {convertToVND(invoiceData?.orders[0].products.price ?? 0)}
            </span>
          </span>
        </div>

        <div className="flex justify-center">
          <Button
            variant={"ghost"}
            onClick={() =>
              router.push(`/account/order-detail?invoiceId=${invoice.id}`)
            }
          >
            Xem chi tiết <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Trạng thái và nút hành động */}
      <div className="flex flex-col justify-end gap-2 px-2 lg:px-10">
        <p className="flex justify-end gap-2 text-lg sm:text-xl md:text-xl">
          Tổng tiền:{" "}
          <span className="font-bold text-red-500">
            {convertToVND(invoice?.totalAmount)}
          </span>
        </p>
        {isCookingPage ||
          isAcceptedPage ||
          isCancelPage ||
          isAcceptedPage ||
          isReadyPage ? (
          <></>
        ) : isDeliveredPage ? (
          <div className="flex justify-end gap-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="flex w-[1024px] flex-col gap-4">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    Đánh giá sản phẩm
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[360px] pr-4">
                  <div className="flex flex-col gap-4">
                    {invoiceData?.orders?.map((order, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 rounded-md border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={order.products.imageUrl}
                            alt={order.products.name}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                          <div>
                            <h3 className="font-semibold">
                              {order.products.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {order.products.category?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Đánh giá:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="h-5 w-5 cursor-pointer stroke-yellow-400"
                                fill={
                                  star <= (ratings[order.products.id] || 0)
                                    ? "gold"
                                    : "none"
                                }
                                onClick={() =>
                                  handleRating(order.products.id, star)
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <Textarea
                          placeholder="Nhập đánh giá của bạn về sản phẩm này"
                          value={reviews[order.products.id] || ""}
                          onChange={(e: any) =>
                            handleReviewChange(
                              order.products.id,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ))}
                    <div className="mt-4 flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        onCheckedChange={(checked) =>
                          setIsAnonymous(checked === true)
                        }
                      />
                      <label
                        htmlFor="anonymous"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Đánh giá ẩn danh
                      </label>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-amber-500"
                    onClick={handleSubmitRatings}
                    disabled={Object.keys(ratings).length < (invoiceData?.orders?.length || 0)}
                  >
                    Lưu đánh giá
                  </Button>
                </DialogFooter>
              </DialogContent>

              {!invoiceData?.isRating ? (<DialogTrigger className="flex items-center justify-center gap-2 rounded-md border border-black p-3 text-xs font-semibold hover:bg-gray-100">
                <Star className="h-4 w-4" /> Đánh giá
              </DialogTrigger>) : ('')}

            </Dialog>
            <Button
              onClick={() => {
                handleBuyAgain();
              }}
              className="bg-amber-500"
            >
              <RefreshCcw /> Mua lại
            </Button>
          </div>
        ) : isCancelPage ? (
          <div className="flex justify-end gap-6">
            <Button className="bg-amber-500" onClick={() => handleBuyAgain()}>
              <RefreshCcw /> Mua lại
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-6">
            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
              <DialogTrigger>
                <Button
                  variant={"outline"}
                  className="text-gray-400 hover:bg-red-500 hover:text-white"
                >
                  <X className="hover:text-white" />
                  Hủy đơn
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-semibold">
                    Lý do hủy đơn
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 p-2">
                  {[
                    "Tôi muốn thêm/thay đổi mã giảm giá",
                    "Tôi muốn thay đổi món ăn",
                    "Tôi không còn nhu cầu mua",
                    "Không tìm thấy lý do phù hợp",
                  ].map((reason) => (
                    <div
                      key={reason}
                      className="mt-4 flex items-center space-x-2"
                    >
                      <Checkbox
                        id={reason}
                        checked={selectedReasons.includes(reason)}
                        onCheckedChange={() => handleCheckboxChange(reason)}
                      />
                      <label
                        htmlFor={reason}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {reason}
                      </label>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button onClick={() => cancelOrder()} className="bg-red-500">
                    Hủy đơn
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger>
                <Button className="bg-amber-500">
                  <PenLine /> Thay đổi thông tin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-semibold">
                    Sửa thông tin nhận hàng
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <InformationForm form={form} />
                    <div className="mt-4 flex justify-center">
                      <Button className="align-center" type="submit">
                        Lưu thông tin
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
}
