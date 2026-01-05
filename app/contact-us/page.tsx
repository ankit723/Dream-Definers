import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { social } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Dream Definers. Contact us for inquiries about our training programs, courses, and services. We're here to help you transform your career.",
  keywords: [
    "contact dream definers",
    "training inquiry",
    "course information",
    "get in touch",
    "support",
  ],
  openGraph: {
    title: "Contact Us - Dream Definers",
    description: "Get in touch with Dream Definers. Contact us for inquiries about our training programs and courses.",
    url: "/contact-us",
  },
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-blue-900/80 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white border rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white border rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-950 mb-2">Email</h3>
                  <a
                    href="mailto:dreamdefinerstrainingacademy@gmail.com"
                    className="text-blue-900 hover:text-blue-950 hover:underline transition-colors break-all"
                  >
                    dreamdefinerstrainingacademy@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-950 mb-2">Phone</h3>
                  <div className="space-y-2">
                    <a
                      href="tel:+918144553579"
                      className="block text-blue-900 hover:text-blue-950 hover:underline transition-colors"
                    >
                      +91 81445 53579
                    </a>
                    <a
                      href="tel:+919937003373"
                      className="block text-blue-900 hover:text-blue-950 hover:underline transition-colors"
                    >
                      +91 99370 03373
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-950 mb-2">Address</h3>
                  <p className="text-blue-900">
                    15, Soubhagya Nagar<br />
                    Baramunda, Bhubaneswar<br />
                    Odisha - 751003<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white border rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6">
                Follow Us
              </h2>
              <div className="flex items-center gap-4 flex-wrap">
                {social().map((item) => (
                  <Link
                    href={item.url}
                    key={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      rounded-full 
                      bg-blue-950 
                      text-white
                      p-3 sm:p-4
                      hover:bg-blue-900 
                      transition-all duration-300
                      flex items-center justify-center
                    "
                    aria-label={item.name}
                  >
                    <item.icon
                      className={cn(
                        "size-5 sm:size-6",
                        item.name === "LinkedIn" && "text-white",
                        item.name === "Youtube" && "text-white",
                        item.name === "Call" && "text-white",
                        item.name === "Facebook" && "text-white"
                      )}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}