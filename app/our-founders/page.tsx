import Image from "next/image";
import Link from "next/link";

export default function OurFoundersPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-blue-950 text-center mb-16">
          OUR FOUNDERS
        </h1>

        {/* Sonali Singh Section */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content - Left */}
            <div className="flex-1 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
                Sonali Singh
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  One of our esteemed founders, Sonali Singh, has an MA in
                  Political Science and more than twenty years of experience as
                  a Senior Class Teacher and Soft Skills Trainer. She is a
                  professional CBSE-certified Teachers&apos; Trainer, well known
                  for creating and delivering substantial training. She has a
                  variety of skills ranging from communication and leadership to
                  interpersonal skills and more, that can be delivered to
                  different kinds of learners.
                </p>
                <p>
                  Her extensive experience in the educational field has made her
                  an expert in understanding the diverse needs of students and
                  professionals alike. She has a unique ability to connect with
                  her audience, making complex concepts accessible and
                  engaging.
                </p>
                <p>
                  Sonali has been instrumental in hosting numerous corporate
                  events and educational seminars, where her dynamic presence
                  and effective communication have left a lasting impact on
                  participants. Her ability to adapt her teaching methodology to
                  suit different learning styles has made her a sought-after
                  trainer in the industry.
                </p>
                <p>
                  Her dedication to Dream Definers and its mission to bridge
                  academic learning and the world of work is evident in her
                  commitment to empowering students and professionals with the
                  skills they need to succeed. Through her training, she has
                  influenced countless individuals, helping them achieve their
                  personal and professional goals.
                </p>
              </div>
            </div>

            {/* Image - Right */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[3/4]">
                <Image
                  src="/assets/home/founders/sonali.png"
                  alt="Sonali Singh"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Randhir Garnaik Section */}
        <div>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image - Left */}
            <div className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-md aspect-[3/4]">
                <Image
                  src="/assets/home/founders/randhir.png"
                  alt="Randhir Garnaik"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>

            {/* Text Content - Right */}
            <div className="flex-1 space-y-4 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
                Randhir Garnaik
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  Our founder Randhir Garnaik is a well-trained Soft Skills
                  Trainer, a life coach and an entrepreneur who carries an
                  experience of more than twenty years. His expertise spans over
                  Communicative English, Personality Development, Building
                  Resilience, Confidence Building, Leadership, and both critical
                  and creative thinking. He is known for his energetic and
                  highly interactive sessions and a fine balance of being a
                  charismatic leader and a professional mentor.
                </p>
                <p>
                  Randhir&apos;s training background is exceptional, having been
                  trained from Professor Jordan Peterson&apos;s Future
                  Authoring Programme and Neuro Linguistic Conditioning. This
                  unique combination of knowledge has enabled him to develop
                  innovative training methodologies that address both the
                  cognitive and emotional aspects of learning and development.
                </p>
                <p>
                  His extensive experience includes conducting faculty training
                  programs at various educational institutions, where he has
                  empowered teachers with the skills needed to enhance their
                  teaching effectiveness. Additionally, he has conducted
                  workshops for the military, helping service members develop
                  crucial communication and leadership skills. His corporate
                  training expertise is demonstrated through his work with major
                  companies like Wipro and Reliance Jio, where he has
                  successfully trained employees across different levels.
                </p>
                <p>
                  Through strategic partnerships with training institutes,
                  Randhir has expanded his reach, enabling him to impact more
                  lives. His work in guiding students for pre-placement and
                  employability has been particularly impactful, as he helps
                  young professionals bridge the gap between academic
                  qualifications and industry requirements. His comprehensive
                  approach ensures that individuals are not just prepared for
                  interviews, but are equipped with the skills needed for
                  long-term career success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

