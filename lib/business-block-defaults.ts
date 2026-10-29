import type { BusinessBlockType, ImageAspectRatio } from '@/types/business';

export const DEFAULT_IMAGE_ASPECT_RATIO: ImageAspectRatio = '6:4';

export const IMAGE_ASPECT_RATIO_OPTIONS: {
  value: ImageAspectRatio;
  /** ImageTextSplit에서 실제 이미지 박스에 적용하는 클래스 */
  imageClassName: string;
  /** 관리자 버튼 미리보기 박스에 적용하는 클래스 */
  previewClassName: string;
}[] = [
  { value: '1:1', imageClassName: 'aspect-square', previewClassName: 'aspect-square h-10' },
  { value: '4:5', imageClassName: 'aspect-4/5', previewClassName: 'aspect-4/5 h-10' },
  { value: '4:6', imageClassName: 'aspect-4/6', previewClassName: 'aspect-4/6 h-10' },
  { value: '6:4', imageClassName: 'aspect-6/4', previewClassName: 'aspect-6/4 h-10' },
];

export const BLOCK_TYPE_DEFAULTS: Record<
  BusinessBlockType,
  { titleEn: string; lead: string }
> = {
  paragraph: { titleEn: 'BUSINESS', lead: '브릭스텍바이오의 이야기를 전합니다.' },
  bulletList: { titleEn: 'POINT', lead: '핵심 내용을 정리했습니다.' },
  heroBanner: { titleEn: 'BUSINESS', lead: '브릭스텍바이오의 사업을 소개합니다.' },
  imageText: { titleEn: 'DETAIL', lead: '자세한 내용을 소개합니다.' },
  featureGrid: { titleEn: 'FEATURE', lead: '핵심 포인트를 소개합니다.' },
  processSteps: { titleEn: 'PROCESS', lead: '진행 과정을 소개합니다.' },
  beforeAfter: { titleEn: 'BEFORE & AFTER', lead: '사용 전후 변화를 보여드립니다.' },
  infoTable: { titleEn: 'INFO', lead: '세부 정보를 안내합니다.' },
  roadmapGrid: { titleEn: 'ROADMAP', lead: '앞으로의 계획을 소개합니다.' },
  customerReviews: { titleEn: 'REVIEW', lead: '고객들의 생생한 후기를 소개합니다.' },
};
