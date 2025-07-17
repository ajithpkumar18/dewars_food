import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className='h-12 md:h-24 p-4 lg:p-20 xl:p-36 text-red-500 flex items-center justify-between uppercase'>
            <Link href={"/"} className='font-bold text-xl'>massimo</Link>
            <p>©️ All Rights reserved</p>
        </div>
    )
}
