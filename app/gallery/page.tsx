import Image from "next/image"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide text-blue-950">
            GALLERY
          </h1>
        </div>

        {/* Gallery Image */}
        <div className="relative w-full h-auto mt-8 sm:mt-12 md:mt-16">
          <div className="relative w-full aspect-auto overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg">
            <Image
              src="/assets/gallery/gallery_copy.png"
              alt="Gallery Image"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  )
}
