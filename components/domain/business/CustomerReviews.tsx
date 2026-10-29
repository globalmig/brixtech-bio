'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/common/Dialog';
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openReview = openIndex !== null ? reviews[openIndex] : undefined;

  return (
    <>
      {display === 'gallery' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100 cursor-pointer" onClick={() => setOpenIndex(index)}>
                {review.image ? (
                  <Image
                    src={review.image}
                    alt="고객 후기 이미지"
                    fill
                    sizes="(min-width: 1024px) 260px, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                {review.context ? (
                  <p className="text-h5 text-primary-2">
                    {review.context}
                  </p>
                ) : null}
                  <p className="text-body line-clamp-3 mt-2">
                    &quot;{review.quote}&quot;
                  </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-gray-300 rounded-xl border p-4">
              {review.context ? (
                <p className="text-h5 text-primary-2">
                  {review.context}
                </p>
              ) : null}
              <p className="text-body mt-2">
                &quot;{review.quote}&quot;
              </p>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={openReview !== undefined}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null);
        }}
      >
        <DialogContent className="w-100">
          {openReview?.image &&
            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
              <Image
                src={openReview.image}
                alt="고객 후기 이미지"
                fill
                sizes="(min-width: 1024px) 260px, 50vw"
                className="object-cover"
              />
            </div>
          }
          <p className="text-body">
            &quot;{openReview?.quote}&quot;
          </p>
          <DialogFooter>
            <Button type="button" onClick={() => setOpenIndex(null)}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
