'use client'

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your server
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 flex flex-col gap-8 py-8">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-10"
                />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-row items-center gap-2 mb-8">
                    <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Trang chủ</a>
                    <span className="text-gray-400">{'>'}</span>
                    <span className="text-gray-900 font-semibold">Liên hệ</span>
                </div>

                {/* Title Section */}
                <div className="text-center mb-12">
                    <h1 className="font-bold text-4xl sm:text-5xl text-gray-900 mb-4">Bạn cần hỗ trợ?</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Hungry Yet? rất hân hạnh được hỗ trợ bạn. Hãy để lại thông tin, và chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        {/* Họ tên */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold text-gray-700 mb-2">Họ tên:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tên đầy đủ"
                                className="p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold text-gray-700 mb-2">Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Địa chỉ email"
                                className="p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    {/* Tin nhắn */}
                    <div className="flex flex-col mb-6">
                        <label htmlFor="message" className="font-semibold text-gray-700 mb-2">Tin nhắn:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Đừng ngại hỏi về đơn hàng của bạn"
                            rows={5}
                            className="p-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 ease-in-out"
                    >
                        Hoàn tất
                    </button>
                </form>
            </div>
        </div>
    );
}

