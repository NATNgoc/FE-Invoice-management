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

export default function Dashboard() {
  return (
      <main className="flex flex-col my-12 min-h-screen h-full max-w-5xl mx-auto  text-center">
        <div className="flex justify-between my-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <Button asChild variant="ghost">
                <Link href="/h" className="i nline-flex gap-2">
                    <CircleFadingPlus className="h-5 w-5 " />
                    Create Invoice
                </Link>
            </Button>
        </div>
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
                <TableRow className="hover:bg-gray-100">
                    <TableCell className="font-semibold text-left p-4">8/9/2024</TableCell>
                    <TableCell className="text-left font-semibold p-4">Tuan Ngoc</TableCell>
                    <TableCell className="text-left p-4">nguyenatn20003@gmail.com</TableCell>
                    <TableCell className="text-center font-semibold p-4"> 
                        <Badge className="bg-green-500">Paid</Badge> 
                    </TableCell>
                    <TableCell className="text-right font-semibold p-4">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </main> 
  );
}
