"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Option = {
    title: string,
    additionalPrice: number
}

function AddPage() {

    const { data: session, status } = useSession()
    const [inputs, setInputs] = useState({
        title: "",
        desc: "",
        price: 0,
        catSlug: "",
    })

    const [option, setOption] = useState<Option>(
        {
            title: "",
            additionalPrice: 0
        }
    )

    const [options, setOptions] = useState<Option[]>([])

    const [file, setFile] = useState<File>();

    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        router.push("/");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];
        setFile(item)
    }

    const upload = async () => {

        const data = new FormData()
        data.append("file", file!);
        data.append("upload_preset", "restaurant")
        const res = await fetch("https://api.cloudinary.com/v1_1/dlux6k0f5/image/upload", {
            method: "POST",
            body: data
        })

        const resData = await res.json();
        return resData.url;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const url = await upload();
            const res = await fetch("https://dewars-food-hb1s-qs6n1qnt8-ajiths-projects-18f603ad.vercel.app/api/products", {
                method: "POST",
                body: JSON.stringify({
                    img: url,
                    ...inputs,
                    options
                })
            })

            const data = await res.json()
            console.log("new product=", data);

            router.push(`/product/${data.id}`)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form action="" className="shadow-lg flex flex-wrap gap-4 p-8" onSubmit={handleSubmit}>
                <h1>Add New Product</h1>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Image</label>
                    <input onChange={handleChangeImg} className="ring-1 ring-red-200 p-2 rounded-sm" type="file" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Description</label>
                    <textarea onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" name="desc" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Price</label>
                    <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="text" name="price" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Category</label>
                    <input
                        onChange={handleChange}
                        className="ring-1 ring-red-200 p-2 rounded-sm"
                        type="text"
                        name="catSlug" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Options</label>
                    <div>
                        <input onChange={changeOption} className="ring-1 ring-red-200 outline-red-500 p-2 rounded-sm" type="text" placeholder="Title" name="title" />
                        <input onChange={changeOption} className="ring-1 ring-red-200 p-2 outline-red-500 rounded-sm" type="number" placeholder="Additional Price" name="additionalPrice" />
                    </div>

                    <div className="w-52 bg-red-500 text-white p-2 rounded-sm cursor-pointer" onClick={() => setOptions(prev => [...prev, option])}>Add Options</div>
                </div>
                <div>
                    {options.map((item => <div className="ring-1 ring-red-500 p-2 rounded-md cursor-pointer" key={item.title} onClick={() => setOptions(options.filter(opt => opt.title !== item.title))}>
                        <span>{item.title}</span>
                        <span>${item.additionalPrice}</span>
                    </div>))}
                </div>

                <button type="submit" className="p-2 w-full bg-red-500 text-white">Submit</button>
            </form >
        </div >
    )
}

export default AddPage;