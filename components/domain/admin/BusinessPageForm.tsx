'use client';

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { CheckBox } from '@/components/common/CheckBox';
import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';
import { useIsClient } from '@/hooks/useIsClient';
import { BLOCK_TYPE_DEFAULTS } from '@/lib/business-block-defaults';
import { cn } from '@/lib/utils';
import type {
  BusinessCategory,
  BusinessPage,
  BusinessSection,
  BusinessSectionBackground,
  BusinessSectionContent,
} from '@/types/business';
import { BUSINESS_SECTION_BACKGROUNDS } from '@/types/business';

import { AdminButton as Button } from '@/components/domain/admin/AdminButton';
import AdminMessageDialog from '@/components/domain/admin/AdminMessageDialog';
import ConfirmDeleteButton from '@/components/domain/admin/ConfirmDeleteButton';
import { EyeIcon, EyeOffIcon, GripIcon, TrashIcon } from '@/components/domain/admin/icons';
import ImageUploadField from '@/components/domain/admin/ImageUploadField';
import StatusDropdown from '@/components/domain/admin/StatusDropdown';
import BusinessSectionRenderer from '@/components/domain/business/BusinessSectionRenderer';

type SectionType =
  | 'paragraph'
  | 'bulletList'
  | 'roadmapGrid'
  | 'infoTable'
  | 'customerReviews'
  | 'heroBanner'
  | 'imageText'
  | 'featureGrid'
  | 'beforeAfter'
  | 'processSteps';

const TYPE_LABELS: Partial<Record<SectionType, string>> = {
  paragraph: '본문 텍스트',
  bulletList: '불릿 리스트',
  infoTable: '정보 표',
  customerReviews: '고객 후기',
  heroBanner: '타이틀 배너',
  imageText: '사진 + 텍스트',
  featureGrid: '핵심 효능',
  beforeAfter: '변화 사례 (Before & After)',
  processSteps: '변화 과정',
};

/** 목록에서 항목 하나를 지우는 삭제 버튼에 공통으로 쓰는, 배경이 채워진 danger 스타일 */
const ITEM_DELETE_BUTTON_CLASS =
  'border-transparent bg-system-alert [color:white] hover:bg-system-alert hover:brightness-110 active:brightness-95';

interface RoadmapRowDraft {
  year: string;
  yearLabel: string;
  description: string;
}

interface InfoRowDraft {
  label: string;
  value: string;
}

interface ReviewRowDraft {
  quote: string;
  context: string;
  image: string;
}

interface HeroBannerDraft {
  imageAlt: string;
}

interface ImageTextDraft {
  body: string;
  imagePosition: 'left' | 'right';
}

interface FeatureGridItemDraft {
  title: string;
  label: string;
  description: string;
}

interface FeatureGridDraft {
  items: FeatureGridItemDraft[];
}

