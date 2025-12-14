import Image from "next/image";
import Link from "next/link";

export default function GalleryPage() {
  // Gallery images in order
  const galleryImages = [
    {
      src: "/assets/gallery/image.png",
      alt: "Panel discussion in conference room with Vimarsh presentation",
    },
    {
      src: "/assets/gallery/image copy.png",
      alt: "Man speaking into microphone in auditorium",
    },
    {
      src: "/assets/gallery/image copy 2.png",
      alt: "Classroom training session with Dream Definers Academy logo",
    },
    {
      src: "/assets/gallery/image copy 3.png",
      alt: "Man presenting flowers to woman at seminar",
    },
    {
      src: "/assets/gallery/image copy 4.png",
      alt: "Group photo of students in matching uniforms",
    },
    {
      src: "/assets/gallery/image copy 5.png",
      alt: "Classroom with students at yellow desks",
    },
    {
      src: "/assets/gallery/image copy 6.png",
      alt: "Wide shot of auditorium with large audience",
    },
    {
      src: "/assets/gallery/image copy 7.png",
      alt: "Large auditorium with audience in blue chairs",
    },
    {
      src: "/assets/gallery/image copy 8.png",
      alt: "Indoor event with semi-circular seating arrangement",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header with Back Button and Title */}
        <div className="flex items-center justify-center gap-4 mb-16 relative">

          {/* Main Heading - Centered */}
          <h1 className="text-5xl md:text-6xl font-bold text-black">
            GALLERY
          </h1>
        </div>

        {/* Gallery Grid - 3 columns, 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full" style={{ display: "block" }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1200}
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                  style={{ maxWidth: "100%", height: "auto" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

