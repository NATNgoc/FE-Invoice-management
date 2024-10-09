"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createInvoice } from "@/app/action"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FormFeedback } from "@/components/form-feedback"

export const createInvoiceFormSchema = z.object({
  billingName: z.string().min(2, {
    message: "Billing name must be at least 2 characters.",
  }),
  billingEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  value: z.number().min(0.01, {
    message: "Value must be at least 0.01.",
  }),
  description: z.string().optional(),
})

export default function CreateInvoice() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const form = useForm<z.infer<typeof createInvoiceFormSchema>>({
    resolver: zodResolver(createInvoiceFormSchema),
    defaultValues: {
      billingName: "adasd",
      billingEmail: "asdasd@gmail.com",
      value: 1,
      description: "asdasd",
    },
  })

  const handleSubmit = async (values: z.infer<typeof createInvoiceFormSchema>) => {
    setStatus('loading')
    setFeedbackMessage('')
    try {
      const result = await createInvoice(values)
      console.log(result)
      setStatus('success')
      setFeedbackMessage(result.message)
    } catch (error) {
      setStatus('error')
      setFeedbackMessage("An error occurred while submitting the form.")
    }
  }

  const handleOk = (e: any) => {
    console.log(e)  
    setStatus('idle')
    setFeedbackMessage('')
    form.reset()
  }

  return (
    <main className="flex flex-col my-12 min-h-screen h-full max-w-6xl mx-auto p-5">
      <div className="flex justify-between my-6">
        <h1 className="text-4xl font-bold">Create Invoice</h1>
      </div>
      <div className="max-w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="billingName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Billing Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter billing name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billingEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Billing Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter billing email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Value</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="Enter value" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
        <Dialog open={status === 'loading' || status === 'success' || status === 'error'} onOpenChange={() => status !== 'loading' && handleOk()}>
          <DialogContent className="sm:max-w-[425px]">
            <FormFeedback status={status} errorMessage={feedbackMessage} successMessage={feedbackMessage} />
            {status === 'success' && (
              <Button onClick={handleOk} className="mt-4">
                OK
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}