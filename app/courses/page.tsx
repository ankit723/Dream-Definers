import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage() {
  const courses = [
    {
      title: "Life Skills",
      description:
        "Life Skills Training Programs Offer Young Boys And Girls Comprehensive Skills In Personal Development, Problem Solving, Decision Making, And Emotional Intelligence For Success In All Aspects Of Life.",
      image: "/assets/home/courses/life_skills.jpeg",
      imagePosition: "right" as const,
    },
    {
      title: "Aviation",
      description:
        "Aviation And Ground Staff Training Programs Offer Young Boys And Girls Comprehensive Skills In Flight Operations, Safety Protocols, Customer Service, And Technical Maintenance For Rewarding Careers In The Aviation Industry.",
      image: "/assets/home/courses/aviation2.png",
      imagePosition: "left" as const,
    },
    {
      title: "Effective Communication",
      description:
        "Effective Communication Training Programs Offer Young Boys And Girls Comprehensive Skills In Verbal And Non-Verbal Communication, Public Speaking, Presentation Skills, And Interpersonal Communication For Professional Success.",
      image: "/assets/home/courses/effective_communication.jpeg",
      imagePosition: "right" as const,
    },
    {
      title: "Pre-Placement Training",
      description:
        "Pre-Placement Training Programs Offer Young Boys And Girls Comprehensive Skills In Interview Techniques, Resume Building, Group Discussions, Aptitude Tests, And Professional Etiquette For Successful Career Placements.",
      image: "/assets/home/courses/placement.jpeg",
      imagePosition: "left" as const,
    },
    {
      title: "Corporate Training",
      description:
        "Corporate Training Programs Offer Young Boys And Girls Comprehensive Skills In Leadership, Team Management, Business Communication, Project Management, And Professional Development For Corporate Excellence.",
      image: "/assets/home/courses/corporate_training.jpeg",
      imagePosition: "right" as const,
    },
    {
      title: "Spoken English",
      description:
        "Spoken English Training Programs Offer Young Boys And Girls Comprehensive Skills In English Fluency, Pronunciation, Vocabulary Building, Grammar, And Conversational English For Confident Communication.",
      image: "/assets/home/courses/spoken_english.jpeg",
      imagePosition: "left" as const,
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
        <div className="">
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
                  <Link href="/free-consultancy">
                    JOIN NOW
                  </Link>
                </Button>
              </div>

              {/* Image */}
              <div className="flex-1 w-full scale-85">
                <div className="relative w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    style={{ maxWidth: "100", height: "auto" }}
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
