'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

const PROGRAMS = [
  "Aviation",
  "Effective Communication",
  "Pre-Placement Training",
];

export function ConsultancyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const response = await fetch("/api/consultancy", {
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
          program: "",
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <div className="mb-6 text-right">
          <p className="text-sm sm:text-base text-blue-900 font-medium">
            Complete this form & Our team will contact with you soon.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
              Your name <span className="text-red-500">*</span>
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
              Phone no. <span className="text-red-500">*</span>
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

          {/* Program Selection */}
          <div>
            <label htmlFor="program" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
              What programs you are interested in? <span className="text-red-500">*</span>
            </label>
            <select
              id="program"
              name="program"
              required
              value={formData.program}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base bg-white"
            >
              <option value="">Select a program</option>
              {PROGRAMS.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-blue-950 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm sm:text-base resize-none"
              placeholder="Tell us more about your requirements (optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 border-2 border-green-500 rounded-md">
              <p className="text-green-800 font-medium text-sm sm:text-base">
                Thank you! Your form has been submitted successfully. Our team will contact you soon.
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
      </div>
    </div>
  );
}

