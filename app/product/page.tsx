"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Header } from "@/app/components";
import type { Product } from "@/app/types";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const referrerId = searchParams.get("referrerId");

  const product: Product = {
    id: "APOLLO-RUNNING-SHIRT-01",
    name: "Performance Running Shirt",
    brand: "Apollo Sportswear",
    price: 29.99,
    rating: 5,
    reviewCount: 247,
    features: [
      "Moisture-wicking fabric",
      "UV protection",
      "Lightweight",
      "Breathable mesh",
      "Reflective details",
      "Anti-odor",
    ],
    description:
      "Engineered for peak performance. This lightweight running shirt combines advanced moisture-wicking technology with a seamless construction for maximum comfort during your most intense training sessions.",
    image: "/product-image.jpg",
  };

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {referrerId && (
          <div
            id="mmReferrerBanner"
            className="min-h-[60px] mb-4 flex flex-col items-center justify-center  rounded border border-green-950 bg-green-100 p-4"
          >
            <p>
              <strong>🎉 Joe recommended this product!</strong>
            </p>
            <p>
              Get <strong>20% off</strong> with the code{" "}
              <strong>MMAPP20FKDS</strong>
            </p>
            <div id="mmRefereeWrapper"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
          {/* Product Image */}
          <div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg">{product.brand}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xl text-yellow-500">
                {"⭐".repeat(Math.floor(product.rating))}
              </div>
              <span className="text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex gap-1">
              <div className="inline-block px-4 py-2 bg-gray-100 text-black rounded">
                ✓ In Stock
              </div>

              {/* Share Button */}
              <div
                id="mmWrapper"
                className="inline-block px-4 py-2 bg-gray-100 text-black rounded cursor-pointer"
              ></div>
            </div>

            <div className="text-4xl font-bold text-black">
              £{product.price.toFixed(2)}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-black mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-black font-bold mt-0.5">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Link
                href={`/checkout?productId=${product.id}`}
                className="flex-1 px-8 py-4 bg-black text-white rounded font-semibold hover:bg-gray-800 hover:shadow-lg transition-all hover:-translate-y-0.5 text-center"
              >
                🛒 Buy Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Referrer Script */}
      <Script
        src="https://tag-staging2.mention-me.com/api/v2/referreroffer/mm1c6ad7e0?situation=referrer_product_page&implementation=link"
        strategy="beforeInteractive"
      />

      {/* Referee Script*/}
      {referrerId && (
        <Script
          src="https://tag-staging2.mention-me.com/api/v2/refereefind/mm1c6ad7e0?situation=referee_product_page&implementation=link"
          strategy="beforeInteractive"
        />
      )}
    </>
  );
};

export default ProductPage;
