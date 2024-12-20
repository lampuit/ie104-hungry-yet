import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Truck } from "lucide-react";
import { getAllCategory } from "@/lib/data";
import useSWR from "swr";

const categoriesFectcher = async () => {
  return getAllCategory();
};

export default function Footer() {
  const { data: categories, error } = useSWR("categories", categoriesFectcher);
  const handleCategoryClick = (categoryId: string) => {
    localStorage.setItem("category", categoryId);
  };

  return (
    <footer className="relative bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <Truck />
              <h1 className="px-2 font-bold sm:text-xl md:text-2xl">
                Hungry Yet?
              </h1>
            </div>
            <p className="text-base">
              Mang hương vị Việt Nam đến từng bữa ăn của bạn.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-amber-600 hover:text-amber-800">
                <span className="sr-only">Facebook</span>
                <Facebook />
              </Link>
              <Link href="#" className="text-amber-600 hover:text-amber-800">
                <span className="sr-only">Instagram</span>
                <Instagram />
              </Link>
              <Link href="#" className="text-amber-600 hover:text-amber-800">
                <span className="sr-only">Twitter</span>
                <Twitter />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Thực đơn
                </h3>
                <ul className="mt-4 space-y-4">
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/menu`}
                        className="text-base hover:text-amber-500"
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Hỗ trợ
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base hover:text-amber-700">
                      Tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base hover:text-amber-700">
                      Đặt hàng
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base hover:text-amber-700">
                      Giao hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-base hover:text-amber-700"
                    >
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Công ty
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-base hover:text-amber-700"
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/exhibition"
                      className="text-base hover:text-amber-700"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base hover:text-amber-700">
                      Đối tác
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base hover:text-amber-700">
                      Tuyển dụng
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Pháp lý
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base hover:text-amber-700">
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base hover:text-amber-700">
                      Điều khoản sử dụng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-amber-200 pt-8">
          <p className="text-center text-base">
            &copy; 2024 Công ty TNHH IE104 ẩm thực UIT.
          </p>
        </div>
      </div>
    </footer>
  );
}
