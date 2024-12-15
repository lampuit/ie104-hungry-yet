'use client'

import { useEffect, useState } from "react"
import { SearchingArea } from "@/components/menu/search"
import { Category } from "@/components/menu/category"
import { DishList } from "@/components/menu/dish-list"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getCartsByUserId, filterAndSearch } from "@/lib/data"
import { CategoryFetcher } from "@/components/menu/category"
import useSWR from "swr"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { getSession } from "@/lib/auth-client"
import Chatbot from "@/components/chatbot/chat-bot"

interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
  des: string;
  published: boolean;
  avgRating: number;
}

const fetcherCategory = async (): Promise<
  { id: string; name: string; imageUrl: string | null }[]
> => {
  return CategoryFetcher();
};

const fetcherUserId = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  return userId;
};

const fetcherCarts = async (userId: string) => {
  return getCartsByUserId(userId);
};

export default function MenuPage() {
  const [page, setPage] = useState<number>(1);
  const limit = process.env.NEXT_PUBLIC_PAGE_SIZE
    ? parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE)
    : 9;

  const { data: userId } = useSWR("userId", fetcherUserId);
  const {
    data,
    isLoading: dishLoading,
    error: dishError,
  } = useSWR("fetcherCategory", fetcherCategory);
  const { data: carts } = useSWR(userId, fetcherCarts);

  const [clickedIndex, setClickedIndex] = useState<string>("");
  const [dishesList, setDishesList] = useState<Dish[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const categories = data || [];

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    categoryId: "",
    rating: 0,
    search: "",
  });

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page when filter changes
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const getDishesByCategoryId = async (clickedIndex: string) => {
    try {
      const formData = new FormData();
      formData.append("minPrice", filter.minPrice.toString());
      formData.append("maxPrice", filter.maxPrice.toString());
      formData.append("categoryId", clickedIndex);
      formData.append("rating", filter.rating.toString());
      formData.append("search", filter.search);
      formData.append("page", page.toString());
      formData.append("pageSize", limit.toString());

      const response = await filterAndSearch(formData);
      setDishesList(
        response?.records.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.imageUrl,
          published: item.isPublish,
          price: item.price,
          des: item.description,
          avgRating: item.averageRating
        })),
      );
      setTotalCount(response.totalRecords);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (carts) {
      setTotalAmount(carts.length);
    }
  }, [carts]);

  useEffect(() => {
    if (typeof window !== "undefined" && data) {
      const sessionClickIndex = localStorage.getItem("category");
      if (sessionClickIndex) {
        setClickedIndex(sessionClickIndex);
        setFilter(prev => ({ ...prev, categoryId: sessionClickIndex }));
      } else {
        setClickedIndex(data[0]?.id);
        setFilter(prev => ({ ...prev, categoryId: data[0]?.id }));
      }
    }
  }, [data])

  useEffect(() => {
    if (clickedIndex) {
      getDishesByCategoryId(clickedIndex);
      if (typeof window !== "undefined") {
        localStorage.setItem("category", clickedIndex);
      }
    }
  }, [clickedIndex, page, filter]);

  const handleCategoryClick = (categoryId: string) => {
    setClickedIndex(categoryId)
    setFilter(prev => ({ ...prev, categoryId }))
    setPage(1)
    if (typeof window !== "undefined") {
      localStorage.setItem("category", categoryId)
    }
  }

  const totalPages = Math.ceil(totalCount / limit)

  return dishLoading ? (
    <LoadingSpinner />
  ) : (
    <main className="w-screen">
      <header className="mt-8">
        <SearchingArea
          totalAmount={totalAmount}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
      </header>

      <section className="flex flex-col items-center">
        <section className="sticky top-0 z-10 w-full bg-white">
          <Category
            clickedIndex={clickedIndex}
            setClickedIndex={(index) => {
              const category = Array.isArray(categories)
                ? categories.find((cat) => cat.id === index)
                : undefined
              if (category) {
                handleCategoryClick(category.id)
              }
            }}
          />
        </section>

        <section className="mb-10 max-w-screen-2xl">
          {dishesList.length === 0 ||
            dishesList.every((dish) => !dish.published) ? (
            <p>Không có sản phẩm nào</p>
          ) : (
            <DishList
              dishesList={dishesList}
              onTotalAmountChange={setTotalAmount}
            />
          )}
        </section>
        {totalPages > 1 && (
          <Pagination className="mb-20">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handleChangePage(Math.max(1, page - 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
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
                  onClick={() =>
                    handleChangePage(Math.min(totalPages, page + 1))
                  }
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
      <Chatbot />
    </main>
  )
}