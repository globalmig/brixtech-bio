import Image from 'next/image';
import type { CustomerReviewsDisplay } from '@/types/business';

interface Review {
  quote: string;
  context?: string;
  image?: string;
}

interface CustomerReviewsProps {
  reviews?: Review[];
  display?: CustomerReviewsDisplay;
}

export default function CustomerReviews({
  reviews = [],
  display = 'text',
}: CustomerReviewsProps) {
  return (
    <>
      {display === 'gallery' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                {review.image ? (
                  <Image
                    src={review.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 260px, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <p className="text-text-sub line-clamp-4">
                &quot;{review.quote}&quot;
              </p>
              {review.context ? (
                <p className="text-text-info">{review.context}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-gray-300 rounded-xl border p-4">
              <p className="text-text-sub">&quot;{review.quote}&quot;</p>
              {review.context ? (
                <p className="text-text-info mt-2">{review.context}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
