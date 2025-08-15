"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessClient() {
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");
    const router = useRouter();

    useEffect(() => {
        if (!payment_intent) return;

        const makeRequest = async () => {
            try {
                await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
                    method: "PUT",
                });

                router.push("/orders");
            } catch (err) {
                console.error(err);
            }
        };

        makeRequest();
    }, [payment_intent, router]);

    return (
        <div>
            Payment successful. You are being redirected to the orders page.
            Please do not close the page.
        </div>
    );
}
