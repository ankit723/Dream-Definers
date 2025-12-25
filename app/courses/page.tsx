import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const courses = [
    {
      title: "Aviation",
      description:
        "Aviation And Ground Staff Training Programs Offer Young Boys And Girls Comprehensive Skills In Flight Operations, Safety Protocols, Customer Service, And Technical Maintenance For Rewarding Careers In The Aviation Industry.",
      image: "/assets/home/courses/aviation2.png",
      imagePosition: "right" as const,
    },
    {
      title: "Effective Communication",
      description:
        "Effective Communication Training Programs Offer Young Boys And Girls Comprehensive Skills In Flight Operations, Safety Protocols, Customer Service, And Technical Maintenance For Rewarding Careers In The Aviation Industry.",
      image: "/assets/home/courses/communication2.png",
      imagePosition: "left" as const,
    },
    {
      title: "Pre-Placement Traning",
      description:
        "Pre-Placement Training Programs Offer Young Boys And Girls Comprehensive Skills In Flight Operations, Safety Protocols, Customer Service, And Technical Maintenance For Rewarding Careers In The Aviation Industry.",
      image: "/assets/home/courses/placement2.png",
      imagePosition: "right" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header with Back Button and Title */}
        <div className="flex items-center justify-center gap-4  relative">

          {/* Main Heading - Centered */}
          <h1 className="text-5xl md:text-6xl font-bold text-black">
            COURSES
          </h1>
        </div>

        {/* Course Sections */}
        <div className="space-y-20 scale-90">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                course.imagePosition === "right" ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-950">
                  {course.title}
                </h2>
                <p className="text-black leading-relaxed text-lg">
                  {course.description}
                </p>
                <Button
                  variant="outline"
                  className="bg-white border-2 border-black text-black hover:bg-blue-900 hover:text-white hover:border-white active:scale-95 cursor-pointer  rounded-lg px-8 py-6 text-lg font-medium"
                >
                  JOIN NOW
                </Button>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    style={{ maxWidth: "100%", height: "auto" }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
