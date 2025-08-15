import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import CartIcon from './CartIcon';
import Image from 'next/image';
import UseLinks from './UseLinks';

export default function Navbar() {
    return (
        <div className='h-12 text-red-500 p-4 flex items-center  justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-36'>
            {/* Logo */}
            <div className='hidden md:flex gap-4 flex-1'>
                <Link href={"/"}> Homepage</Link>
                <Link href={"/menu"}> Menu</Link>
                <Link href={"/contact"}> Contact</Link>
            </div>
            <div className='text-xl md:font-bold flex-1 md:text-center'>
                <Link href="/">
                    Massimo
                </Link>
            </div>
            <div className='md:hidden'>
                <Menu />
            </div>

            <div className='hidden md:flex gap-4 items-center justify-end flex-1'>
                <div className='md:absolute top-2 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 p-1 rounded-md'>
                    <Image src={"/phone.png"} alt='' width={20} height={20} />
                    <span>7894564859</span>
                </div>
                <UseLinks />
                <CartIcon />
            </div>
        </div >
    )
}
