import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-amber-100 text-amber-900">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <img
                            className="h-10"
                            src="/placeholder.svg?height=40&width=120"
                            alt="Logo Công ty"
                        />
                        <p className="text-base">
                            Mang hương vị Việt Nam đến từng bữa ăn của bạn.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-amber-600 hover:text-amber-800">
                                <span className="sr-only">Facebook</span>
                                <Facebook />
                            </Link>
                            <Link href="#" className="text-amber-600 hover:text-amber-800">
                                <span className="sr-only">Instagram</span>
                                <Instagram />
                            </Link>
                            <Link href="#" className="text-amber-600 hover:text-amber-800">
                                <span className="sr-only">Twitter</span>
                                <Twitter />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider uppercase">
                                    Thực đơn
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="/menu" className="text-base hover:text-amber-700">
                                            Món chính
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/menu" className="text-base hover:text-amber-700">
                                            Món phụ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/menu" className="text-base hover:text-amber-700">
                                            Đồ uống
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/menu" className="text-base hover:text-amber-700">
                                            Tráng miệng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold tracking-wider uppercase">
                                    Hỗ trợ
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Tài khoản
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Đặt hàng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Giao hàng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider uppercase">
                                    Công ty
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Về chúng tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Đối tác
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Tuyển dụng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold tracking-wider uppercase">
                                    Pháp lý
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Chính sách bảo mật
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base hover:text-amber-700">
                                            Điều khoản sử dụng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-amber-200 pt-8">
                    <p className="text-base text-center">
                        &copy; 2023 Công ty TNHH Dịch vụ Ẩm thực Việt Nam. Tất cả các quyền được bảo lưu.
                    </p>
                </div>
            </div>
        </footer>
    )
}