interface BeforeAfterItemDraft {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

const MIN_BEFORE_AFTER_ITEMS = 2;

interface BeforeAfterDraft {
  items: BeforeAfterItemDraft[];
}

interface ProcessStepDraft {
  image: string;
  label: string;
  description: string;
}

interface ProcessStepsDraft {
  steps: ProcessStepDraft[];
}

interface SectionDraft {
  key: string;
  title: string;
  titleEn: string;
  image: string;
  note: string;
  lead: string;
  backgroundColor: BusinessSectionBackground;
  hidden: boolean;
  type: SectionType;
  paragraphText: string;
  bulletItems: string;
  roadmapRows: RoadmapRowDraft[];
  infoRows: InfoRowDraft[];
  infoShowDisclaimer: boolean;
  reviewRows: ReviewRowDraft[];
  reviewDisplay: 'text' | 'gallery';
  heroBanner: HeroBannerDraft;
  imageText: ImageTextDraft;
  featureGrid: FeatureGridDraft;
  beforeAfter: BeforeAfterDraft;
  processSteps: ProcessStepsDraft;
}

function createKey() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `section-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createEmptySection(type: SectionType = 'paragraph'): SectionDraft {
  return {
    key: createKey(),
    title: '',
    titleEn: '',
    image: '',
    note: '',
    lead: '',
    backgroundColor: 'none',
    hidden: false,
    type,
    paragraphText: '',
    bulletItems: '',
    roadmapRows: [{ year: '', yearLabel: '', description: '' }],
    infoRows: [{ label: '', value: '' }],
    infoShowDisclaimer: false,
    reviewRows: [{ quote: '', context: '', image: '' }],
    reviewDisplay: 'text',
    heroBanner: { imageAlt: '' },
    imageText: { body: '', imagePosition: 'right' },
    featureGrid: {
      items: [{ title: '', label: '', description: '' }],
    },
    beforeAfter: {
      items: Array.from({ length: MIN_BEFORE_AFTER_ITEMS }, () => ({
        beforeImage: '',
        afterImage: '',
        beforeLabel: '',
        afterLabel: '',
      })),
    },
    processSteps: { steps: [{ image: '', label: '', description: '' }] },
  };
}

function sectionFromBusinessSection(section: BusinessSection): SectionDraft {
  const draft = createEmptySection();
  draft.key = section.id;
  draft.title = section.title ?? '';
  draft.titleEn = section.titleEn ?? '';
  draft.image = section.image ?? '';
  draft.note = section.note ?? '';
  draft.lead = section.lead ?? '';
  draft.backgroundColor = section.backgroundColor ?? 'none';
  draft.hidden = section.hidden;
  draft.type = section.content.type;

  switch (section.content.type) {
    case 'paragraph':
      draft.paragraphText = section.content.data.text;
      break;
    case 'bulletList':
      draft.bulletItems = section.content.data.items.join('\n');
      break;
    case 'roadmapGrid':
      draft.roadmapRows = section.content.data.items.length
        ? section.content.data.items.map((item) => ({
            year: item.year,
            yearLabel: item.yearLabel ?? '',
            description: item.description.join('\n'),
          }))
        : draft.roadmapRows;
      break;
    case 'infoTable':
      draft.infoRows = section.content.data.rows.length
        ? section.content.data.rows.map((row) => ({
            label: row.label,
            value: row.value,
          }))
        : draft.infoRows;
      draft.infoShowDisclaimer = section.content.data.showDisclaimer ?? false;
      break;
    case 'customerReviews':
      draft.reviewRows = section.content.data.reviews.length
        ? section.content.data.reviews.map((review) => ({
            quote: review.quote,
            context: review.context ?? '',
            image: review.image ?? '',
          }))
        : draft.reviewRows;
      draft.reviewDisplay = section.content.data.display ?? 'text';
      break;
    case 'heroBanner':
      draft.heroBanner = {
        imageAlt: section.content.data.imageAlt ?? '',
      };
      break;
    case 'imageText':
      draft.imageText = {
        body: section.content.data.body,
        imagePosition: section.content.data.imagePosition,
      };
      break;
    case 'featureGrid':
      draft.featureGrid = {
        items: section.content.data.items.length
          ? section.content.data.items.map((item) => ({
              title: item.title,
              label: item.label,
              description: item.description,
            }))
          : draft.featureGrid.items,
      };
      break;
    case 'beforeAfter': {
      const legacyData = section.content.data as unknown as {
        items?: BeforeAfterItemDraft[];
        beforeImage?: string;
        afterImage?: string;
        beforeLabel?: string;
        afterLabel?: string;
      };
      draft.beforeAfter = {
        items: legacyData.items?.length
          ? legacyData.items.map((item) => ({
              beforeImage: item.beforeImage,
              afterImage: item.afterImage,
              beforeLabel: item.beforeLabel ?? '',
              afterLabel: item.afterLabel ?? '',
            }))
          : legacyData.beforeImage || legacyData.afterImage
            ? [
                {
                  beforeImage: legacyData.beforeImage ?? '',
                  afterImage: legacyData.afterImage ?? '',
                  beforeLabel: legacyData.beforeLabel ?? '',
                  afterLabel: legacyData.afterLabel ?? '',
                },
              ]
            : draft.beforeAfter.items,
      };
      break;
    }
    case 'processSteps':
      draft.processSteps = {
        steps: section.content.data.steps.length
          ? section.content.data.steps.map((step) => ({
              image: step.image,
              label: step.label,
              description: step.description,
            }))
          : draft.processSteps.steps,
      };
      break;
  }

  return draft;
}

function toContentData(section: SectionDraft) {
  switch (section.type) {
    case 'paragraph':
      return { text: section.paragraphText.trim() };
    case 'bulletList':
      return {
        items: section.bulletItems
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
      };
    case 'roadmapGrid':
      return {
        items: section.roadmapRows
          .filter((row) => row.year.trim())
          .map((row) => ({
            year: row.year.trim(),
            yearLabel: row.yearLabel.trim() || undefined,
            description: row.description
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean),
          })),
      };
    case 'infoTable':
      return {
        rows: section.infoRows
          .filter((row) => row.label.trim() || row.value.trim())
          .map((row) => ({ label: row.label.trim(), value: row.value.trim() })),
        showDisclaimer: section.infoShowDisclaimer,
      };
    case 'customerReviews':
      return {
        display: section.reviewDisplay,
        reviews: section.reviewRows
          .filter((row) => row.quote.trim())
          .map((row) => ({
            quote: row.quote.trim(),
            context: row.context.trim() || undefined,
            image: row.image.trim() || undefined,
          })),
      };
    case 'heroBanner':
      return {
        imageAlt: section.heroBanner.imageAlt.trim() || undefined,
      };
    case 'imageText':
      return {
        body: section.imageText.body.trim(),
        imagePosition: section.imageText.imagePosition,
      };
    case 'featureGrid':
      return {
        items: section.featureGrid.items
          .filter((item) => item.title.trim())
          .map((item) => ({
            title: item.title.trim(),
            label: item.label.trim(),
            description: item.description.trim(),
          })),
      };
    case 'beforeAfter':
      return {
        items: section.beforeAfter.items
          .filter((item) => item.beforeImage.trim() && item.afterImage.trim())
          .map((item) => ({
            beforeImage: item.beforeImage.trim(),
            afterImage: item.afterImage.trim(),
            beforeLabel: item.beforeLabel.trim() || undefined,
            afterLabel: item.afterLabel.trim() || undefined,
          })),
      };
    case 'processSteps':
      return {
        steps: section.processSteps.steps
          .filter((step) => step.label.trim())
          .map((step) => ({
            image: step.image.trim(),
            label: step.label.trim(),
            description: step.description.trim(),
          })),
      };
  }
}

/**
 * 왼쪽 "미리보기" 영역에서, 지금 편집 중인 draft를 실제 공개 페이지가 쓰는
 * BusinessSectionRenderer에 그대로 넘기기 위해 BusinessSection 모양으로 바꿉니다.
 * 별도의 와이어프레임을 새로 그리지 않고 실제 컴포넌트를 재사용하므로, 사이트 쪽
 * 레이아웃이 바뀌어도 미리보기가 따로 어긋날 일이 없습니다. 비워둔 텍스트/이미지는
 * 실제 컴포넌트가 이미 빈 칸이나 회색 박스로 처리합니다.
 */
function toPreviewSection(section: SectionDraft): BusinessSection {
  return {
    id: section.key,
    title: section.title || null,
    titleEn: section.titleEn || null,
    image: section.image || null,
    backgroundColor: section.backgroundColor,
    note: section.note || null,
    lead: section.lead || null,
    hidden: false,
    sortOrder: 0,
    content: {
      type: section.type,
      data: toContentData(section),
    } as BusinessSectionContent,
  };
}

function validateSection(section: SectionDraft, index: number): string | null {
  const blockName = `${index + 1}번째 블록 (${TYPE_LABELS[section.type] ?? section.type})`;

  switch (section.type) {
    case 'paragraph':
      if (!section.paragraphText.trim()) {
        return `${blockName}: 본문을 입력하세요.`;
      }
      return null;
    case 'bulletList':
      if (!section.bulletItems.split('\n').some((line) => line.trim())) {
        return `${blockName}: 항목을 한 개 이상 입력하세요.`;
      }
      return null;
    case 'roadmapGrid':
      if (section.roadmapRows.length === 0) {
        return `${blockName}: 로드맵 항목을 한 개 이상 추가하세요.`;
      }
      if (
        section.roadmapRows.some(
          (row) => !row.year.trim() || !row.description.trim()
        )
      ) {
        return `${blockName}: 모든 로드맵 항목의 연도와 설명을 입력하세요.`;
      }
      return null;
    case 'infoTable':
      if (section.infoRows.length === 0) {
        return `${blockName}: 표 행을 한 개 이상 추가하세요.`;
      }
      if (
        section.infoRows.some((row) => !row.label.trim() || !row.value.trim())
      ) {
        return `${blockName}: 모든 표 행의 label과 value를 입력하세요.`;
      }
      return null;
    case 'customerReviews':
      if (section.reviewRows.length === 0) {
        return `${blockName}: 후기를 한 개 이상 추가하세요.`;
      }
      if (section.reviewRows.some((row) => !row.quote.trim())) {
        return `${blockName}: 모든 후기의 인용문을 입력하세요.`;
      }
      return null;
    case 'heroBanner':
      if (!section.image.trim()) {
        return `${blockName}: 배너 이미지를 업로드하세요.`;
      }
      return null;
    case 'imageText':
      if (!section.image.trim()) {
        return `${blockName}: 본문 이미지를 업로드하세요.`;
      }
      if (!section.imageText.body.trim()) {
        return `${blockName}: 본문을 입력하세요.`;
      }
      return null;
    case 'featureGrid':
      if (section.featureGrid.items.length === 0) {
        return `${blockName}: 카드 항목을 한 개 이상 추가하세요.`;
      }
      if (
        section.featureGrid.items.some(
          (item) =>
            !item.title.trim() || !item.label.trim() || !item.description.trim()
        )
      ) {
        return `${blockName}: 모든 카드 항목의 제목, 라벨, 설명을 입력하세요.`;
      }
      return null;
    case 'beforeAfter':
      if (section.beforeAfter.items.length < MIN_BEFORE_AFTER_ITEMS) {
        return `${blockName}: 변화 사례를 최소 ${MIN_BEFORE_AFTER_ITEMS}개 이상 추가하세요.`;
      }
      if (
        section.beforeAfter.items.some(
          (item) => !item.beforeImage.trim() || !item.afterImage.trim()
        )
      ) {
        return `${blockName}: 모든 변화 사례의 Before/After 이미지를 업로드하세요.`;
      }
      return null;
    case 'processSteps':
      if (section.processSteps.steps.length === 0) {
        return `${blockName}: 단계를 한 개 이상 추가하세요.`;
      }
      if (
        section.processSteps.steps.some(
          (step) =>
            !step.image.trim() || !step.label.trim() || !step.description.trim()
        )
      ) {
        return `${blockName}: 모든 단계의 이미지, 라벨, 설명을 입력하세요.`;
      }
      return null;
  }
}

interface SortableBlockRowProps {
  section: SectionDraft;
  isSelected: boolean;
  /** 하이드레이션 이전에는 dnd-kit이 드래그 핸들에 붙이는 속성/스타일을 그리지 않습니다. */
  dragEnabled: boolean;
  onSelect: () => void;
  onToggleHidden: () => void;
  onRemove: () => void;
}

function SortableBlockRow({
  section,
  isSelected,
  dragEnabled,
  onSelect,
  onToggleHidden,
  onRemove,
}: SortableBlockRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.key });

  return (
    <div
      ref={setNodeRef}
      style={
        dragEnabled
          ? { transform: CSS.Transform.toString(transform), transition }
          : undefined
      }
      onClick={onSelect}
      className={cn(
        'flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors',
        dragEnabled && isDragging && 'relative z-10 bg-white shadow-md',
        isSelected ? 'bg-[#f6f9ef]' : 'hover:bg-gray-50'
      )}
    >
      <button
        type="button"
        {...(dragEnabled ? attributes : null)}
        {...(dragEnabled ? listeners : null)}
        onClick={(event) => event.stopPropagation()}
        aria-label="순서 변경"
        className="shrink-0 cursor-grab touch-none text-text-info active:cursor-grabbing"
      >
        <GripIcon />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-small rounded-full px-2 py-0.5',
              isSelected ? 'bg-primary-2 text-white' : 'bg-gray-100 text-text-info'
            )}
          >
            {TYPE_LABELS[section.type] ?? section.type}
          </span>
          {section.hidden && (
            <span className="text-small rounded-full bg-gray-200 px-2 py-0.5 text-text-info">
              숨김
            </span>
          )}
        </div>
        <span className="mt-0.5 block truncate">
          {section.title || '(제목 없음)'}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleHidden();
          }}
          aria-label={section.hidden ? '블록 노출하기' : '블록 숨기기'}
          aria-pressed={!section.hidden}
          className="cursor-pointer text-text-info hover:text-gray-900"
        >
          {section.hidden ? <EyeOffIcon /> : <EyeIcon />}
        </button>
        <span onClick={(event) => event.stopPropagation()}>
          <ConfirmDeleteButton
            onConfirm={onRemove}
            confirmMessage="이 블록을 삭제하시겠습니까? 삭제 시 입력한 내용이 모두 사라지며 되돌릴 수 없습니다."
            className="cursor-pointer text-text-info hover:text-system-alert"
            ariaLabel="블록 삭제"
            confirmVariant="primary"
          >
            <TrashIcon />
          </ConfirmDeleteButton>
        </span>
      </div>
    </div>
  );
}

interface BusinessPageFormProps {
  initialPage?: BusinessPage;
  category: BusinessCategory;
}

export default function BusinessPageForm({
  initialPage,
  category,
}: BusinessPageFormProps) {
  const router = useRouter();
  const dragEnabled = useIsClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState(initialPage?.title ?? '');
  const [titleEn, setTitleEn] = useState(initialPage?.titleEn ?? '');
  const [lead, setLead] = useState(initialPage?.lead ?? '');
  const [sections, setSections] = useState<SectionDraft[]>(() =>
    initialPage && initialPage.sections.length > 0
      ? initialPage.sections.map(sectionFromBusinessSection)
      : [createEmptySection()]
  );
  const [selectedKey, setSelectedKey] = useState<string | null>(
    () => sections[0]?.key ?? null
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedSection = sections.find((s) => s.key === selectedKey);

  const buildSectionsPayload = () =>
    sections.map((section) => ({
      title: section.title.trim(),
      titleEn: section.titleEn.trim(),
      image: section.image.trim(),
      note: section.note.trim(),
      lead: section.lead.trim(),
      backgroundColor: section.backgroundColor,
      hidden: section.hidden,
      type: section.type,
      data: toContentData(section),
    }));

  const updateSection = (key: string, patch: Partial<SectionDraft>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.key === key ? { ...section, ...patch } : section
      )
    );
  };

  const addSection = () => {
    const next = createEmptySection();
    setSections((prev) => [...prev, next]);
    setSelectedKey(next.key);
  };

  const removeSection = (key: string) => {
    setSections((prev) => {
      if (prev.length <= 1) return prev;
      const index = prev.findIndex((section) => section.key === key);
      const next = prev.filter((section) => section.key !== key);
      if (selectedKey === key) {
        const fallback = next[Math.max(0, index - 1)];
        setSelectedKey(fallback ? fallback.key : null);
      }
      return next;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSections((prev) => {
      const oldIndex = prev.findIndex((section) => section.key === active.id);
      const newIndex = prev.findIndex((section) => section.key === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (let i = 0; i < sections.length; i += 1) {
      const error = validateSection(sections[i], i);
      if (error) {
        setValidationError(error);
        setSelectedKey(sections[i].key);
        return;
      }
    }

    setValidationError(null);
    setSubmitError(null);
    setIsPending(true);

    try {
      const response = await fetch(`/api/admin/business/${category}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          titleEn,
          lead,
          sections: buildSectionsPayload(),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(data.error ?? '저장에 실패했습니다.');
        return;
      }

      setSuccessMessage('저장되었습니다.');
    } finally {
      setIsPending(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    router.push('/admin/business');
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
    >
      <div className="grid grid-cols-[1fr_22rem] gap-6">
        <div className="rounded-2xl border border-gray-350 bg-white p-6 [&>*+*]:mt-5">
          <div>
            <label className="text-small mb-2 block font-semibold">
              영문 라벨 (선택){' '}
              <span className="text-text-info font-normal">
                제목 위에 작게 표시됩니다. 비워두면 BUSINESS로 표시됩니다.
              </span>
            </label>
            <Input
              name="titleEn"
              value={titleEn}
              onChange={(event) => setTitleEn(event.target.value.toUpperCase())}
              placeholder="예: SMART FARM"
            />
          </div>

          <div>
            <label className="text-small mb-2 block font-semibold">
              페이지 제목
            </label>
            <Input
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="예: 반려동물 푸드"
              required
            />
          </div>

          <div>
            <label className="text-small mb-2 block font-semibold">
              리드 문구
            </label>
            <Textarea
              name="lead"
              value={lead}
              onChange={(event) => setLead(event.target.value)}
              placeholder="페이지 상단에 표시할 한 줄 소개"
              required
            />
          </div>

          <div className="border-t border-gray-200 pt-5">
            {!selectedSection ? (
            <p className="text-text-info">
              왼쪽에서 블록을 선택하거나 추가하세요.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-h5 font-bold">블록 수정</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-text-default">화면에</span>
                    <StatusDropdown
                      isActive={!selectedSection.hidden}
                      onChange={(isActive) =>
                        updateSection(selectedSection.key, {
                          hidden: !isActive,
                        })
                      }
                      activeLabel="노출"
                      inactiveLabel="숨김"
                      className="w-24"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedKey(null)}
                    className="cursor-pointer text-text-info hover:text-gray-900"
                  >
                    닫기
                  </button>
                </div>
              </div>

              <div className="[&>*+*]:mt-5">
                <div>
                  <label className="text-small mb-2 block font-semibold">
                    블록 타입
                  </label>
                  <select
                    value={selectedSection.type}
                    onChange={(event) =>
                      updateSection(selectedSection.key, {
                        type: event.target.value as SectionType,
                      })
                    }
                    className="h-11 w-full cursor-pointer rounded-lg border border-gray-350 px-3"
                  >
                    {Object.entries(TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-small mb-2 block font-semibold">
                    블록 영문 라벨 (선택){' '}
                    <span className="text-text-info font-normal">
                      비워두면 &quot;{BLOCK_TYPE_DEFAULTS[selectedSection.type].titleEn}&quot;로
                      표시됩니다.
                    </span>
                  </label>
                  <Input
                    value={selectedSection.titleEn}
                    onChange={(event) =>
                      updateSection(selectedSection.key, {
                        titleEn: event.target.value.toUpperCase(),
                      })
                    }
                    placeholder={BLOCK_TYPE_DEFAULTS[selectedSection.type].titleEn}
                  />
                </div>
                <div>
                  <label className="text-small mb-2 block font-semibold">
                    블록 제목 (선택)
                  </label>
                  <Input
                    value={selectedSection.title}
                    onChange={(event) =>
                      updateSection(selectedSection.key, {
                        title: event.target.value,
                      })
                    }
                    placeholder="비워두면 제목 없이 표시"
                  />
                </div>
                <div>
                  <label className="text-small mb-2 block font-semibold">
                    블록 리드 문구 (선택){' '}
                    <span className="text-text-info font-normal">
                      비워두면 표시되지 않습니다.
                    </span>
                  </label>
                  <Textarea
                    value={selectedSection.lead}
                    onChange={(event) =>
                      updateSection(selectedSection.key, {
                        lead: event.target.value,
                      })
                    }
                    rows={2}
                    placeholder="리드 문구를 입력하세요"
                  />
                </div>
                <div>
                  <label className="text-small mb-2 block font-semibold">
                    블록 배경색
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    {BUSINESS_SECTION_BACKGROUNDS.map((option) => {
                      const isActive = selectedSection.backgroundColor === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          title={option.label}
                          aria-label={option.label}
                          aria-pressed={isActive}
                          onClick={() =>
                            updateSection(selectedSection.key, {
                              backgroundColor: option.value,
                            })
                          }
                          style={
                            option.value === 'primary-2'
                              ? { backgroundColor: '#173026' }
                              : option.value === 'none'
                                ? undefined
                                : { backgroundColor: option.value }
                          }
                          className={cn(
                            'size-8 shrink-0 cursor-pointer rounded-full border transition-shadow',
                            option.value === 'none' && 'bg-white',
                            isActive
                              ? 'border-primary-2 ring-2 ring-primary-2 ring-offset-2'
                              : 'border-gray-300 hover:border-gray-500'
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {(selectedSection.type === 'heroBanner' ||
                selectedSection.type === 'imageText' ||
                selectedSection.type === 'roadmapGrid') && (
                  <ImageUploadField
                    label={
                      selectedSection.type === 'heroBanner'
                        ? '배너 이미지'
                        : selectedSection.type === 'imageText'
                          ? '본문 이미지'
                          : '블록 이미지 (선택)'
                    }
                    name={`section-image-${selectedSection.key}`}
                    folder="business"
                    defaultValue={selectedSection.image}
                    hint={
                      selectedSection.type === 'heroBanner'
                        ? '배너 전체를 채우는 배경 이미지입니다. 1920x880px 이상 권장'
                        : selectedSection.type === 'imageText'
                          ? '텍스트 옆에 노출되는 이미지입니다. 1200x800px 이상 권장'
                          : '본문 블록에 16:9 가로 비율로 노출됩니다. 1600x900px 이상, 2MB 이하 권장'
                    }
                    onChange={(url) =>
                      updateSection(selectedSection.key, { image: url })
                    }
                  />
                )}

              {selectedSection.type === 'paragraph' && (
                <div>
                  <label className="text-small mb-2 block font-semibold">
                    본문
                  </label>
                  <Textarea
                    value={selectedSection.paragraphText}
                    onChange={(event) =>
                      updateSection(selectedSection.key, {
                        paragraphText: event.target.value,
                      })
                    }
                    rows={4}
                    placeholder="본문 내용을 입력하세요"
                  />
                </div>
              )}

              {selectedSection.type === 'bulletList' && (
                <div>
                  <label className="text-small mb-2 block font-semibold">
                    항목{' '}
                    <span className="text-text-info font-normal">
                      (한 줄에 하나씩 입력)
                    </span>
                  </label>
                  <Textarea
                    value={selectedSection.bulletItems}
                    onChange={(event) =>
                      updateSection(selectedSection.key, {
                        bulletItems: event.target.value,
                      })
                    }
                    rows={5}
                    placeholder={'항목 1\n항목 2\n항목 3'}
                  />
                </div>
              )}

              {selectedSection.type === 'roadmapGrid' && (
                <div className="flex flex-col gap-3">
                  <label className="text-small block font-semibold">
                    로드맵 항목
                  </label>
                  {selectedSection.roadmapRows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={row.year}
                          onChange={(event) =>
                            updateSection(selectedSection.key, {
                              roadmapRows: selectedSection.roadmapRows.map(
                                (r, i) =>
                                  i === rowIndex
                                    ? { ...r, year: event.target.value }
                                    : r
                              ),
                            })
                          }
                          placeholder="연도 (예: 2027)"
                        />
                        <Input
                          value={row.yearLabel}
                          onChange={(event) =>
                            updateSection(selectedSection.key, {
                              roadmapRows: selectedSection.roadmapRows.map(
                                (r, i) =>
                                  i === rowIndex
                                    ? { ...r, yearLabel: event.target.value }
                                    : r
                              ),
                            })
                          }
                          placeholder="부가 라벨 (예: 2~3년차)"
                        />
                      </div>
                      <Textarea
                        value={row.description}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            roadmapRows: selectedSection.roadmapRows.map(
                              (r, i) =>
                                i === rowIndex
                                  ? { ...r, description: event.target.value }
                                  : r
                            ),
                          })
                        }
                        rows={2}
                        placeholder={'설명 (한 줄에 하나씩)'}
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        onClick={() =>
                          updateSection(selectedSection.key, {
                            roadmapRows: selectedSection.roadmapRows.filter(
                              (_, i) => i !== rowIndex
                            ),
                          })
                        }
                        className={cn('self-start', ITEM_DELETE_BUTTON_CLASS)}
                      >
                        항목 삭제
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() =>
                      updateSection(selectedSection.key, {
                        roadmapRows: [
                          ...selectedSection.roadmapRows,
                          { year: '', yearLabel: '', description: '' },
                        ],
                      })
                    }
                    className="self-start bg-primary hover:brightness-110"
                  >
                    + 로드맵 항목 추가
                  </Button>
                </div>
              )}

              {selectedSection.type === 'infoTable' && (
                <div className="flex flex-col gap-3">
                  <label className="text-small block font-semibold">
                    표 행 (label / value)
                  </label>
                  {selectedSection.infoRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      <Input
                        value={row.label}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            infoRows: selectedSection.infoRows.map((r, i) =>
                              i === rowIndex
                                ? { ...r, label: event.target.value }
                                : r
                            ),
                          })
                        }
                        placeholder="예: 1일차"
                        className="flex-1"
                      />
                      <Input
                        value={row.value}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            infoRows: selectedSection.infoRows.map((r, i) =>
                              i === rowIndex
                                ? { ...r, value: event.target.value }
                                : r
                            ),
                          })
                        }
                        placeholder="예: 80% 개선"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        onClick={() =>
                          updateSection(selectedSection.key, {
                            infoRows: selectedSection.infoRows.filter(
                              (_, i) => i !== rowIndex
                            ),
                          })
                        }
                        className={cn('shrink-0', ITEM_DELETE_BUTTON_CLASS)}
                      >
                        삭제
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() =>
                      updateSection(selectedSection.key, {
                        infoRows: [
                          ...selectedSection.infoRows,
                          { label: '', value: '' },
                        ],
                      })
                    }
                    className="self-start bg-primary hover:brightness-110"
                  >
                    + 행 추가
                  </Button>
                  <CheckBox
                    checked={selectedSection.infoShowDisclaimer}
                    onCheckedChange={(checked) =>
                      updateSection(selectedSection.key, {
                        infoShowDisclaimer: checked,
                      })
                    }
                    label="표 위에 고객 후기 고지 문구 표시"
                  />
                </div>
              )}

              {selectedSection.type === 'customerReviews' && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-small mb-2 block font-semibold">
                      표시 방식
                    </label>
                    <select
                      value={selectedSection.reviewDisplay}
                      onChange={(event) =>
                        updateSection(selectedSection.key, {
                          reviewDisplay: event.target.value as 'text' | 'gallery',
                        })
                      }
                      className="h-11 w-full cursor-pointer rounded-lg border border-gray-350 px-3"
                    >
                      <option value="text">텍스트형 (인용문 카드)</option>
                      <option value="gallery">갤러리형 (사진 카드)</option>
                    </select>
                  </div>

                  <label className="text-small block font-semibold">
                    후기 (고지 문구는 항상 자동으로 표시됩니다)
                  </label>
                  {selectedSection.reviewRows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3"
                    >
                      {selectedSection.reviewDisplay === 'gallery' && (
                        <ImageUploadField
                          label={`${rowIndex + 1}번째 후기 사진`}
                          name={`review-image-${selectedSection.key}-${rowIndex}`}
                          folder="business"
                          defaultValue={row.image}
                          onChange={(url) =>
                            updateSection(selectedSection.key, {
                              reviewRows: selectedSection.reviewRows.map(
                                (r, i) => (i === rowIndex ? { ...r, image: url } : r)
                              ),
                            })
                          }
                        />
                      )}
                      <Textarea
                        value={row.quote}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            reviewRows: selectedSection.reviewRows.map(
                              (r, i) =>
                                i === rowIndex
                                  ? { ...r, quote: event.target.value }
                                  : r
                            ),
                          })
                        }
                        rows={2}
                        placeholder="후기 인용문"
                      />
                      <Input
                        value={row.context}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            reviewRows: selectedSection.reviewRows.map(
                              (r, i) =>
                                i === rowIndex
                                  ? { ...r, context: event.target.value }
                                  : r
                            ),
                          })
                        }
                        placeholder="부가 설명 (선택, 예: 2개월째 섭취)"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        onClick={() =>
                          updateSection(selectedSection.key, {
                            reviewRows: selectedSection.reviewRows.filter(
                              (_, i) => i !== rowIndex
                            ),
                          })
                        }
                        className={cn('self-start', ITEM_DELETE_BUTTON_CLASS)}
                      >
                        후기 삭제
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() =>
                      updateSection(selectedSection.key, {
                        reviewRows: [
                          ...selectedSection.reviewRows,
                          { quote: '', context: '', image: '' },
                        ],
                      })
                    }
                    className="self-start bg-primary hover:brightness-110"
                  >
                    + 후기 추가
                  </Button>
                </div>
              )}

              {selectedSection.type === 'heroBanner' && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-small mb-2 block font-semibold">
                      이미지 대체 텍스트 (선택)
                    </label>
                    <Input
                      value={selectedSection.heroBanner.imageAlt}
                      onChange={(event) =>
                        updateSection(selectedSection.key, {
                          heroBanner: {
                            ...selectedSection.heroBanner,
                            imageAlt: event.target.value,
                          },
                        })
                      }
                      placeholder="비워두면 블록 제목을 사용합니다"
                    />
                  </div>
                  <p className="text-small text-text-info">
                    이미지 위 라벨과 제목 아래 설명은 위 &quot;블록 영문 라벨&quot; /
                    &quot;블록 제목&quot; / &quot;블록 리드 문구&quot; 입력값을 사용합니다.
                  </p>
                </div>
              )}

              {selectedSection.type === 'imageText' && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-small mb-2 block font-semibold">
                      이미지 위치
                    </label>
                    <select
                      value={selectedSection.imageText.imagePosition}
                      onChange={(event) =>
                        updateSection(selectedSection.key, {
                          imageText: {
                            ...selectedSection.imageText,
                            imagePosition: event.target.value as 'left' | 'right',
                          },
                        })
                      }
                      className="h-11 w-full cursor-pointer rounded-lg border border-gray-350 px-3"
                    >
                      <option value="right">텍스트 + 사진 (사진이 오른쪽)</option>
                      <option value="left">사진 + 텍스트 (사진이 왼쪽)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-small mb-2 block font-semibold">
                      본문
                    </label>
                    <Textarea
                      value={selectedSection.imageText.body}
                      onChange={(event) =>
                        updateSection(selectedSection.key, {
                          imageText: {
                            ...selectedSection.imageText,
                            body: event.target.value,
                          },
                        })
                      }
                      rows={5}
                      placeholder="본문 내용을 입력하세요"
                    />
                  </div>
                  <p className="text-small text-text-info">
                    작은 라벨·제목·리드 문구는 위 &quot;블록 영문 라벨&quot; /
                    &quot;블록 제목&quot; / &quot;블록 리드 문구&quot; 입력값을 사용합니다.
                  </p>
                </div>
              )}

              {selectedSection.type === 'featureGrid' && (
                <div className="flex flex-col gap-3">
                  <label className="text-small block font-semibold">카드 항목</label>
                  {selectedSection.featureGrid.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3"
                    >
                      <Input
                        value={item.title}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            featureGrid: {
                              ...selectedSection.featureGrid,
                              items: selectedSection.featureGrid.items.map((it, i) =>
                                i === itemIndex ? { ...it, title: event.target.value } : it
                              ),
                            },
                          })
                        }
                        placeholder="제목 (예: 특허 기반 배양기술)"
                      />
                      <Input
                        value={item.label}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            featureGrid: {
                              ...selectedSection.featureGrid,
                              items: selectedSection.featureGrid.items.map((it, i) =>
                                i === itemIndex
                                  ? { ...it, label: event.target.value.toUpperCase() }
                                  : it
                              ),
                            },
                          })
                        }
                        placeholder="영문 라벨 (예: PATENTED TECHNOLOGY)"
                      />
                      <Textarea
                        value={item.description}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            featureGrid: {
                              ...selectedSection.featureGrid,
                              items: selectedSection.featureGrid.items.map((it, i) =>
                                i === itemIndex
                                  ? { ...it, description: event.target.value }
                                  : it
                              ),
                            },
                          })
                        }
                        rows={2}
                        placeholder="설명"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        onClick={() =>
                          updateSection(selectedSection.key, {
                            featureGrid: {
                              ...selectedSection.featureGrid,
                              items: selectedSection.featureGrid.items.filter(
                                (_, i) => i !== itemIndex
                              ),
                            },
                          })
                        }
                        className={cn('self-start', ITEM_DELETE_BUTTON_CLASS)}
                      >
                        항목 삭제
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() =>
                      updateSection(selectedSection.key, {
                        featureGrid: {
                          ...selectedSection.featureGrid,
                          items: [
                            ...selectedSection.featureGrid.items,
                            { title: '', label: '', description: '' },
                          ],
                        },
                      })
                    }
                    className="self-start bg-primary hover:brightness-110"
                  >
                    + 카드 추가
                  </Button>
                </div>
              )}

              {selectedSection.type === 'beforeAfter' && (
                <div className="flex flex-col gap-3">
                  <label className="text-small block font-semibold">
                    변화 사례{' '}
                    <span className="text-text-info font-normal">
                      (최소 {MIN_BEFORE_AFTER_ITEMS}개 이상 등록)
                    </span>
                  </label>
                  {selectedSection.beforeAfter.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col gap-4 rounded-lg border border-gray-300 p-3"
                    >
                      <div className="flex flex-col gap-2">
                        <ImageUploadField
                          label={`${itemIndex + 1}번째 사례 Before 이미지`}
                          name={`beforeafter-before-${selectedSection.key}-${itemIndex}`}
                          folder="business"
                          defaultValue={item.beforeImage}
                          onChange={(url) =>
                            updateSection(selectedSection.key, {
                              beforeAfter: {
                                items: selectedSection.beforeAfter.items.map((it, i) =>
                                  i === itemIndex ? { ...it, beforeImage: url } : it
                                ),
                              },
                            })
                          }
                        />
                        <Input
                          value={item.beforeLabel}
                          onChange={(event) =>
                            updateSection(selectedSection.key, {
                              beforeAfter: {
                                items: selectedSection.beforeAfter.items.map((it, i) =>
                                  i === itemIndex
                                    ? { ...it, beforeLabel: event.target.value }
                                    : it
                                ),
                              },
                            })
                          }
                          placeholder="Before 라벨 (기본값: BEFORE)"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <ImageUploadField
                          label={`${itemIndex + 1}번째 사례 After 이미지`}
                          name={`beforeafter-after-${selectedSection.key}-${itemIndex}`}
                          folder="business"
                          defaultValue={item.afterImage}
                          onChange={(url) =>
                            updateSection(selectedSection.key, {
                              beforeAfter: {
                                items: selectedSection.beforeAfter.items.map((it, i) =>
                                  i === itemIndex ? { ...it, afterImage: url } : it
                                ),
                              },
                            })
                          }
                        />
                        <Input
                          value={item.afterLabel}
                          onChange={(event) =>
                            updateSection(selectedSection.key, {
                              beforeAfter: {
                                items: selectedSection.beforeAfter.items.map((it, i) =>
                                  i === itemIndex
                                    ? { ...it, afterLabel: event.target.value }
                                    : it
                                ),
                              },
                            })
                          }
                          placeholder="After 라벨 (기본값: AFTER)"
                        />
                      </div>
                      {selectedSection.beforeAfter.items.length > MIN_BEFORE_AFTER_ITEMS && (
                        <Button
                          type="button"
                          variant="danger"
                          size="small"
                          onClick={() =>
                            updateSection(selectedSection.key, {
                              beforeAfter: {
                                items: selectedSection.beforeAfter.items.filter(
                                  (_, i) => i !== itemIndex
                                ),
                              },
                            })
                          }
                          className={cn('self-start', ITEM_DELETE_BUTTON_CLASS)}
                        >
                          사례 삭제
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() =>
                      updateSection(selectedSection.key, {
                        beforeAfter: {
                          items: [
                            ...selectedSection.beforeAfter.items,
                            { beforeImage: '', afterImage: '', beforeLabel: '', afterLabel: '' },
                          ],
                        },
                      })
                    }
                    className="self-start bg-primary hover:brightness-110"
                  >
                    + 사례 추가
                  </Button>
                </div>
              )}

              {selectedSection.type === 'processSteps' && (
                <div className="flex flex-col gap-3">
                  <label className="text-small block font-semibold">변화 과정 단계</label>
                  {selectedSection.processSteps.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3"
                    >
                      <ImageUploadField
                        label={`${stepIndex + 1}번째 단계 이미지`}
                        name={`processstep-image-${selectedSection.key}-${stepIndex}`}
                        folder="business"
                        defaultValue={step.image}
                        onChange={(url) =>
                          updateSection(selectedSection.key, {
                            processSteps: {
                              steps: selectedSection.processSteps.steps.map((s, i) =>
                                i === stepIndex ? { ...s, image: url } : s
                              ),
                            },
                          })
                        }
                      />
                      <Input
                        value={step.label}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            processSteps: {
                              steps: selectedSection.processSteps.steps.map((s, i) =>
                                i === stepIndex ? { ...s, label: event.target.value } : s
                              ),
                            },
                          })
                        }
                        placeholder="단계 라벨 (예: 1일차)"
                      />
                      <Textarea
                        value={step.description}
                        onChange={(event) =>
                          updateSection(selectedSection.key, {
                            processSteps: {
                              steps: selectedSection.processSteps.steps.map((s, i) =>
                                i === stepIndex
                                  ? { ...s, description: event.target.value }
                                  : s
                              ),
                            },
                          })
                        }
                        rows={2}
                        placeholder="설명 (예: 귀 주변 피부 발적과 긁는 행동 관찰)"
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        onClick={() =>
                          updateSection(selectedSection.key, {
                            processSteps: {
                              steps: selectedSection.processSteps.steps.filter(
                                (_, i) => i !== stepIndex
                              ),
                            },
                          })
                        }
                        className={cn('self-start', ITEM_DELETE_BUTTON_CLASS)}
                      >
                        단계 삭제
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() =>
                      updateSection(selectedSection.key, {
                        processSteps: {
                          steps: [
                            ...selectedSection.processSteps.steps,
                            { image: '', label: '', description: '' },
                          ],
                        },
                      })
                    }
                    className="self-start bg-primary hover:brightness-110"
                  >
                    + 단계 추가
                  </Button>
                </div>
              )}

              <div>
                <label className="text-small mb-2 block font-semibold">
                  보조 설명 (선택){' '}
                  <span className="text-text-info font-normal">
                    작은 이탤릭체로 블록 아래에 표시됩니다.
                  </span>
                </label>
                <Textarea
                  value={selectedSection.note}
                  onChange={(event) =>
                    updateSection(selectedSection.key, {
                      note: event.target.value,
                    })
                  }
                  rows={2}
                  placeholder="보조 설명이 필요한 경우, 작은 텍스트를 표시합니다."
                />
              </div>

              <div className="border-t border-gray-200 pt-5">
                <p className="text-small mb-3 font-semibold">
                  미리보기{' '}
                  <span className="text-text-info font-normal">
                    실제 사이트에 적용되는 모습입니다 (좁은 화면 기준)
                  </span>
                </p>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <BusinessSectionRenderer section={toPreviewSection(selectedSection)} />
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        <div className="flex h-fit flex-col overflow-hidden rounded-2xl border border-gray-350 bg-white">
          <div className="flex items-center justify-between border-b border-gray-350 px-5 py-4">
            <h2 className="font-semibold">블록 {sections.length}개</h2>
            <Button type="button" size="small" onClick={addSection}>
              + 블록 추가
            </Button>
          </div>

          <p className="text-small text-text-info px-5 pt-3">
            손잡이를 끌어 순서를 바꿀 수 있습니다.
          </p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((section) => section.key)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col divide-y divide-gray-200">
                {sections.map((section) => (
                  <SortableBlockRow
                    key={section.key}
                    section={section}
                    isSelected={section.key === selectedKey}
                    dragEnabled={dragEnabled}
                    onSelect={() => setSelectedKey(section.key)}
                    onToggleHidden={() =>
                      updateSection(section.key, { hidden: !section.hidden })
                    }
                    onRemove={() => removeSection(section.key)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {submitError && <p className="text-system-alert">{submitError}</p>}

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
      </div>

      <AdminMessageDialog
        message={validationError}
        onClose={() => setValidationError(null)}
      />
      <AdminMessageDialog
        message={successMessage}
        onClose={handleSuccessClose}
      />
    </form>
  );
}
