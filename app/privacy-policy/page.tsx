export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide text-blue-950">
            Privacy Policy
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-6">
            <p className="text-black text-base sm:text-lg leading-relaxed">
              At Dream Definers Training Academy, we value your privacy. We collect basic personal information such as name, contact details, and other information shared during inquiries or enrollment. This information is used only to provide our training services, respond to queries, and improve our offerings.
            </p>

            <p className="text-black text-base sm:text-lg leading-relaxed">
              We do not share your personal information with third parties, except when required for service-related purposes.
            </p>

            <p className="text-black text-base sm:text-lg leading-relaxed">
              For any questions, please contact Dream Definers Training Academy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

