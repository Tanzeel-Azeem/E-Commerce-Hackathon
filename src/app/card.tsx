"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IProduct } from "../../types/products-types";
import { client } from "@/sanity/lib/client";
import { allProducts, fourProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const Card = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchProducts: IProduct[] = await client.fetch(fourProducts);

      setProducts(fetchProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mt-28 px-10 lg:px-24 py-6">
        <div>
          <span className="text-lg font-semibold">Best of Air Max</span>
        </div>

        <div className="flex items-center justify-between">
          <span>shop</span>
          <div className="p-2 bg-gray-100 text-zinc-400 rounded-full hover:bg-gray-200 hover:text-zinc-800 mx-3">
            <ChevronLeft />
          </div>
          <div className="p-2 bg-gray-100 text-zinc-400 rounded-full hover:bg-gray-200 hover:text-zinc-800">
            <ChevronRight />
          </div>
        </div>
      </div>

      <div className="flex justify-evenly  px-10 lg:px-16 flex-wrap">
        {products.map((product) => {
          return (
            <div className=" px-4 " key={product._id}>
              <div className="w-60 h-[350px] overflow-hidden">
                {product.image && (
                  <Image
                    className="hover:scale-105 duration-300"
                    src={urlFor(product.image).url()}
                    alt=""
                    height={250}
                    width={250}
                  />
                )}
                <div className="flex justify-between px-1 pb-2 pt-5">
                  <div className="text-sm w-40 font-semibold">
                    {product.productName}
                  </div>
                  <div className="font-semibold">{product.price}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold px-1 text-gray-500">
                    {product.category}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
