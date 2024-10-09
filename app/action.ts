'use server'

import { z } from "zod";
import { createInvoiceFormSchema } from "./invoices/new/page";

export async function createInvoice(values: z.infer<typeof createInvoiceFormSchema>) {
    const response = await fetch('http://localhost:6007/invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                value: values.value,
                description: values.description,
                customerId: 1,
                status: 'open',
            }),
    });


    console.log(response);  // Logging the result can be helpful for debugging
    return response.ok? true: false;
}


