import Image from 'next/image'
import React from 'react'

export default function Featured() {
    return (
        <div className=' w-full overflow-x-scroll text-red-500'>
            <div className='w-max flex'>
                <div className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]'>
                    <div className='relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500'>
                        <Image src={"/temporary/p1.png"} alt='' fill className='object-contain' />
                    </div>
                    <div className='flex-1 flex flex-col items-center justify-center text-centergap-4'>
                        <h1 className='text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl'>Title</h1>
                        <p className='p-4 2xl:p-8'>Desc</p>
                        <span className='text-xl font-bold'>123</span>
                        <button className='bg-red-500 text-white p-2 rounded-md'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
