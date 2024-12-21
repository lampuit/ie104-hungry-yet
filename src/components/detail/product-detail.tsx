"use client";

import { Suspense } from "react";
import LoadingSpinner from "../ui/loading-spinner";
import { SearchParamsWrapper } from "./search-params-wrapper";
import { ProductDetailContent } from "./product-detail-content";

export default function ProductDetail() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchParamsWrapper>
        {(id) =>
          id ? <ProductDetailContent id={id} /> : <p>No product ID provided</p>
        }
      </SearchParamsWrapper>
    </Suspense>
  );
}
