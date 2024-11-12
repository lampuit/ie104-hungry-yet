"use client";
import {CartHeader} from "@/components/menu/cart/cart-header";

export default function AboutUs() {
    return (
        <main style={{ backgroundColor: "#f8f9fa", padding: "20px" }}>
            <CartHeader />
            <header style={{ textAlign: "center", padding: "10px" }}>
                <h1 style={{ fontSize: "2.5em", marginBottom: "20px", color: "#333" }}>Về chúng tôi</h1>
            </header>

            <section style={{
                textAlign: "center",
                margin: "20px auto",
                maxWidth: "800px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
            }}>
                <p style={{ fontSize: "1.2em", marginBottom: "15px", color: "#666" }}>
                    HungryYet? ra đời với sứ mệnh, mang đến trải nghiệm ăn uống tiện lợi, phong phú và đáng nhớ!
                </p>
                <p style={{
                    fontSize: "1.8em",
                    fontWeight: "bold",
                    margin: "20px 0",
                    color: "#ff7f50"
                }}>
                    HungryYet? Đưa ẩm thực đến gần hơn với bạn!
                </p>
                <p style={{ fontSize: "1.1em", fontStyle: "italic", marginBottom: "20px" }}>
                    Since 2024
                </p>
                <p style={{ fontSize: "1em", marginBottom: "20px", color: "#333" }}>
                    Chúng tôi theo đuổi giá trị về chất lượng nguyên liệu, sự tận tâm phục vụ và tính tiện lợi tối ưu, để mỗi bữa ăn của bạn đều trở nên đặc biệt.
                </p>
                <p style={{
                    margin: "30px 0",
                    fontSize: "1.2em",
                    color: "#555",
                    fontWeight: "bold"
                }}>
                    WHAT WE DO<br />Savor the Moment!
                </p>
                <p style={{ fontSize: "1em", color: "#333", marginBottom: "20px" }}>
                    Sứ mệnh của HungryYet? là kết nối bạn với ẩm thực đa dạng, từ món truyền thống đến hiện đại, với chất lượng và phong cách phục vụ chu đáo. Mỗi lần chọn HungryYet? là một trải nghiệm tiện lợi và đáng nhớ.
                </p>
                <p style={{
                    marginTop: "30px",
                    fontSize: "1.4em",
                    fontWeight: "bold",
                    color: "#333"
                }}>
                    Delicious - Tasty - Yummy<br />"HungryYet?"
                </p>

                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    marginTop: "20px"
                }}>
                    <img src="food1.jpg" alt="Dish 1" style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        margin: "10px",
                        objectFit: "cover"
                    }} />
                    <img src="food2.jpg" alt="Dish 2" style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        margin: "10px",
                        objectFit: "cover"
                    }} />
                    <img src="food3.jpg" alt="Dish 3" style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        margin: "10px",
                        objectFit: "cover"
                    }} />
                    <img src="food4.jpg" alt="Dish 4" style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        margin: "10px",
                        objectFit: "cover"
                    }} />
                </div>
            </section>
        </main>
    );
}
