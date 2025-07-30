import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, { params }: { params: Promise<{ intentId: string }> }) => {
    const exparams = await params;
    const { intentId } = exparams;

    try {
        const order = await prisma.order.findFirst({
            where: { intent_id: intentId }
        });

        if (!order) {
            return new NextResponse(
                JSON.stringify({ message: "Order not found for this intent_id" }),
                { status: 404 }
            );
        }

        await prisma.order.update({
            where: { id: order.id },
            data: { status: "Being Prepared" }
        });

        return new NextResponse(
            JSON.stringify({ message: "Order has been updated" }),
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
}