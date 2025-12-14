import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { cn, keyFeatures, social } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PartnersCarousel } from "@/components/home/partners-carousel";
import { ReviewsCarousel } from "@/components/home/reviews-carousel";
import { FAQSection } from "@/components/home/faq-section";
import { MovingCards } from "@/components/home/moving-cards";

export const metadata: Metadata = {
  title: "Dream Definers | Home",
  description: "Dream Definers - Transforming Learners Into Leaders. Professional soft skills training, communication courses, aviation training, and pre-placement training to transform your career.",
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
    description: "Professional soft skills training, communication courses, aviation training, and pre-placement training to transform your career.",
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
        <div className="absolute inset-0 bg-[url('/assets/home/hero/hero-bg.jpeg')] bg-cover bg-center blur-md scale-110"/>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative container mx-auto z-10 flex flex-col md:flex-row items-center justify-between h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-0 min-h-0">
          <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-center md:text-left w-full md:w-auto md:flex-1">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="leading-tight wrap-break-word">Transforming Learners</h1>
              <h1 className="leading-tight wrap-break-word">Into <span className="text-blue-300 md:text-blue-800">Leaders!</span></h1>
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
                      item.name === "LinkedIn" && "text-blue-400 md:text-blue-600",
                      item.name === "Youtube" && "text-red-400 md:text-red-600",
                      item.name === "Call" && "text-gray-200 md:text-gray-800",
                      item.name === "Facebook" && "text-blue-400 md:text-blue-600"
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

      <section className=" w-full bg-[radial-gradient(circle,#F5DCE0_3px,transparent_2px)] bg-size-[30px_30px]">
        <div className="my-8 sm:my-10 md:my-12 lg:my-16 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">          
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold my-4 sm:my-6 md:my-8 lg:my-10">Courses</h1>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none">
              <Image src="/assets/home/courses/aviation.png" alt="Course 1" width={450} height={450} className="w-full max-w-[150px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] 2xl:max-w-[450px] h-auto" />
              <h2 className="text-blue-950 text-xs xs:text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 p-2 sm:p-2.5 md:p-3 rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full sm:w-auto px-4 sm:px-6">Aviation</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none">
              <Image src="/assets/home/courses/communication.png" alt="Course 2" width={450} height={450} className="w-full max-w-[150px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] 2xl:max-w-[450px] h-auto" />
              <h2 className="text-blue-950 text-xs xs:text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 p-2 sm:p-2.5 md:p-3 rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full sm:w-auto px-4 sm:px-6">Effective Communication</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none">
              <Image src="/assets/home/courses/placement.png" alt="Course 3" width={450} height={450} className="w-full max-w-[150px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] 2xl:max-w-[450px] h-auto" />
              <h2 className="text-blue-950 text-xs xs:text-sm sm:text-base md:text-lg text-center font-bold border border-blue-950 p-2 sm:p-2.5 md:p-3 rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full sm:w-auto px-4 sm:px-6">Pre-Placement Training</h2>
            </div>

          </div>
        </div>

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">          
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10">Our Speciality</h1>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            <div className="flex flex-col items-start justify-center gap-4 sm:gap-5 md:gap-6 flex-1 w-full lg:w-auto">
              <div className="w-full">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="bg-blue-950 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-blue-950">Pre-Assessment</h2>
                </div>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">The pre-assessment line represents learners' performance before training. It shows slow, gradual improvement at the beginning, which eventually levels off after several assessments. This plateau indicates that progress was limited without structured instruction..</p>
              </div>

              <div className="w-full mt-4 sm:mt-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="bg-yellow-500 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-blue-950">Post-Assessment</h2>
                </div>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">The post-assessment line represents learners' performance after training. It demonstrates steady and continuous improvement across all assessments. By the final evaluation, performance reaches a significantly higher level, reflecting the impact of effective learning and training.</p>
              </div>
              
              <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20">
                <p className="text-blue-900 font-bold text-xs xs:text-sm sm:text-base md:text-lg">Communication and Confidence Checkup Camp</p>
                <p className="text-blue-900 font-bold text-xs xs:text-sm sm:text-base md:text-lg">Pre and Post Assessment</p>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-auto">
              <Image src="/assets/home/speciality/graph.png" alt="Speciality" width={650} height={650} className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[600px] h-auto mx-auto"/>
              <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-950 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-blue-950">Pre-Assessment</h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-yellow-500 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full hover:bg-transparent hover:border-2 hover:border-primary transition-all duration-300 cursor-pointer shrink-0"></div>
                  <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-blue-950">Post-Assessment</h2>
                </div>
              </div>
              <p className="text-center text-xs xs:text-sm sm:text-base mt-2 sm:mt-3 px-2">The Garph above shows a clear  trajectory of progress after the training</p>
            </div>
          </div>
        </div>

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10">Trusted Partners</h1>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-6 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
            {
              keyFeatures().map((item) => (
                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 border-2 border-blue-950 p-3 sm:p-4 md:p-5 lg:p-6 rounded-md hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer w-full shadow-2xl" key={item.title}>
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl relative">{item.title}
                    <item.icon className={cn("size-3 xs:size-4 sm:size-5 md:size-6 absolute top-0 -right-3 xs:-right-4 sm:-right-5", ` hover:text-white transition-all duration-300`)} />
                  </p>
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-center px-1">{item.subTitle}</p>
                </div>
              ))
            }
          </div>
          
          <PartnersCarousel />

        </div>  

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">Meet Our Founders</h1>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            <div className="flex flex-col items-start justify-center w-full lg:w-1/2">
              <Image src="/assets/home/founders/sonali.png" alt="Founder 1" width={500} height={400} className="w-full h-auto rounded-lg" />
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-blue-950 my-3 sm:my-4 md:my-5 lg:my-6">Sonali Singh</h2>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg w-full leading-relaxed">One of our esteemed founders, Sonali Singh, has an MA in Political Science and more than twenty years of experience as a Senior Class Teacher and Soft Skills Trainer. She is a professional CBSE-certified Teachers' Trainer, well known for creating and delivering substantial training. She has a variety of skills ranging from communication and leadership to interpersonal skills and more, that can be delivered to different kinds of learners.</p>
              <Link href="/our-founders">
                <Button variant={"outline"} className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all duration-300 my-3 sm:my-4 md:my-5 lg:my-6 w-full sm:w-auto text-xs xs:text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5">Read More</Button>
              </Link>
            </div>
            
            <div className="flex flex-col items-start justify-center w-full lg:w-1/2">
              <Image src="/assets/home/founders/randhir.png" alt="Founder 2" width={500} height={400} className="w-full h-auto rounded-lg" />
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-blue-950 my-3 sm:my-4 md:my-5 lg:my-6">Randhir Garnaik</h2>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg w-full leading-relaxed">Our founder Randhir Garnaik is a well-trained Soft Skills Trainer, a life coach and an entrepreneur who carries an experience of more than twenty years. His expertise spans over Communicative English, Personality Development, Building Resilience, Confidence Building, Leadership, and both critical and creative thinking. He is known for his energetic and highly interactive sessions and a fine balance of being a charismatic leader and a professional mentor .</p>
              <Link href="/our-founders/#randhir-garnaik">
                <Button variant={"outline"} className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all duration-300 my-3 sm:my-4 md:my-5 lg:my-6 w-full sm:w-auto text-xs xs:text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5">Read More</Button>
              </Link>
            </div>
          </div>
        </div>

        <FAQSection />

        <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="text-blue-950 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">Reviews</h1>

          <ReviewsCarousel />
        </div>
      </section>

    </section>
      
  );
}