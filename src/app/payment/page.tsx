
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: "50000",
          orderInfo: "Pay with MoMo",
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        router.push(data.payUrl);
      } else {
        alert(`Payment failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay with MoMo"}
    </button>
  );
}
