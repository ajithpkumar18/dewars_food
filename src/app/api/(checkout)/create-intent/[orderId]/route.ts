import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
export const POST = async (req: Request, { params }: { params: Promise<{ orderId: string }> }) => {
    const { orderId } = await params;
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
        if (!order) {
            return new NextResponse(JSON.stringify({ message: "Order not found" }), { status: 404 });
        }

        let paymentIntent = await stripe.paymentIntents.create({
            amount: 100 * 100,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
            description: "Food order export from Dewars Food"
        });

        await prisma.order.update({
            where: { id: orderId },
            data: { intent_id: paymentIntent.id }
        });
        return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
    }
    catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}