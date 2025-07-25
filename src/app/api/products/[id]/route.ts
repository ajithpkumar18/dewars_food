import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    console.log("Products by is backend");

    console.log(id, typeof (id))
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        });

        console.log(product);

        return new NextResponse(JSON.stringify(product), { status: 200 })

    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }))
    }
}