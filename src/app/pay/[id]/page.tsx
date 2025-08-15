"use client"

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!)

function PayPage({ params }: { params: Promise<{ id: string }> }) {

    const [clientSecret, setClientSecret] = useState("")

    const extractParams = React.use(params)
    const { id } = extractParams;

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await fetch(`https://dewars-food-hb1s-qs6n1qnt8-ajiths-projects-18f603ad.vercel.app/api/create-intent/${id}`, {
                    method: "POST"
                })

                const data = await res.json()
                setClientSecret(data.clientSecret)
            }
            catch (err) {
                console.log(err);

            }
        }

        makeRequest();
    }, [id])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe"
        }
    }
    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default PayPage;