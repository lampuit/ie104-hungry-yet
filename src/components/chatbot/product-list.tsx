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
    <div className="w-[500px] space-y-4 rounded-md border p-4">
      <h2 className="text-lg font-semibold">Danh Sách Món {name}</h2>
      {products.map((product: any) => (
        <div
          key={product.id}
          className="flex items-center space-x-4 rounded border p-2"
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
            variant="outline"
            className="z-50"
            onClick={async () =>
              append({
                role: "user",
                content: `Tôi muốn gọi món ${product.name}`,
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
