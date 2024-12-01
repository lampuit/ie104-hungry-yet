import Image from "next/image";


export default function ContactPage() {
    return (
        <div className="w-full flex flex-col gap-8 my-8">
            {/* Header Section */}
            <div className="flex flex-row items-center gap-2 px-16">
                <a href="/" className="text-gray-500">Trang chủ</a>
                <span className="text-gray-500">{'>'}</span>
                <span className="text-black font-semibold">Liên hệ</span>
            </div>

            {/* Title Section */}
            <div className="text-center">
                <h1 className="font-bold text-4xl">Bạn cần hỗ trợ?</h1>
                <p className="mt-4 text-lg">
                    Hungry Yet? rất hân hạnh được hỗ trợ bạn, hãy để lại thông tin cho chúng tôi nhé.
                    Yêu cầu của bạn sẽ được xử lý và phản hồi trong thời gian sớm nhất.
                </p>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-6 items-center px-16">
                <div className="w-full max-w-3xl grid grid-cols-2 gap-4">
                    {/* Họ tên */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-semibold text-lg">Họ tên:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tên đầy đủ"
                            className="p-4 border border-gray-300 rounded-lg placeholder-gray-400"
                        />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-lg">Email:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Địa chỉ email"
                            className="p-4 border border-gray-300 rounded-lg placeholder-gray-400"
                        />
                    </div>
                </div>
                {/* Tin nhắn */}
                <div className="w-full max-w-3xl flex flex-col">
                    <label htmlFor="message" className="font-semibold text-lg">Tin nhắn:</label>
                    <textarea
                        id="message"
                        placeholder="Đừng ngại hỏi về đơn hàng của bạn"
                        rows={5}
                        className="p-4 border border-gray-300 rounded-lg placeholder-gray-400"
                    ></textarea>
                </div>
                {/* Submit Button */}
                <button className="bg-black text-white px-8 py-3 rounded-lg">
                    Hoàn tất
                </button>
            </div>
        </div>
    );
}
