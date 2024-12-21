"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqItems = [
    {
      question: "Làm thế nào để đặt đồ ăn trên Hungry Yet?",
      answer:
        "Bạn chỉ cần đăng nhập vào tài khoản, chọn món ăn từ menu, thêm vào giỏ hàng, và tiến hành thanh toán. Sau đó, đội ngũ của chúng tôi sẽ giao hàng tận nơi.",
    },
    {
      question: "Thời gian giao hàng mất bao lâu?",
      answer:
        "Thời gian giao hàng trung bình từ 30 đến 45 phút, tùy thuộc vào khoảng cách và tình trạng giao thông.",
    },
    {
      question: "Gặp vấn đề với đơn hàng, phải làm sao?",
      answer:
        "Vui lòng liên hệ với đội ngũ chăm sóc khách hàng của Hungry Yet? qua hotline. Chúng tôi sẽ hỗ trợ bạn ngay lập tức.",
    },
    {
      question: "Hungry Yet? có chương trình khuyến mãi không?",
      answer:
        "Chúng tôi thường xuyên có các chương trình giảm giá và ưu đãi đặc biệt. Hãy theo dõi trang web thường xuyên để cập nhật thông tin khuyến mãi mới nhất.",
    },
    {
      question: "Có thể để lại đánh giá về món ăn và dịch vụ không?",
      answer:
        "Có, chúng tôi khuyến khích bạn để lại đánh giá để giúp Hungry Yet? cải thiện chất lượng dịch vụ và mang đến trải nghiệm tốt hơn cho khách hàng khác.",
    },
    {
      question: "Có thể lưu các món ăn yêu thích để đặt lại không?",
      answer:
        "Có, bạn có thể thêm món ăn vào danh sách &quot;Món yêu thích&quot; để dễ dàng đặt lại trong những lần tiếp theo.",
    },
    {
      question: "Làm thế nào để tôi sử dụng mã giảm giá?",
      answer:
        "Khi thanh toán, nhập mã giảm giá của bạn vào ô &quot;Mã khuyến mãi&quot; và nhấn &quot;Áp dụng&quot;. Mức giảm giá sẽ tự động được trừ vào tổng hóa đơn.",
    },
    {
      question: "Có thể đổi địa chỉ giao hàng sau khi đặt không?",
      answer:
        "Có, bạn có thể thay đổi địa chỉ giao hàng nếu đơn hàng chưa được hoàn thành đặt hàng.",
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-[360px] space-y-4 pr-4 md:w-[540px] lg:w-[480px] xl:w-[600px]"
    >
      {faqItems.map((item, index) => (
        <AccordionItem
          key={`item-${index + 1}`}
          value={`item-${index + 1}`}
          className="overflow-hidden rounded-2xl border-2 border-[#99BD76] shadow-md shadow-[#99BD7680]"
        >
          <AccordionTrigger className="px-3 py-4 transition-colors duration-200 hover:bg-[#99BD7620] sm:px-6">
            <span className="text-md text-left font-semibold sm:text-lg">
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="bg-white px-3 py-4 text-sm sm:px-6 sm:text-base">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
