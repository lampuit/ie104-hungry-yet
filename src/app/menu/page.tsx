"use client";
import { useEffect, useState } from "react";
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
const fetcherCategory = async (): Promise<
  { id: string; name: string; imageUrl: string | null }[]
> => {
  return CategoryFetcher();
};

export default function MenuPage() {
  // Kiểm tra session
  const { data, isLoading, error } = useSWR("fetcherKey", fetcherCategory);

  // ID của danh mục được chọn
  const [clickedIndex, setClickedIndex] = useState<string>("");
  const [dishesList, setDishesList] = useState<Dish[]>([]); // Danh sách món ăn được lưu trữ dưới dạng 1 mảng các đối tượng Dish
  const sessionClickIndex = localStorage.getItem("clickedIndex") ? (localStorage.getItem("clickedIndex")) : "";
  const categories = data || [];

  // Hàm lấy danh sách món ăn theo danh mục cụ thể (clickedIndex)
  const getDishesByCategoryId = async (clickedIndex: string) => {
    try {
      const response = await getProductByCategoryId(clickedIndex, 1, 6);
      setDishesList(
        response?.records.map((item: any) => ({
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

  // Tự động gọi API khi trang được tải - khi người dùng chọn danh mục khác (clickedIndex thay đổi)
  useEffect(() => {
    if (data) {
      // Gán danh mục mặc định là "Khai vị" hoặc danh mục được chọn từ trang Homepage
      if (sessionClickIndex) {
        setClickedIndex(sessionClickIndex);
      } else {
        setClickedIndex(data[0]?.id);
      }
    }

    if (clickedIndex) {
      getDishesByCategoryId(clickedIndex);
      localStorage.setItem("clickedIndex", clickedIndex); // Persist clickedIndex
    }

  }, [data, clickedIndex]);


  // Hàm xử lý khi người dùng click vào một danh mục khác
  const handleCategoryClick = (categoryId: string) => {
    setClickedIndex(categoryId);
    localStorage.setItem("clickedIndex", categoryId);
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
                handleCategoryClick(category.id);
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