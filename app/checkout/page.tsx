"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { connection } from "next/server";
import { useState } from "react";
import { Header } from "@/app/components";
import type { CheckoutFormData, OrderItem, Product } from "@/app/types";

// Mock product data
const MOCK_PRODUCTS: Record<string, Product> = {
  "apollo-running-shirt": {
    id: "apollo-running-shirt",
    name: "Performance Running Shirt",
    brand: "Apollo",
    price: 29.99,
    rating: 4.5,
    reviewCount: 128,
    image: "/product-placeholder.jpg",
    features: ["Moisture-wicking", "Lightweight", "Quick-dry"],
    description: "High-performance running shirt for athletes",
  },
  "apollo-training-shorts": {
    id: "apollo-training-shorts",
    name: "Training Shorts",
    brand: "Apollo",
    price: 34.99,
    rating: 4.7,
    reviewCount: 95,
    image: "/product-placeholder.jpg",
    features: ["Breathable", "Elastic waist", "Multiple pockets"],
    description: "Comfortable training shorts for any workout",
  },
};

const CheckoutPage = async () => {
  await connection();
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId") || "apollo-running-shirt";
  const referrerId = searchParams.get("referrerId") || "";

  // Get product data
  const product =
    MOCK_PRODUCTS[productId] || MOCK_PRODUCTS["apollo-running-shirt"];

  // Create order item
  const orderItem: OrderItem = {
    product,
    quantity: 1,
  };

  const total = orderItem.product.price * orderItem.quantity;

  // Form state with pre-filled demo data
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Doe",
    address: "123 Demo Street",
    city: "London",
    postcode: "SW1A 1AA",
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/25",
    cvv: "123",
  });

  const handleInputChange =
    (field: keyof CheckoutFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate order number
    const orderNumber =
      "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Navigate to confirmation page
    const params = new URLSearchParams({
      orderNumber,
      ...(referrerId && { referrerId }),
    });

    router.push(`/confirmation?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a href="/" className="text-black hover:underline text-sm">
            ← Back to Products
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-3xl font-bold text-black mb-6">Checkout</h2>

              <form onSubmit={handleCompletePurchase}>
                {/* Customer Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Customer Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange("firstName")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange("lastName")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange("address")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange("city")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="postcode"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Postcode
                        </label>
                        <input
                          type="text"
                          id="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange("postcode")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Payment Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange("cardNumber")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        placeholder="4242 4242 4242 4242"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Expiry
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange("expiry")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange("cvv")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Complete Purchase Button - Only on mobile */}
                <div className="lg:hidden">
                  <button
                    type="submit"
                    className="w-full bg-black text-white font-bold py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    🔒 Complete Purchase
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    🔒 Secure checkout (Demo - no actual payment)
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                Order Summary
              </h2>

              {/* Product Item */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-black">
                      {orderItem.product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      SKU: {orderItem.product.id}
                    </p>
                    <p className="font-bold text-black mt-1">
                      ${orderItem.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-gray-300 pt-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-black border-t-2 border-black pt-3 mt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Purchase Button - Desktop only */}
              <div className="hidden lg:block">
                <button
                  type="button"
                  onClick={handleCompletePurchase}
                  className="w-full bg-black text-white font-bold py-4 px-6 rounded-lg mt-6 hover:bg-gray-800 transition-colors"
                >
                  🔒 Complete Purchase
                </button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  🔒 Secure checkout (Demo - no actual payment)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
