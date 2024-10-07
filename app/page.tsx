import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
      <main className="flex flex-col min-h-screen h-full max-w-5xl mx-auto  justify-center  text-center">
        <h1 className="text-5xl font-bold">Invoicipedia</h1>
        <p>
        <Button asChild className="">
          <Link href="/dashboard" >
            Sign In
          </Link>
        </Button>
        </p>
      </main> 
  );
}
