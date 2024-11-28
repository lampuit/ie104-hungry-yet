import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="w-full flex flex-col gap-8 my-8">
            <div className="flex flex-col gap-4 px-16">
                <h1 className="font-bold text-4xl text-center">Về chúng tôi</h1>
                <p className="p-4 text-lg">HungryYet? là nền tảng đặt đồ ăn tiên phong,
                    mang đến trải nghiệm ăn uống tiện lợi, phong phú và đầy thú vị dành cho mọi thực khách.
                    Với giao diện hiện đại và thân thiện, chúng tôi giúp bạn dễ dàng khám phá và đặt,
                    mang sứ mệnh kết nối bạn với hàng loạt món ăn đa dạng, từ hương vị truyền thống đến
                    các món ăn độc đáo hiện đại. chỉ trong vài thao tác đơn giản, đáp ứng nhanh chóng mọi
                    nhu cầu ẩm thực của bạn. Được thành lập năm 2024, HungryYet? không chỉ dừng lại ở việc
                    kết nối bạn với những món ăn ngon, mà còn mong muốn trở thành người bạn đồng hành đáng tin cậy,
                    hiện diện trong từng bữa ăn của bạn.</p>
            </div>
            <img src="/images/anananan2.png" alt="" />
            <div className="flex justify-center items-center px-16">
                <div className="flex flex-col gap-2 w-1/3">
                    <h1 className="font-bold text-3xl">WHAT WE DO</h1>
                    <h3 className="font-bold text-2xl">Savor the Moment!</h3>
                </div>
                <p className="text-lg">Sứ mệnh của HungryYet? là kết nối bạn với ẩm thực đa dạng,
                    từ món truyền thống đến hiện đại, với chất lượng và phong cách phục vụ chu đáo.
                    Mỗi lần chọn HungryYet? là một trải nghiệm tiện lợi và đáng nhớ.</p>
            </div>
            <img src="/images/HungryYet1.png" alt="" />
        </div>
    );
}