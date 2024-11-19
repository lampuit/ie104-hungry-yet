"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { Search } from "@/components/menu/search";
import { Category } from "@/components/menu/category";
import { DishList } from "@/components/menu/dish-list";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getProductByCategoryId } from "@/lib/data";
import { CategoryFetcher } from "@/components/menu/category";
import { getSession } from "@/lib/auth-client";
import useSWR from "swr";

// Đối tượng mô tả một món ăn
interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
  des: string;
  published: boolean;
}

// Lấy session
export const fetcher = async () => {
  const category = CategoryFetcher();
  return category;
};

  // Nhận danh sách categories và đặt category mặc định (được chọn khi tải trang) là "Khai vị"
  // export const fetchCategories = async () => {
  //  return  CategoryFetcher(); // Lấy danh sách categories
  // };

export default function MenuPage() {
  // Kiểm tra session
  const { data } = useSWR("fetcherKey", fetcher);

  // Lấy tên danh mục sau khi click vào từ trang Homepage
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryName = searchParams.get("category");

  // ID của danh mục được chọn
  const [clickedIndex, setClickedIndex] = useState<string>("");
  const [dishesList, setDishesList] = useState<Dish[]>([]); // Danh sách món ăn được lưu trữ dưới dạng 1 mảng các đối tượng Dish
  // const [categories, setCategories] = useState<any[]>([]); // Danh sách categories

  
  const categories = data || [];

  // Hàm lấy danh sách món ăn theo danh mục cụ thể (clickedIndex)
  const getDishesByCategoryId = async (clickedIndex: string) => {
    try {
      const response = await getProductByCategoryId(clickedIndex);
      setDishesList(
        response.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.imageUrl,
          published: item.isPublish,
          price: item.price,
          des: item.description,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Tự động gọi API khi người dùng chọn danh mục khác (clickedIndex thay đổi)

  const fetchCategories =  () => {
      // Gán danh mục mặc định là "Khai vị" hoặc danh mục được chọn từ trang Homepage
      const defaultCategory = categories.find((category) => category.name === (categoryName || "Khai vị"));
      if (defaultCategory) {
        setClickedIndex(defaultCategory.id);
      }
  };
  // Tự động gọi API khi trang được tải
  useEffect(() => {
    fetchCategories()
    if (clickedIndex) {
      getDishesByCategoryId(clickedIndex);
    }

    if (categoryName ) {
      const category = Array.isArray(categories) ? categories.find((cat:any) => cat.name === categoryName) : undefined;
      if (category) {
        setClickedIndex(category.id);
      }
    }
    
  }, [clickedIndex, categoryName]);

  // Hàm xử lý khi người dùng click vào một danh mục khác
  const handleCategoryClick = (categoryName: string) => {
    router.push(`/menu?category=${categoryName}`);
  };

  return (
    <main className="w-screen">
      <header className="mt-8">
        <Search />
      </header>

      <section className="flex flex-col items-center">
        <section className="sticky top-0 bg-white w-full">
          <Category
            clickedIndex={clickedIndex}
            setClickedIndex={(index) => {
              const category = Array.isArray(categories) ? categories.find((cat) => cat.id === index) : undefined;
              if (category) {
                handleCategoryClick(category.name);
              }
            }}
          />
        </section>

        <section className="mb-10 max-w-screen-xl">
          {dishesList.length === 0 || dishesList.every((dish) => !dish.published) ? (
            <p>Không có sản phẩm nào</p>
          ) : (
            <DishList dishesList={dishesList} />
          )}
        </section>
        <Pagination className="mb-20">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      <footer className="h-80 bg-black"></footer>
    </main>
  );
}