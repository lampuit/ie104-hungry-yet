'use client'

import { useSearchParams } from "next/navigation"

export function SearchParamsWrapper({
    children
}: {
    children: (id: string | null) => React.ReactNode
}) {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    return children(id)
}

