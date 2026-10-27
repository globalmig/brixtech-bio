import Image from 'next/image';

import BeforeAfterCompare from '@/components/domain/business/BeforeAfterCompare';
import FeatureGrid from '@/components/domain/business/FeatureGrid';
import ImageTextSplit from '@/components/domain/business/ImageTextSplit';
import ProcessSteps from '@/components/domain/business/ProcessSteps';
import CustomerReviews from '@/components/domain/business/CustomerReviews';
import BulletList from '@/components/domain/page/BulletList';
import HeroBanner from '@/components/domain/page/HeroBanner';
import InfoTable from '@/components/domain/page/InfoTable';
import PageSection from '@/components/domain/page/PageSection';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';
import { BLOCK_TYPE_DEFAULTS } from '@/lib/business-block-defaults';
import { cn } from '@/lib/utils';
import type { BusinessSection } from '@/types/business';

function resolveTitleEn(section: BusinessSection) {
  return section.titleEn?.trim() || BLOCK_TYPE_DEFAULTS[section.content.type].titleEn;
}

function resolveLead(section: BusinessSection) {
  return section.lead?.trim() ?? '';
}

/**
 * Tailwind는 빌드 시 소스 코드에 리터럴로 적힌 클래스만 정적 분석해 CSS를 생성합니다.
 * `bg-[${background}]`처럼 런타임에 조합한 임의값 클래스는(관리자가 고른 고정 색상 중
 * 다른 파일에 우연히 같은 리터럴이 없는 한) 스타일이 전혀 생성되지 않아 적용되지
 * 않습니다. 그래서 헥스 색상은 클래스 대신 인라인 style로 적용합니다.
 */
function resolveSectionBackground(section: BusinessSection): {
  className: string;
  style?: { backgroundColor: string };
} {
  const background = section.backgroundColor;
  if (!background || background === 'none') return { className: '' };
  if (background === 'primary-2') return { className: 'bg-primary-2 on-dark' };
  return { className: '', style: { backgroundColor: background } };
}

function SectionNote({ note }: { note: string | null }) {
  if (!note) return null;
  return (
    <p className="text-text-info mt-3 text-[0.85rem] italic">{note}</p>
  );
}

function SectionBody({ section }: { section: BusinessSection }) {
  switch (section.content.type) {
    case 'paragraph':
      return section.content.data.text ? (
        <p className="text-text-sub whitespace-pre-line text-[0.95rem] leading-6">
          {section.content.data.text}
        </p>
      ) : null;
    case 'bulletList':
      return <BulletList items={section.content.data.items} />;
    case 'roadmapGrid':
      return <RoadmapGrid items={section.content.data.items} />;
    case 'infoTable':
      return (
        <>
          <InfoTable rows={section.content.data.rows} />
        </>
      );
    case 'customerReviews':
      return (
        <CustomerReviews
          reviews={section.content.data.reviews}
          display={section.content.data.display}
        />
      );
    case 'featureGrid':
      return <FeatureGrid items={section.content.data.items} />;
    case 'beforeAfter':
      return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
          {section.content.data.items.map((item, index) => (
            <BeforeAfterCompare
              key={index}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              beforeLabel={item.beforeLabel}
              afterLabel={item.afterLabel}
            />
          ))}
        </div>
      );
    case 'processSteps':
      return <ProcessSteps steps={section.content.data.steps} />;
    default:
      return null;
  }
}

export default function BusinessSectionRenderer({
  section,
}: {
  section: BusinessSection;
}) {
  const { className: backgroundClass, style: backgroundStyle } =
    resolveSectionBackground(section);

  if (section.content.type === 'heroBanner') {
    return (
      <section className={cn('w-full', backgroundClass)} style={backgroundStyle}>
        <HeroBanner
          eyebrow={resolveTitleEn(section)}
          title={section.title ?? ''}
          description={resolveLead(section)}
          imageSrc={section.image ?? ''}
          imageAlt={section.content.data.imageAlt ?? section.title ?? ''}
        />
        {section.note ? (
          <div className="mx-auto w-full max-w-360 px-[3%] pt-4 canvas:px-0">
            <SectionNote note={section.note} />
          </div>
        ) : null}
      </section>
    );
  }

  if (section.content.type === 'imageText') {
    return (
      <section
        className={cn('py-15 canvas:py-30', backgroundClass)}
        style={backgroundStyle}
      >
        <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
          <ImageTextSplit
            eyebrow={resolveTitleEn(section)}
            heading={section.title ?? ''}
            lead={resolveLead(section)}
            body={section.content.data.body}
            imageSrc={section.image ?? ''}
            imagePosition={section.content.data.imagePosition}
          />
          <SectionNote note={section.note} />
        </div>
      </section>
    );
  }

  const body = (
    <>
      {section.image && section.content.type === 'roadmapGrid' ? (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={section.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <SectionBody section={section} />
      <SectionNote note={section.note} />
    </>
  );

  return (
    <section className={backgroundClass} style={backgroundStyle}>
      <div className="mx-auto w-full max-w-360 px-[3%] canvas:px-0">
        {section.title ? (
          <PageSection
            eyebrow={resolveTitleEn(section)}
            title={section.title}
            description={resolveLead(section)}
            className="py-15 lg:py-15 canvas:py-30"
          >
            {body}
          </PageSection>
        ) : (
          <div className="py-15 canvas:py-30">{body}</div>
        )}
      </div>
    </section>
  );
}
