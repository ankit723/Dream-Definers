import Image from "next/image"

type Props = {
  src: string
  alt: string
  colSpan?: number
  rowSpan?: number
}

export function GalleryItem({
  src,
  alt,
  colSpan = 1,
  rowSpan = 1,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl 
      col-span-${colSpan} row-span-${rowSpan}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-110"
        unoptimized
      />
    </div>
  )
}
