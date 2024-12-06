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
import LoadingSpinner from "@/components/ui/loading-spinner";

interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
  des: string;
  published: boolean;
}

const fetcherCategory = async (): Promise<
  { id: string; name: string; imageUrl: string | null }[]
> => {
  return CategoryFetcher();
};

export default function MenuPage() {
  const [page, setPage] = useState<number>(1);
  const limit = process.env.NEXT_PUBLIC_PAGE_SIZE ? parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE) : 9;

  const { data, isLoading, error } = useSWR("fetcherCategory", fetcherCategory);
  const [clickedIndex, setClickedIndex] = useState<string>("");
  const [dishesList, setDishesList] = useState<Dish[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const categories = data || [];

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const getDishesByCategoryId = async (clickedIndex: string) => {
    try {
      const response = await getProductByCategoryId(clickedIndex, page, limit);
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
      setTotalCount(response.totalRecords);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && data) {
      const sessionClickIndex = localStorage.getItem("category");
      if (sessionClickIndex) {
        setClickedIndex(sessionClickIndex);
      } else {
        setClickedIndex(data[0]?.id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (clickedIndex) {
      getDishesByCategoryId(clickedIndex);
      if (typeof window !== 'undefined') {
        localStorage.setItem("category", clickedIndex);
      }
    }
  }, [clickedIndex, page]);

  const handleCategoryClick = (categoryId: string) => {
    setClickedIndex(categoryId);
    setPage(1); // Reset page to 1 when changing category
    if (typeof window !== 'undefined') {
      localStorage.setItem("category", categoryId);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    isLoading ? <LoadingSpinner /> :
      <main className="w-screen">
        <header className="mt-8">
          <Search />
        </header>

        <section className="flex flex-col items-center">
          <section className="sticky top-0 bg-white w-full z-10">
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
          {totalPages > 1 && (
            <Pagination className="mb-20">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handleChangePage(Math.max(1, page - 1))}
                    className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handleChangePage(index + 1)}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handleChangePage(Math.min(totalPages, page + 1))}
                    className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </main>
  );
}

