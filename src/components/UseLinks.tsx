"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function UseLinks() {
    const { status } = useSession()
    return (
        <div>{status === "authenticated" ? (
            <div>
                <Link href={"/order"}> Orders</Link>
                <span className='ml-2 cursor-pointer' onClick={() => signOut()}>Logout</span>
            </div>
        )
            : <Link href={"/login"}> Login</Link>
        }</div>
    )
}
