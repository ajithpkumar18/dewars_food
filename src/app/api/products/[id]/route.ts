import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
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

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const session = await getAuthSession();

    if (session?.user.isAdmin) {

        try {
            const product = await prisma.product.delete({
                where: {
                    id: id
                },
            });

            return new NextResponse(JSON.stringify("Product has been deleted" + product), { status: 200 })
        } catch (err) {
            console.log(err);
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong" }),
                { status: 500 }
            )
        }
    }

    return new NextResponse(JSON.stringify({ message: "You are not allowed" }), { status: 403 })
}