import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[12rem] font-bold text-blue-950/20 leading-none">
            404
          </h1>
        </div>
        
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-blue-900/80 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/">Go Back Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white">
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-950/20">
          <p className="text-sm text-blue-900/60">
            Need help? <Link href="/contact-us" className="text-blue-950 font-semibold hover:underline">Get in touch</Link> with our team.
          </p>
        </div>
      </div>
    </div>
  );
}

