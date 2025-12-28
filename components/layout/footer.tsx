"use client";

import Link from "next/link";
import Image from "next/image";
import { social } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { OutlinedText } from "../ui/outlinedText";

export const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-blue-950 to-blue-900 text-white w-full">
      {/* Upper Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col">
            <div className="relative w-28 h-36 mb-4">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 rounded-lg p-3 flex flex-col items-center justify-center shadow-lg">
                {/* Logo Icon */}
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <Image
                    src="/assets/common/logo.png"
                    alt="Dream Definers Logo"
                    width={100}
                    height={100}
                    className="object-contain filter w-full rounded-md"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-white font-bold text-xs uppercase leading-tight">
                    DREAM DEFINERS
                  </h3>
                  <p className="text-white/95 text-[10px] uppercase mt-0.5 leading-tight">
                    TRAINING ACADEMY
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COMPANY Column */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-sm uppercase mb-4">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES Column */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-sm uppercase mb-4">
              RESOURCES
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="text-white/90 text-sm">Monday-Saturday</li>
              <li className="text-white/90 text-sm">9.30am-05.00pm</li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-sm uppercase mb-4">
              Contact Us 8144553579 | 9937003373
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:dreamdefinerstrainingacademy@gmail.com"
                  className="text-white/90 hover:text-white transition-colors text-sm break-all"
                >
                  dreamdefinerstrainingacademy@gmail.com
                </a>
              </li>
              <li className="text-white/90 text-sm flex flex-col gap-1">
                <span>Address</span>
                <span>15, Soubhagya Nagar</span>
                <span>Baramunda, Bhubaneswar, Odisha</span>
                <span>751003</span>
              </li>
            </ul>
            <div className="container mx-auto flex justify-start my-10 ">
              <Button asChild size="sm" className="text-xs xl:text-sm">
                <Link href="/free-consultancy">Get Free Consultancy</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {social().map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="w-10 h-10 rounded-full bg-white border border-white/50 flex items-center justify-center hover:bg-white/90 transition-all duration-300 shadow-sm"
                >
                  <item.icon
                    className={cn(
                      "size-5",
                      item.name === "LinkedIn" && "text-blue-600",
                      item.name === "Instagram" && "text-pink-600",
                      item.name === "Youtube" && "text-red-600",
                      item.name === "Call" && "text-green-600 rotate-90",
                      item.name === "Facebook" && "text-blue-600"
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Large Brand Name */}
            <div className="flex-1 flex justify-end items-center">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/25 uppercase tracking-wider select-none">
                DREAM DEFINERS
              </h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

