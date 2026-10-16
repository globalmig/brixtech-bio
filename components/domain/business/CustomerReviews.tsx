import ReviewDisclaimer from '@/components/domain/business/ReviewDisclaimer';

interface Review {
  quote: string;
  context?: string;
}

interface CustomerReviewsProps {
  reviews?: Review[];
}

/**
 * Business 하위 페이지(건강기능식품/화장품 등)가 공유하는 고객 후기 섹션입니다.
 * reviews를 비워두면 고지 문구만 노출되며, 원문 후기를 확보하는 대로 데이터만 채워 넣으면 됩니다.
 */
export default function CustomerReviews({ reviews = [] }: CustomerReviewsProps) {
  return (
    <>
      <ReviewDisclaimer />
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-gray-300 rounded-xl border p-4">
              <p className="text-text-sub text-[0.9rem] leading-6">&quot;{review.quote}&quot;</p>
              {review.context ? (
                <p className="text-text-info mt-2 text-[0.8rem]">{review.context}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text-info text-[0.85rem]">후기 원문은 확보되는 대로 추가될 예정입니다.</p>
      )}
    </>
  );
}
