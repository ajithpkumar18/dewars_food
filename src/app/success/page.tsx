"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function SuccessPage() {
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");
    const router = useRouter()
    console.log(payment_intent);

    useEffect(() => {
        const makeRequest = async () => {
            try {
                await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
                    method: "PUT"
                });

                router.push("/orders")
            }
            catch (err) {
                console.log(err)
            }
        }

        makeRequest()
    }, [payment_intent, router])
    return (
        <div>Payment successfull. You are being redirected to the orders page. Please do not close the page.</div>
    )
}

export default SuccessPage;