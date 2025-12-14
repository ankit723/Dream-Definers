import type { Metadata } from "next";
import { ConsultancyForm } from "@/components/forms/consultancy-form";

export const metadata: Metadata = {
  title: "Free Consultancy",
  description: "Get free consultation from Dream Definers. Fill out our form and our team will contact you soon to discuss your training needs and career goals.",
  keywords: [
    "free consultation",
    "career consultation",
    "training consultation",
    "soft skills consultation",
    "aviation training consultation",
  ],
  openGraph: {
    title: "Free Consultancy - Dream Definers",
    description: "Get free consultation from Dream Definers. Fill out our form and our team will contact you soon.",
    url: "/free-consultancy",
  },
  alternates: {
    canonical: "/free-consultancy",
  },
};

export default function FreeConsultancyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 mb-4">
            Free Consultation
          </h1>
          <p className="text-base sm:text-lg text-blue-900/80 max-w-2xl mx-auto">
            Interested in our programs? Fill out the form below and our expert team will get in touch with you to discuss your training needs and career goals.
          </p>
        </div>

        {/* Form */}
        <ConsultancyForm />
      </div>
    </div>
  );
}