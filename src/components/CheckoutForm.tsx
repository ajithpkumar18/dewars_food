"use client"

import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import AddressForm from "./AddressForm";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment Succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.")
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successfull, please try again");
                    break;
                default:
                    setMessage("Something went wrong");
                    break;
            }
        })
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/success",
            },
        });

        console.log(error);


        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "Something went wrong");
        }
        else {
            setMessage("An unexpected error occured.")
        }

        setIsLoading(false)
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
            />
            <PaymentElement id="payment-element" options={{
                layout: "tabs",
            }} />

            <AddressForm />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="btton-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>

            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckoutForm;