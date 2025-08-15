"use client"

import SuccessClient from "@/components/SuccessClient";
import { Suspense } from "react";

function SuccessPage() {

    return (
        <Suspense fallback={<div>Processing payment...</div>}>
            <SuccessClient />
        </Suspense>
    )
}

export default SuccessPage;