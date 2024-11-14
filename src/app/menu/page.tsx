"use client";
import { useEffect, useState } from "react";
import { Search } from "@/components/menu/search";
import { Category } from "@/components/menu/category";
import { DishList } from "@/components/menu/dish-list";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getProductByCategoryId } from "@/lib/data";
import { CategoryFetcher } from "@/components/menu/category";

// Đối tượng mô tả một món ăn
interface Dish {
  name: string;
  image: string;
  price: number;
  des: string;
  published: boolean;
}

export default function MenuPage() {
  // ID của danh mục được chọn
  const [clickedIndex, setClickedIndex] = useState<string>(() => {
    // Initialize clickedIndex from localStorage
    return localStorage.getItem("clickedIndex") || "";
  });
  const [dishesList, setDishesList] = useState<Dish[]>([]); // Danh sách món ăn được lưu trữ dưới dạng 1 mảng các đối tượng Dish
  const [categories, setCategories] = useState<any[]>([]); // Danh sách categories

  // Nhận danh sách categories và đặt category mặc định (được chọn khi tải trang) là "Khai vị"
  const fetchCategories = async () => {
    try {
      const response = await CategoryFetcher(); // Lấy danh sách categories
      // Sắp xếp danh mục theo thứ tự ưu tiên (cho hiển thị)
      setCategories(response);
      // Gán danh mục mặc định là "Khai vị"
      const defaultCategory = response.find((category) => category.name === "Khai vị");
      if (defaultCategory && !clickedIndex) {
        setClickedIndex(defaultCategory.id);
        localStorage.setItem("clickedIndex", defaultCategory.id); // Persist default category
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Hàm lấy danh sách món ăn theo danh mục cụ thể (clickedIndex)
  const getDishesByCategoryId = async (clickedIndex: string) => {
    try {
      const response = await getProductByCategoryId(clickedIndex);
      console.log("HI: ", response);
      // Biến đổi dữ liệu trả về đúng định dạng cần cho DishList
      setDishesList(
        response.map((item) => ({
          name: item.name,
          image: item.imageUrl,
          published: item.isPublish,
          price: item.price,
          des: item.description,
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Tự động gọi API khi người dùng chọn danh mục khác (clickedIndex thay đổi)
  useEffect(() => {
    if (clickedIndex) {
      getDishesByCategoryId(clickedIndex);
      localStorage.setItem("clickedIndex", clickedIndex); // Persist clickedIndex
    }
  }, [clickedIndex]);

  // Tự động gọi API khi trang được tải
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="w-screen">
      <header className="mt-8">
        <Search />
      </header>

      <section className="flex flex-col items-center">
        <section className="sticky">
          <Category
            clickedIndex={clickedIndex}
            setClickedIndex={setClickedIndex}
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
