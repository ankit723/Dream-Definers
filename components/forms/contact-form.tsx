'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("Form submission error:", data.error || data.message || "Unknown error");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      // If it's a network error, show a more helpful message
      if (error.message) {
        console.error("Network error:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base"
          placeholder="Enter your email address"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base"
          placeholder="What is this regarding?"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base resize-none"
          placeholder="Tell us how we can help you..."
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 border-2 border-green-500 rounded-md">
          <p className="text-green-800 font-medium text-sm sm:text-base">
            Thank you! Your message has been sent successfully. We'll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-md">
          <p className="text-red-800 font-medium text-sm sm:text-base">
            Something went wrong. Please check your connection and try again, or contact us directly at dreamdefinerstrainingacademy@gmail.com
          </p>
        </div>
      )}
    </form>
  );
}

