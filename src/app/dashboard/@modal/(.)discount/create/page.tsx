import { CreateForm } from "@/components/dashboard/discount/create-form";
import { Modal } from "@/components/modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Create() {
  return (
    <Modal>
      <DialogHeader>
        <DialogTitle>Thông Tin Mã Ưu Đãi</DialogTitle>
      </DialogHeader>
      <CreateForm />
    </Modal>
  );
}
