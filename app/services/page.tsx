import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Aviation",
      description:
        "Comprehensive training programs for aviation and ground staff, covering flight operations, safety protocols, customer service, and technical maintenance.",
      image: "/assets/services/aviation2.png",
    },
    {
      title: "Soft Skills and Pre-Placement Training",
      description:
        "Develop essential soft skills and prepare for job placements through interactive training sessions and personalized mentoring.",
      image: "/assets/services/softskills2.png",
    },
    {
      title: "Communication and personality development",
      description:
        "Enhance your communication abilities and personal growth through structured programs designed to build confidence and professional presence.",
      image: "/assets/services/communication2.png",
    },
    {
      title: "Dynamic public speaking and stage presence",
      description:
        "Master the art of public speaking and develop commanding stage presence through practical training and real-world practice.",
      image: "/assets/services/dynamic_speaking2.png",
    },
    {
      title: "Corporate training and industry readiness",
      description:
        "Prepare for the corporate world with industry-focused training programs that bridge the gap between academic learning and professional requirements.",
      image: "/assets/services/corporate_training2.png",
    },
    {
      title: "Resume Building and Email etiquette",
      description:
        "Learn to create compelling resumes and master professional email communication to stand out in the job market.",
      image: "/assets/services/resume_building.png",
    },
    {
      title: "Problem Solving and critical thinking",
      description:
        "Develop analytical skills and problem-solving abilities through structured exercises and critical thinking workshops.",
      image: "/assets/services/problem_solving2.png",
    },
    {
      title: "Career orientation workshops",
      description:
        "Get guidance on your career path through interactive workshops designed to help you make informed professional decisions.",
      image: "/assets/services/career_orientation2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header with Back Button and Title */}
        <div className="flex items-center justify-center gap-4 mb-16 relative">

          {/* Main Heading - Centered */}
          <h1 className="text-5xl md:text-6xl font-bold">
            OUR SERVICES
          </h1>
        </div>

        {/* Services Grid - 2 rows, 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-blue-950 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

