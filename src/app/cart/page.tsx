"use client"
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import { useEffect } from "react";

export default function CartPage() {

  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  const { products, totalItems, totalPrice, addToCart, removeFromCart } = useCartStore()
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">

        {products.map((item) => (
          <div className="flex items-center justify-between mb-4 ">
            {item.img && (<Image src={item.img} alt="" width={100} height={100} />)}
            <div className="">
              <h1 className="uppercase text-xl font-bold">{item.title}</h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">{item.price}</h2>
            <span className="cursor-pointer" onClick={() => removeFromCart(item)}>X</span>
          </div>

        ))}
      </div>


      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">0</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">Total(INCL. VAT)</span>
          <span className="">{totalPrice}</span>
        </div>
        <button className="bg-red-500 text-white rounded-md w-1/2 self-end">Checkout</button>
      </div>
    </div>
  );
}
