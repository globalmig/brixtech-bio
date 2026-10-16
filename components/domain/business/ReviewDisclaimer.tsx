/**
 * Business 하위 페이지에서 선행 판매/고객 반응 자료를 인용할 때 반드시 함께 노출해야 하는 고지 문구입니다.
 * 문구를 바꿀 일이 생기면 이 파일 한 곳만 수정하면 됩니다.
 */
export default function ReviewDisclaimer() {
  return (
    <p className="text-text-info border-gray-400 mb-4 border-l-2 pl-3 text-[0.85rem] leading-6">
      본 자료는 이전 법인에서 진행된 선행 판매 및 고객 반응을 익명화·요약한 자료이며, 신설법인의
      공식 판매실적 또는 효능 검증 자료가 아닙니다.
    </p>
  );
}
