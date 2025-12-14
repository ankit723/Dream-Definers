import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Back Button and Title */}
        <div className="flex items-center justify-center gap-4 mb-16 relative">

          {/* Main Heading - Centered */}
          <h1 className="text-5xl md:text-6xl font-bold text-black">
            ABOUT US
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction Section */}
          <section className="space-y-6">
            <p className="text-black text-lg leading-relaxed">
              At Dream Definers Training Academy, we believe that communication
              defines credibility and confidence that creates opportunity. In
              today&apos;s world, soft skills and effective communication are
              compulsory for our personal and professional success. We aim to
              guide those who want to excel in the corporate world and secure
              placement in their dream companies.
            </p>

            <p className="text-black text-lg leading-relaxed">
              Established on 1st September 2024, we are a training academy built
              on a strong foundation of more than 20 years of collective
              experience in soft skills, communication enhancement, and
              personality development. Our founders bring academic experience,
              making us a trusted partner for colleges, corporates, and
              individuals. Through interactive sessions and focused mentoring, we
              help learners recognize their strengths, overcome hesitation, and
              step out of their comfort zones.
            </p>
          </section>

          {/* Vision & Mission Section */}
          <section className="space-y-8 pt-8 border-t border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
              Our Vision & Mission
            </h2>

            <div className="space-y-6">
              <p className="text-black text-lg leading-relaxed">
                Our vision is to bridge the gap between academic knowledge and
                practical skills required in the professional world. We train
                students to confidently face interviews, adapt to corporate
                culture, and communicate effectively in the real world.
              </p>

              <p className="text-black text-lg leading-relaxed">
                We help them through structured modules that include
                communication training, group discussions, presentation and
                public speaking practice, activity-based learning, and more.
                Through our customized Campus-to-Corporate Training, we help
                students develop strong communication skills, professional
                behavior, and interview readiness for successful placements.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
