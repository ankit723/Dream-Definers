'use client'

import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faq } from "@/lib/utils";

export function FAQSection() {
  return (
    <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">Frequently Asked Questions ?</h1>
      
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <Image src="/assets/home/faq/faq.png" alt="FAQ" width={600} height={600} className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto" />
        </div>

        <div className="w-full lg:w-1/2">
          <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3 md:space-y-4">
            {faq().map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0 rounded-lg overflow-hidden data-[state=open]:bg-transparent data-[state=closed]:bg-blue-950"
              >
                <AccordionTrigger className="px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-4 text-white data-[state=open]:text-blue-950 data-[state=closed]:text-white hover:no-underline data-[state=closed]:bg-blue-950 data-[state=open]:bg-transparent rounded-lg [&>svg]:bg-white [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:text-black [&>svg]:size-4 xs:[&>svg]:size-5 sm:[&>svg]:size-6">
                  <span className="text-left font-semibold text-xs xs:text-sm sm:text-base md:text-lg pr-2 sm:pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-3 xs:px-4 sm:px-6 pb-2.5 xs:pb-3 sm:pb-4 pt-2">
                  <div className="bg-white border-2 border-black rounded-lg p-2.5 xs:p-3 sm:p-4 text-blue-950">
                    <p className="text-xs xs:text-sm sm:text-base leading-relaxed">{item.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

