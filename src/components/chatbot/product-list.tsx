import { Button } from "@/components/ui/button";
import Image from "next/image";

function DongFormat(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

export function ProductList({
  name,
  products,
  append,
}: {
  name: string;
  products: any;
  append: any;
}) {
  return products.length > 0 ? (
    <div className="w-full max-w-md space-y-4 rounded-md border p-4">
      <h2 className="text-lg font-semibold">Danh Sách Món {name}</h2>
      {products.map((product: any) => (
        <div
          className="flex items-center space-x-4 rounded border p-2"
          key={product.id}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={100}
            height={100}
            className="rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">{DongFormat(product.price)}</p>
          </div>
          <Button
            size="sm"
            className="z-50"
            onClick={() =>
              append({
                role: "assistant",
                content: `Người dùng gọi món ${product.id}`,
                appear: false,
              })
            }
          >
            Thêm
          </Button>
        </div>
      ))}
    </div>
  ) : null;
}
