import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-96 md:w-72 lg:w-[480px] space-y-6 pr-4 text-start">
      <AccordionItem value="item-1" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Làm thế nào để đặt đồ ăn trên Hungry Yet?</AccordionTrigger>
        <AccordionContent>
          Bạn chỉ cần đăng nhập vào tài khoản, chọn món ăn từ menu, thêm vào giỏ hàng, và tiến hành thanh toán. Sau đó, đội ngũ của chúng tôi sẽ giao hàng tận nơi.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Thời gian giao hàng mất bao lâu?</AccordionTrigger>
        <AccordionContent>
          Thời gian giao hàng trung bình từ 30 đến 45 phút, tùy thuộc vào khoảng cách và tình trạng giao thông.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Gặp vấn đề với đơn hàng, phải làm sao?</AccordionTrigger>
        <AccordionContent>
          Vui lòng liên hệ với đội ngũ chăm sóc khách hàng của Hungry Yet? qua hotline. Chúng tôi sẽ hỗ trợ bạn ngay lập tức.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Hungry Yet? có chương trình khuyến mãi không?</AccordionTrigger>
        <AccordionContent>
          Chúng tôi thường xuyên có các chương trình giảm giá và ưu đãi đặc biệt. Hãy theo dõi trang web thường xuyên để cập nhật thông tin khuyến mãi mới nhất.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Có thể để lại đánh giá về món ăn và dịch vụ không?</AccordionTrigger>
        <AccordionContent>
          Có, chúng tôi khuyến khích bạn để lại đánh giá để giúp Hungry Yet? cải thiện chất lượng dịch vụ và mang đến trải nghiệm tốt hơn cho khách hàng khác.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Có thể lưu các món ăn yêu thích để đặt lại không?</AccordionTrigger>
        <AccordionContent>
          Có, bạn có thể thêm món ăn vào danh sách "Món yêu thích" để dễ dàng đặt lại trong những lần tiếp theo
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Làm thế nào để tôi sử dụng mã giảm giá?</AccordionTrigger>
        <AccordionContent>
          Khi thanh toán, nhập mã giảm giá của bạn vào ô "Mã khuyến mãi" và nhấn "Áp dụng". Mức giảm giá sẽ tự động được trừ vào tổng hóa đơn.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
        <AccordionTrigger>Có thể đổi địa chỉ giao hàng sau khi đặt không?</AccordionTrigger>
        <AccordionContent>
          Có, bạn có thể thay đổi địa chỉ giao hàng nếu đơn hàng chưa được được hoàn thành đặt hàng.
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  )
}