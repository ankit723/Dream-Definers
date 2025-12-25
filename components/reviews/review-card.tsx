import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  name: string;
  role?: string;
  rating: number;
  review: string;
  avatar?: string;
  className?: string;
}

const truncate =(txt:string)=>{
  return txt.length > 90 ? txt.substring(0, 90) + '...' : txt;

}

export const ReviewCard = ({
  name,
  role,
  rating,
  review,
  avatar,
  className,
}: ReviewCardProps) => {
  return (
    <div
      className={cn(
        "bg-white border-2 border-blue-950/20 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-950",
        className
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full bg-blue-950/10 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={64}
              height={64}
              className="object-cover"
            />
          ) : (
            <span className="text-blue-950 text-2xl font-bold">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-blue-950">{name}</h3>
          {role && (
            <p className="text-sm text-blue-950/70 mt-1">{role}</p>
          )}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={cn(
                  "size-4",
                  i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-blue-950/80 leading-relaxed text-sm">{truncate(review)}</p>
    </div>
  );
};

