import Image from "next/image"
import Link from "next/link"

export default function GalleryPage() {
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
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="relative flex items-center justify-center mb-16">
          <Link
            href="/"
            className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full border border-black hover:bg-black hover:text-white transition"
          >
            ←
          </Link>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
            GALLERY
          </h1>
        </div>

        <Image src="/assets/gallery/gallery_copy.png" alt="Gallery Image" width={100} height={100} style={{height: "100%", width: "100vw"}} unoptimized/>
      </div>
    </div>
  )
}
