import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { File, ListFilter, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/dashboard/product/data-table";
import { columns } from "@/components/dashboard/product/columns";
import { useRouter } from "next/navigation";
import { db } from "@/drizzle/db";
import { categories, products } from "@/drizzle/schema/project";
import { eq, getTableColumns } from "drizzle-orm";

export default async function Dashboard() {
  const data = await db
    .select({
      ...getTableColumns(products),
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id));

  console.log(data);

  return (
    <div className="flex-1 p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
