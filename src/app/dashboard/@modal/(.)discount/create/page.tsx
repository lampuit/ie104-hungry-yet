import { CreateForm } from "@/components/dashboard/discount/create-form";
import { DialogModal } from "@/components/modal/dialog-modal";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Create() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) redirect("/login");
  if (session.user.role === "customer") redirect("/");

  return (
    <DialogModal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thông Tin Mã Ưu Đãi</DialogTitle>
        </DialogHeader>
        <CreateForm />
      </DialogContent>
    </DialogModal>
  );
}
