"use client";

import { useSearchParams } from "next/navigation";
import { connection } from "next/server";
import { useEffect } from "react";
import { Header } from "@/app/components";
import type { Order } from "@/app/types";

const ConfirmationPage = async () => {
  await connection();
  const searchParams = useSearchParams();

  const orderNumber = searchParams.get("orderNumber") || "ORD-DEMO-001";
  const referrerId = searchParams.get("referrerId") || undefined;

  // Mock order data
  const mockOrder: Order = {
    orderNumber,
    customer: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+44 7700 900000",
      address: {
        street: "123 Running Lane",
        city: "London",
        postalCode: "SW1A 1AA",
        country: "United Kingdom",
      },
    },
    items: [
      {
        product: {
          id: "APOLLO-RUNNING-SHIRT-01",
          name: "Performance Running Shirt",
          brand: "Apollo Sportswear",
          price: 29.99,
          originalPrice: 39.99,
          rating: 4.8,
          reviewCount: 342,
          image: "/product-image.jpg",
          features: ["Moisture-wicking", "Breathable", "Quick-dry"],
          description: "High-performance running shirt",
        },
        quantity: 1,
      },
    ],
    total: 29.99,
    orderDate: new Date(),
    referrerId,
  };

  // Load MentionMe order tag dynamically
  useEffect(() => {
    const firstname = mockOrder.customer.name.split(" ")[0];
    const surname = mockOrder.customer.name.split(" ")[1] || "";
    const firstItem = mockOrder.items[0];

    const params = new URLSearchParams({
      firstname,
      surname,
      email: mockOrder.customer.email,
      signup_id: mockOrder.customer.email,
      order_id: mockOrder.orderNumber,
      transaction_total: mockOrder.total.toFixed(2),
      transaction_currency: "GBP",
      product_sku_1: firstItem.product.id,
      product_qty_1: firstItem.quantity.toString(),
      situation: "postpurchase",
      locale: "en_GB",
    });

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://tag-demo.mention-me.com/api/v2/order/mm1c6ad7e0?${params.toString()}`;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      document.body.removeChild(script);
    };
  }, [mockOrder]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Success Header with Green Background */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white text-center py-12 px-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 animate-scale-in">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Thank You for Your Order!
              </h1>
              <p className="text-lg opacity-90">
                Your order has been confirmed
              </p>
            </div>

            {/* Confirmation Body */}
            <div className="p-8">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Order Number
                    </span>
                    <span className="text-gray-900 font-medium">
                      {mockOrder.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Customer
                    </span>
                    <span className="text-gray-900">
                      {mockOrder.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Email</span>
                    <span className="text-gray-900">
                      {mockOrder.customer.email}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="font-semibold text-gray-700">
                      Order Date
                    </span>
                    <span className="text-gray-900">
                      {mockOrder.orderDate.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {mockOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded flex-shrink-0 flex items-center justify-center text-white text-2xl">
                        ⚡
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          SKU: {item.product.id}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right font-bold text-gray-900">
                        £{item.product.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-gray-200 rounded-lg p-6 flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
                <span>Total Paid</span>
                <span>£{mockOrder.total.toFixed(2)}</span>
              </div>

              {/* What's Next Section */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📦 What&apos;s Next?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-gray-900 font-bold mr-3">→</span>
                    <span className="text-gray-700">
                      You&apos;ll receive an order confirmation email shortly
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 font-bold mr-3">→</span>
                    <span className="text-gray-700">
                      We&apos;ll send you shipping updates as your order is
                      processed
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 font-bold mr-3">→</span>
                    <span className="text-gray-700">
                      Expected delivery: 3-5 business days
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/product"
                  className="px-8 py-4 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5 text-center"
                >
                  Continue Shopping
                </a>
                <button
                  onClick={handlePrint}
                  className="px-8 py-4 bg-white text-black font-semibold rounded border-2 border-black hover:bg-gray-50 transition-colors text-center"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default ConfirmationPage;
