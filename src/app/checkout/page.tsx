import { columns } from "@/components/payment/columns";
import { DataTable } from "@/components/payment/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";

const order = {
  id: "123",
  userId: "123123",
  userName: "Trần Minh Tùng",
  userPhone: "0396027123",
  deliveryAddress:
    "Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM, Đường Hàn Thuyên, Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh",
};

const products = [
  {
    id: "1231312",
    name: "Cơm bò",
    imageUrl:
      "https://4dexrf4t9f6tdt6j.public.blob.vercel-storage.com/jennifer-schmidt-zOlQ7lF-3vs-unsplash-sdybXOdRQQf4oIlgfp7I7mQPspabEd.jpg",
    quantity: 3,
    price: 500000,
  },
  {
    id: "1231312",
    name: "Cơm bò",
    imageUrl:
      "https://4dexrf4t9f6tdt6j.public.blob.vercel-storage.com/jennifer-schmidt-zOlQ7lF-3vs-unsplash-sdybXOdRQQf4oIlgfp7I7mQPspabEd.jpg",
    quantity: 3,
    price: 500000,
  },
];

export default function Payment() {
  return (
    <div className="space-y-8 p-20">
      <Card className="flex items-center justify-between">
        <div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin size={32} />
              Địa Chỉ Nhận Hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-1 text-lg">
            <div className="flex font-semibold">
              {order.userName} | {order.userPhone}
              <div className="ml-10 flex items-center space-x-2">
                <Badge>Văn phòng</Badge>
                <Badge variant="outline">Mặc định</Badge>
              </div>
            </div>
            {order.deliveryAddress}
          </CardContent>
        </div>
        <div className="pr-10 font-semibold text-blue-500">Thay đổi</div>
      </Card>
      <Card>
        <CardTitle></CardTitle>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Thông Tin Đơn Hàng </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex justify-between">
            <div>Phương Thức Thanh Toán</div>
            <div className="text-xl">Thanh toán qua ví điện tử Momo</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-end">
          <div className="max-w-sm bg-white p-4">
            <h2 className="mb-4 text-lg font-semibold">Hóa đơn</h2>

            <div className="mb-2 flex justify-between border-b pb-2">
              <span className="text-gray-600">Tạm tính:</span>
              <span className="font-medium">100.000₫</span>
            </div>

            <div className="mb-2 flex justify-between border-b pb-2">
              <span className="text-gray-600">Giảm giá:</span>
              <span className="font-medium">0₫</span>
            </div>

            <div className="mb-4 flex justify-between border-b pb-2">
              <span className="text-gray-600">Khuyến mãi đã nhận được:</span>
              <span className="font-medium">0₫</span>
            </div>

            <p className="mb-4 text-sm text-gray-500">
              Quý khách vui lòng kiểm tra giỏ hàng trước khi thanh toán
            </p>

            <div className="mt-2 flex justify-between border-t pt-2">
              <span className="text-lg font-semibold">Tổng cộng:</span>
              <span className="text-lg font-semibold">100.000₫</span>
            </div>

            <p className="mt-2 text-sm text-gray-500">(Đã bao gồm VAT)</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Đặt hàng</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
