import type { Metadata } from 'next';
import Image from 'next/image';

import ImageCompareCards from '@/components/domain/page/ImageCompareCards';
import PageIntro from '@/components/domain/page/PageIntro';
import TechExpansionSection from '@/components/domain/page/TechExpansionSection';
import HeroBanner from '@/components/domain/page/HeroBanner';

export const metadata: Metadata = {
  title: '배양 기술 | BRIXTECHBIO',
};

const PRODUCTION_STAGES = [
  {
    title: '종균 배양',
    label: 'SEED CULTURE',
    description: '마이크로 알지 종균 확보, 초기 배양 및 증식',
  },
  {
    title: '대량 배양',
    label: 'MASS CULTURE',
    description: '고순도 마이크로 알지 대량배양, 1일 생산출하량 자동 체크',
  },
  {
    title: '수확·농축·건조',
    label: 'HARVEST & DRY',
    description: '연속수확시스템, 농축 및 후처리 공정',
  },
  {
    title: '원료화',
    label: 'RAW MATERIAL',
    description: '건강기능식품·화장품·펫푸드·비료 맞춤 원료로 이어집니다',
  },
];

const EXPANSION_GOALS = [
  {
    goal: 'Goal 1',
    title: '미세조류 배양 · 활용기술',
    items: [
      '고밀도 육상 양식기술 및 전용 재배단지 개발',
      '친환경 고부가가치 농산물의 고밀도 재배',
      '미세조류의 농수산업 적용분야 확대',
      '가축·치어·치패 먹이생물 인공배양',
      '건강한 치패·치어 종묘 생산',
    ],
  },
  {
    goal: 'Goal 2',
    title: '축산물 · 수산물 육질 개선 및 면역력 강화 사료 개발',
    items: ['고기능성 축산물 및 수산물 육질 개선과 면역력 강화 사료 개발'],
  },
  {
    goal: 'Goal 3',
    title: '바이오 소재 · 식품',
    items: [
      '미세조류 소재 개발 및 공급 (바이오·화장품·식품 등)',
      '미세조류 적용 건강식품 개발과 생산·판매',
    ],
  },
  {
    goal: 'Goal 4',
    title: '배양설비 · 활용 시스템',
    items: [
      '유용성 미세조류 대량 배양설비 개발',
      '미세조류 공기여과·정화시스템 개발',
      '친환경 지열 냉난방시스템 개발',
      '순환 여과식 수질관리시스템 개발',
    ],
  },
];

