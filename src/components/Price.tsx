"use client"
import { ProductType } from '@/types/types';
import React, { useEffect, useState } from 'react'

export default function Price({ product }: { product: ProductType }) {

    const [total, setTotal] = useState(product.price)
    const [quantity, setQuantity] = useState(1)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        if (Array.isArray(product.options) && product.options.length > 0) {
            setTotal(quantity * product.price + product.options[selected]?.additionalPrice || 0);
        } else {
            setTotal(quantity * product.price);
        }
    }, [quantity, selected, product.options, product.price])

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>{total}</h2>
            <div className="flex gap-4">
                {(Array.isArray(product.options)
                    ? product.options
                    : product.options
                        ? [product.options]
                        : []
                ).map((option, index) => (
                    <button
                        key={option.title}
                        className='min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md'
                        style={{
                            background: selected === index ? "rgb(248, 113, 113)" : "white",
                            color: selected === index ? "white" : "red"
                        }}
                        onClick={() => setSelected(index)}
                    >
                        {option.title}
                    </button>
                ))}
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex justify-between w-full p-3 ring ring-red-500'>
                    <span>Quantity</span>
                    <div className='flex gap-4 items-center'>
                        <button onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>{'<'}</button>
                        <span>
                            {quantity}
                        </span>
                        <button onClick={() => setQuantity(prev => (prev < 9 ? prev + 1 : 9))}>{'>'}</button>
                    </div>
                </div>
                <button className='uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500 '>Add to Cart</button>
            </div>
        </div>
    )
}
