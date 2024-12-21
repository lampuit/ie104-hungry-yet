"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your server
  };

  return (
    <div className="flex min-h-screen flex-col gap-8 bg-gradient-to-b from-orange-100 to-orange-200 py-8">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          width="0"
          height="0"
          sizes="100vw"
          className="h-full w-full opacity-10"
        />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-row items-center gap-2">
          <a
            href="/"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Trang chủ
          </a>
          <span className="text-gray-400">{">"}</span>
          <span className="font-semibold text-gray-900">Liên hệ</span>
        </div>

        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Bạn cần hỗ trợ?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Hungry Yet? rất hân hạnh được hỗ trợ bạn. Hãy để lại thông tin, và
            chúng tôi sẽ phản hồi trong thời gian sớm nhất.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-xl"
        >
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Họ tên */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-2 font-semibold text-gray-700"
              >
                Họ tên:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên đầy đủ"
                className="rounded-lg border border-gray-300 p-3 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 font-semibold text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Địa chỉ email"
                className="rounded-lg border border-gray-300 p-3 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          {/* Tin nhắn */}
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="message"
              className="mb-2 font-semibold text-gray-700"
            >
              Tin nhắn:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Đừng ngại hỏi về đơn hàng của bạn"
              rows={5}
              className="rounded-lg border border-gray-300 p-3 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-orange-600"
          >
            Hoàn tất
          </button>
        </form>
      </div>
    </div>
  );
}
