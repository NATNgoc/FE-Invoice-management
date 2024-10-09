'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleFadingPlus } from 'lucide-react';
import { Progress } from "@/components/ui/progress";


export type Invoice = {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    value: number;
    description: string;
    organizationId: string;
    customerId: number;
    status: string;
}

export default function Dashboard() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        const response = await fetch('http://localhost:6007/invoice', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }

    useEffect(() => {
        setLoading(true);
        fetchInvoices()
            .then(data => {
                setInvoices(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching invoices:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="flex flex-col my-12 min-h-screen h-full max-w-5xl mx-auto text-center">
            <div className="flex justify-between my-6">
                <h1 className="text-3xl font-semibold">Dashboard</h1>
                <Button asChild variant="ghost">
                    <Link href="/invoices/new" className="inline-flex gap-2">
                        <CircleFadingPlus className="h-5 w-5" />
                        Create Invoice
                    </Link>
                </Button>
            </div>
            {loading ? (
                <div className="w-full p-4">
                    <Progress className="w-full animate-pulse" />
                </div>
            ) : (
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] p-4">Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-left p-4">Email</TableHead>
                            <TableHead className="text-center p-4">Status</TableHead>
                            <TableHead className="text-right p-4">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id} className="hover:bg-gray-100">
                                <TableCell className="font-semibold text-left p-4">
                                    {new Date(invoice.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-left font-semibold p-4">
                                    {invoice.customerId}
                                </TableCell>
                                <TableCell className="text-left p-4">
                                    {/* Add customer email here if available */}
                                </TableCell>
                                <TableCell className="text-center font-semibold p-4"> 
                                    <Badge className="bg-green-500">{invoice.status}</Badge> 
                                </TableCell>
                                <TableCell className="text-right font-semibold p-4">
                                    ${invoice.value.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </main> 
    );
}
