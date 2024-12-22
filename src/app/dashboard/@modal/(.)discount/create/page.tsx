import { CreateForm } from "@/components/dashboard/discount/create-form";
import { DialogModal } from "@/components/modal/dialog-modal";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

export default function Create() {
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
