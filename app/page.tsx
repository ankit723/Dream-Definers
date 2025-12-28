import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cn, keyFeatures, social } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PartnersCarousel } from "@/components/home/partners-carousel";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { FAQSection } from "@/components/home/faq-section";
import { MovingCards } from "@/components/home/moving-cards";
import { CountUp } from "@/components/home/countup";

export const metadata: Metadata = {
  title: "Dream Definers | Home",
  description:
    "Dream Definers - Transforming Learners Into Leaders. Professional soft skills training, communication courses, aviation training, and pre-placement training to transform your career.",
  keywords: [
    "soft skills training",
    "communication skills",
    "aviation training",
    "pre-placement training",
    "career development",
    "personality development",
    "leadership training",
  ],
  openGraph: {
    title: "Dream Definers - Transforming Learners Into Leaders",
    description:
      "Professional soft skills training, communication courses, aviation training, and pre-placement training to transform your career.",
    url: "/",
    images: [
      {
        url: "/assets/common/logo.png",
        width: 1200,
        height: 630,
        alt: "Dream Definers",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};



export default function Home() {
  return (
    <section>
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/home/hero/hero-bg.jpeg')] bg-cover bg-center blur-md scale-110" />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative container mx-auto z-10 flex flex-col md:flex-row items-center justify-between h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-0 min-h-0">
          <div className="text-white text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-center md:text-left w-full md:w-auto md:flex-1">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="hero-heading">
                Transforming <span className="text-white text-7xl">Learners</span>
                <br />
                Into <span className="leader-text text-7xl">Leaders!</span>
              </h1>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 flex-wrap mt-4 sm:mt-6 md:mt-8">
              {social().map((item) => (
                <Link
                  href={item.url}
                  key={item.name}
                  className="
                    rounded-full 
                    bg-white/10 
                    backdrop-blur-md 
                    border border-white/20
                    p-2.5 sm:p-3 md:p-3.5
                    hover:bg-white/20 
                    transition-all duration-300
                    shrink-0
                  "
                  aria-label={item.name}
                >
                  <item.icon
                    className={cn(
                      "size-5 sm:size-6 md:size-7",
                      item.name === "LinkedIn" && "text-blue-400 md:text-blue-500",
                      item.name === "Instagram" && "text-pink-400 md:text-pink-500",
                      item.name === "Youtube" && "text-red-400 md:text-red-500",
                      item.name === "Call" && "text-green-400 md:text-green-500 rotate-90",
                      item.name === "Facebook" && "text-blue-400 md:text-blue-500"
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:flex md:items-center md:justify-center md:flex-1 md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="w-full h-full max-h-[500px] lg:max-h-[600px] xl:max-h-[700px]">
              <MovingCards />
            </div>
          </div>
        </div>
      </div>

      <section className=" w-full bg-[radial-gradient(circle,#F5DCE0_1.5px,transparent_1.5px)] bg-size-[40px_40px]">
        <div className="my-8 sm:my-10 md:my-12 lg:my-16 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold my-4 sm:my-6 md:my-8 lg:my-10">
            Courses
          </h1>

          {/* Grid layout for better mobile responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Card 1 */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-none overflow-hidden rounded-lg mx-auto">
                <Image
                  src="/assets/home/courses/life_skills.jpeg"
                  alt="Life Skills"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-blue-950 text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 px-6 py-2.5 sm:py-3 rounded-md bg-white hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full max-w-[280px] sm:max-w-none">
                Life Skills
              </h2>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-none overflow-hidden rounded-lg mx-auto">
                <Image
                  src="/assets/home/courses/aviation2.png"
                  alt="Aviation"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-blue-950 text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 px-6 py-2.5 sm:py-3 rounded-md bg-white hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full max-w-[280px] sm:max-w-none">
                Aviation
              </h2>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-none overflow-hidden rounded-lg mx-auto">
                <Image
                  src="/assets/home/courses/effective_communication.jpeg"
                  alt="Effective Communication"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-blue-950 text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 px-6 py-2.5 sm:py-3 rounded-md bg-white hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full max-w-[280px] sm:max-w-none">
                Effective Communication
              </h2>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-none overflow-hidden rounded-lg mx-auto">
                <Image
                  src="/assets/home/courses/placement.jpeg"
                  alt="Pre-Placement Training"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-blue-950 text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 px-6 py-2.5 sm:py-3 rounded-md bg-white hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full max-w-[280px] sm:max-w-none">
                Pre-Placement Training
              </h2>
            </div>

            {/* Card 5 */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-none overflow-hidden rounded-lg mx-auto">
                <Image
                  src="/assets/home/courses/corporate_training.jpeg"
                  alt="Corporate Training"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-blue-950 text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 px-6 py-2.5 sm:py-3 rounded-md bg-white hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full max-w-[280px] sm:max-w-none">
                Corporate Training
              </h2>
            </div>

            {/* Card 6 */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-none overflow-hidden rounded-lg mx-auto">
                <Image
                  src="/assets/home/courses/spoken_english.jpeg"
                  alt="Spoken English"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-blue-950 text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 px-6 py-2.5 sm:py-3 rounded-md bg-white hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full max-w-[280px] sm:max-w-none">
                Spoken English
              </h2>
            </div>
          </div>
        </div>

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-7">
            Our Speciality
          </h1>

          <p className="text-blue-900 text-center font-bold font-serif mb-1 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Communication and Confidence Checkup Camp (CCC)
          </p>
          <p className="container mx-auto pl-10 text-blue-900 text-left font-bold font-serif mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-md xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Pre and Post Assessment
          </p>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            <div className="flex flex-col items-start justify-center gap-4 sm:gap-5 md:gap-6 flex-1 w-full lg:w-auto">
              <div className="w-full">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="bg-blue-950 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-blue-950">
                    Pre-Assessment
                  </h2>
                </div>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
                  The pre-assessment line represents learners' performance
                  before training. It shows slow, gradual improvement at the
                  beginning, which eventually levels off after several
                  assessments. This plateau indicates that progress was limited
                  without structured instruction..
                </p>
              </div>

              <div className="w-full mt-4 sm:mt-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="bg-yellow-500 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-blue-950">
                    Post-Assessment
                  </h2>
                </div>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
                  The post-assessment line represents learners' performance
                  after training. It demonstrates steady and continuous
                  improvement across all assessments. By the final evaluation,
                  performance reaches a significantly higher level, reflecting
                  the impact of effective learning and training.
                </p>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-auto">
              <Image
                src="/assets/home/speciality/graph.png"
                alt="Speciality"
                width={650}
                height={650}
                className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[600px] h-auto mx-auto"
              />
              <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-950 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-blue-950">
                    Pre-Assessment
                  </h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-yellow-500 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-blue-950">
                    Post-Assessment
                  </h2>
                </div>
              </div>
              <p className="text-center text-xs xs:text-sm sm:text-base mt-2 sm:mt-3 px-2">
                The Garph above shows a clear trajectory of progress after the
                training
              </p>
            </div>
          </div>
        </div>

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold">
            Trusted Partners
          </h1>

          <PartnersCarousel />

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-40 2xl:mt-48">
            {keyFeatures().map((item) => (
              <div
                className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 border-2 border-blue-950 p-3 sm:p-4 md:p-5 lg:p-6 rounded-md bg-white hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full shadow-2xl"
                key={item.title}
              >
                <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl relative">
                  {" "}
                  {item.subTitle === "Students Trained" ? (
                    item.title
                  ) : item.subTitle === "Reviews"?(item.title): (
                    <CountUp to={parseInt(item.title)} />
                  )}
                  <item.icon
                    className={cn(
                      "size-3 xs:size-4 sm:size-5 md:size-6 absolute top-0 -right-3 xs:-right-4 sm:-right-5",
                      ` hover:text-white transition-all duration-300`
                    )}
                  />
                </p>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-center px-1">
                  {item.subTitle}
                </p>
              </div>
            ))}
          </div>

        </div>

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-8 md:mb-12 lg:mb-16">
            Meet Our Founders
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Founder Card - Sonali Singh */}
            <div className="flex flex-col">
              {/* Image wrapper with proper aspect ratio */}
              <div className="relative w-full aspect-4/5 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/assets/home/founders/sonali2.jpeg"
                  alt="Sonali Singh"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <h2 className="text-blue-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-4 sm:mt-5 md:mt-6">
                Sonali Singh
              </h2>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-3 text-gray-700">
                One of our esteemed founders, Sonali Singh, has an MA in
                Political Science and more than twenty years of experience as a
                Senior Class Teacher and Soft Skills Trainer. She is a
                professional CBSE-certified Teachers' Trainer, well known for
                creating and delivering substantial training.
              </p>

              <Link href="/our-founders" className="mt-5 w-fit">
                <Button
                  variant="outline"
                  className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all text-sm sm:text-base"
                >
                  Read More
                </Button>
              </Link>
            </div>

            {/* Founder Card - Randhir Garnaik */}
            <div className="flex flex-col">
              <div className="relative w-full aspect-4/5 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/assets/home/founders/randhir4.jpg"
                  alt="Randhir Garnaik"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-blue-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-4 sm:mt-5 md:mt-6">
                Randhir Garnaik
              </h2>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-3 text-gray-700">
                Our founder Randhir Garnaik is a well-trained Soft Skills
                Trainer, a life coach and an entrepreneur with more than twenty
                years of experience. His expertise spans Communicative English,
                Personality Development, Leadership, and Confidence Building.
              </p>

              <Link
                href="/our-founders/#randhir-garnaik"
                className="mt-5 w-fit"
              >
                <Button
                  variant="outline"
                  className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all text-sm sm:text-base"
                >
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <FAQSection />

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">
            Reviews
          </h1>

          <ReviewsCarousel />
        </div>
      </section>
    </section>
  );
}