export default function TechCultivationPage() {
  return (
    <>
      <PageIntro
        eyebrow="TECH"
        title="배양 기술"
      />

      <HeroBanner
        eyebrow="CULTIVATION"
        title={'브릭스텍바이오의 독자 배양 기술'}
        description="외부 오염원을 완벽히 차단하는 밀폐형 광생물반응기를 기반으로 고순도·고품질의 마이크로 알지를 안정적으로 생산합니다. 설비 구조를 단순화·소형화해 초기 투자 비용과 운영비를 대폭 절감한 브릭스텍바이오만의 배양 시스템입니다."
        imageAlt="밀폐형 배양 시스템 이미지"
        imageSrc=''
      />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30 lg:pb-10">
        <section className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="lg:w-[42%] lg:shrink-0">
            <p className="text-small text-black mb-4 font-bold lg:mb-8">TECHNOLOGY</p>
            <h2 className="text-h4 lg:text-h2 text-black mb-5">독자 배양 기술</h2>

            <div className="flex flex-col gap-6">
              <p className="text-[1rem] leading-7 text-gray-750">
                브릭스텍바이오는 완전 밀폐형 광생물반응기를 기반으로 외부 오염원을 철저히
                차단해 고순도 마이크로 알지를 안정적으로 배양합니다. 장치 구조를
                단순화·소형화해 초기 설비 구축비용을 대폭 절감했으며, 온도·광·순환·가스를
                정밀하게 제어해 운영비까지 효율적으로 관리하고 있습니다.
              </p>
              <p className="text-[1rem] leading-7 text-gray-750">
                특허 출원 중인 &apos;에어 포켓형 미세조류 광 배양 시스템&apos;은 액체순환
                대신 에어순환 방식을 적용해 에너지 절감, 운영비 절감, 탄소 저감, 공기정화를
                동시에 구현하는 브릭스텍바이오만의 독자 기술입니다.
              </p>
              <p className="text-[1rem] leading-7 text-gray-750">
                이러한 독자 기술을 바탕으로 농업·축산업·수산업은 물론 식품·화장품·사료 등
                다양한 산업에 적용 가능한 고순도 원료를 지속적으로 공급하고 있습니다.
              </p>
            </div>
          </div>

          <div className="relative aspect-[745.06/880.43] w-full lg:w-150 overflow-hidden bg-gray-100">
            <Image
              src="/#"
              alt="브릭스텍바이오 밀폐형 배양 시스템"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      </div>

      <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 lg:py-12">
        <p className="text-small text-black mb-5 font-bold">COMPARISON</p>
        <h2 className="text-h4 lg:text-h2 text-black mb-5">배양 방식 비교</h2>
        <p className="text-body mb-8 max-w-2xl text-gray-750">
          전 세계 마이크로 알지의 83% 이상이 개방형 방식으로 생산되지만, 브릭스텍바이오는
          고순도·고부가가치 원료 생산을 위해 밀폐형 방식을 채택했습니다. 외부 오염원으로부터
          안전하게 차단된 무균 공정으로 고효율 생산성을 유지하고, 타물질 혼입 없이 안정적인
          품질의 원료를 생산·관리합니다.
        </p>
        <ImageCompareCards
          items={[
            {
              image:'/#',
              title: '개방형 레이스웨이 폰드',
              rows: [
                '초기 설비 투자 비용 낮음',
                '외부 오염원(이물질·세균오염)으로부터 무방비',
                '살균 후처리 과정 필수',
                '타물질과 섞여 불순물로 인한 낮은 순도',
                '노지 배양방법(세균감염) 우려',
                '100% 수입산 스피루리나',
              ],
            },
            {
              image:'/#',
              title: '밀폐형 광생물반응기 (브릭스텍바이오)',
              rows: [
                '초기 설비 투자 비용 높음',
                '외부 오염원으로부터 안전',
                '고효율 생산성을 유지',
                '제품 안정성을 확보하여 생산·관리',
                '인공 광배양 시스템(무균) 공정',
                '100% 국내산 생 스피루리나',
              ],
            },
          ]}
        />
      </section>

      <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 canvas:py-30">
        <p className="text-small text-black mb-5 font-bold">FACILITY</p>
        <h2 className="text-h4 lg:text-h2 text-black mb-5">보급형 미세조류 생산설비</h2>
        <p className="text-body mb-8 max-w-2xl text-gray-750">
          식품·비료·사료용 미세조류 생산에 맞춰 배양 공정을 단순화·소형화한 보급형 설비입니다.
        </p>
        <ImageCompareCards
          items={[
            {
              image: '/#',
              title: '기존 국내(나주시 소재) 배양 설비의 문제점',
              description: [
                <>
                  초기 배양 설비 <span className="text-black font-semibold">구축 비용에 대한 부담</span>이
                  크고,
                </>,
                <>
                  완전 밀폐된 형태로 미세조류 배양관의{' '}
                  <span className="text-black font-semibold">세척시간이 길고</span>,
                </>,
                <>
                  고압의 배양액 이송에 따른 배양관의{' '}
                  <span className="text-black font-semibold">파손 위험이 크며</span>
                </>,
                <>
                  상·하부 간의 광량의 차이로 인해{' '}
                  <span className="text-black font-semibold">성장 속도의 차이가 발생</span>
                </>,
              ],
            },
            {
              image: '/#',
              title: '초기 설비 구축 비용 대폭 절감',
              description: [
                <>농업, 축산업, 수산업 등 1차 산업에 직접 적용을 위한</>,
                <>
                  다양한 모델의{' '}
                  <span className="text-black font-semibold">
                    저가형 미세조류 대량 배양 및 장기 보관 설비
                  </span>
                </>,
                <>배양 공정의 단순화를 통한 식품, 비료, 사료 원료용</>,
                <>
                  미세조류의 <span className="text-black font-semibold">생산비용 대폭 절감</span>
                </>,
              ],
            },
          ]}
        />
      </section>

      <div className="bg-[#F6F9EF]">
        <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
          <p className="text-small text-black mb-4 font-bold lg:mb-8">PRODUCTION</p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">기술에서 생산으로</h2>
          <p className="text-body mb-10 text-gray-750 lg:mb-20">
            독자적인 배양 기술은 종균 배양부터 대량배양, 수확·농축·건조, 원료화까지 이어지는
            4단계 생산 체계로 완성됩니다.
            <br />
            각 단계의 품질을 철저히 관리해 안정적이고 일관된 고순도 마이크로 알지를 공급합니다.
          </p>

          <div className="grid grid-cols gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {PRODUCTION_STAGES.map((item) => (
              <article key={item.title}>
                <p className="text-h5 lg:text-h4 text-black mb-2 font-bold">{item.title}</p>
                <p className="text-base font-semibold text-text-sub mb-6">{item.label}</p>
                <div className="mb-6 border-t border-gray-300 lg:mb-8" />
                <p className="text-body text-text-sub leading-6">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 lg:py-12">
        <h2 className="text-h4 lg:text-h2 text-black mb-5">보유 지식재산권</h2>
        <BulletList
          items={[
            '자체순환형 미세조류 자동광배양장치 (등록)',
            '미세조류 광배양 기체공급구조 및 장치 (공개)',
            '에어리프트 원리를 이용한 에너지절감형 광생물반응기 및 온실가스 저감시스템 (출원)',
            '미세조류 배양 및 연속수확장치 — 태양광전송장치 포함 (출원)',
            '소형모듈식 태양열집열장치 (출원)',
            '미세조류배양기 디자인 2건 (출원)',
          ]}
        />
      </section> */}

      <TechExpansionSection
        eyebrow="EXPANSION"
        title="앞으로의 기술 확장"
        description="미세조류를 이용한 바이오 신소재 및 제품의 개발과 확산을 추진합니다."
        groups={EXPANSION_GOALS}
      />
    </>
  );
}
