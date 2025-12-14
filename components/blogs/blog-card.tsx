import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date?: string;
  author?: string;
  slug?: string;
  className?: string;
}

export const BlogCard = ({
  title,
  excerpt,
  image,
  date,
  author,
  slug,
  className,
}: BlogCardProps) => {
  return (
    <div
      className={cn(
        "bg-white border-2 border-blue-950/20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-950 flex flex-col",
        className
      )}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-sm text-blue-950/70 mb-3">
          {date && <span>{date}</span>}
          {author && <span>• {author}</span>}
        </div>
        <h3 className="text-xl font-bold text-blue-950 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-blue-950/80 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {excerpt}
        </p>
        {slug && (
          <Link href={`/blogs/${slug}`}>
            <Button
              variant="outline"
              className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all duration-300 w-full"
            >
              Read More
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
