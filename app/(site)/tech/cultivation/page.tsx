import type { Metadata } from 'next';

import BulletList from '@/components/domain/page/BulletList';
import CompareTable from '@/components/domain/page/CompareTable';
import PageIntro from '@/components/domain/page/PageIntro';

export const metadata: Metadata = {
  title: '배양 기술 | BRIXTECHBIO',
};

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

      <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 lg:py-12">
        <h2 className="text-h4 lg:text-h2 text-black mb-5">배양 방식 비교</h2>
        <CompareTable
          headers={['', '설비비', '오염 리스크', '품질 안정성', '순도', '위생 관리']}
          rows={[
            ['개방형 레이스웨이 폰드', '낮음', '높음', '낮음', '타물질 혼입 우려', '살균 후처리 필수'],
            [
              '밀폐형 광생물반응기 (브릭스텍바이오)',
              '높음',
              '낮음',
              '높음',
              '높음',
              '인공 광배양(무균) 공정',
            ],
          ]}
        />
        <p className="text-text-sub mt-4 text-[0.95rem] leading-6">
          전 세계 스피루리나의 83% 이상이 개방형 방식으로 생산되지만, 브릭스텍바이오는
          고순도·고부가가치 원료 생산을 위해 밀폐형 방식을 채택했습니다. 외부 오염원으로부터
          안전하게 차단된 무균 공정으로 고효율 생산성을 유지하고, 타물질 혼입 없이 안정적인
          품질의 원료를 생산·관리합니다.
        </p>
        {/* docs/gitignore/사진자료/자체 제작 밀폐형 배양 장치.JPG */}
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 자체 제작 밀폐형 배양 장치 실물 사진을 비교표와 함께 배치
        </p>
      </section>

      <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 lg:py-12">
        <h2 className="text-h4 lg:text-h2 text-black mb-5">독자 배양 기술</h2>
        <BulletList
          items={[
            '밀폐형 배양으로 외부 오염을 최소화해 고순도 스피루리나를 배양합니다.',
            '장치 구조를 단순화·소형화해 초기 설비 구축비용을 대폭 절감했습니다.',
            '온도·광·순환·가스를 효율적으로 제어해 운영비를 절감했습니다.',
          ]}
        />
        <p className="text-text-sub mt-4 text-[0.95rem] leading-6">
          특허 출원 중인 &apos;에어 포켓형 미세조류 광 배양 시스템&apos;은 액체순환 대신
          에어순환 방식을 적용해 에너지 절감, 운영비 절감, 탄소 저감, 공기정화를 동시에
          구현합니다.
        </p>
        <p className="text-text-sub mt-4 text-[0.95rem] leading-6">
          기존 국내 배양설비는 초기 구축비용 부담이 크고, 완전 밀폐된 구조로 배양관 세척
          시간이 길며, 고압 배양액 이송 과정에서 관 파손 위험이 있고, 상·하부 광량 차이로
          성장 속도가 고르지 않다는 한계가 있었습니다. 브릭스텍바이오는 배양공정을
          단순화·소형화한 모델로 이러한 문제를 해결해, 농업·축산업·수산업 등 1차 산업에도
          적용 가능한 저가형 대량배양·장기보관 설비로 생산비용을 대폭 절감했습니다.
        </p>
        {/* docs/gitignore/사진자료/배양관 탱크 제어 장치를 연결한 설비 전경.JPG,
            보급형 미세조류 생산설비1~8.JPG 중 선택 */}
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 배양관 탱크·제어 장치 설비 전경 사진, 기존 설비 대비 소형화된 신규
          설비 비교 사진
        </p>
      </section>

      <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 lg:py-12">
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
      </section>

      <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 lg:py-12">
        <h2 className="text-h4 lg:text-h2 text-black mb-5">생산 체계</h2>
        <BulletList
          items={[
            '종균 배양 (완료) — 스피루리나 종균 확보, 초기 배양 및 증식',
            '대량배양 (진행 중) — 고순도 스피루리나 대량배양, 1일 생산출하량 자동 체크',
            '수확·농축·건조 (진행 중) — 연속수확시스템, 농축 및 후처리 공정',
            '원료화 (준비 중) — 건강기능식품·화장품·펫푸드·비료 맞춤 원료로 이어집니다',
          ]}
        />
        {/* docs/gitignore/사진자료/배양약 제조 및 냉각 탱크.JPG(배양·냉각), 저장탱크.JPG(저장) */}
        <p className="text-text-info mt-3 text-[0.85rem] italic">
          시각자료 : 배양·냉각, 저장 단계별 현장 사진
        </p>
      </section>

      <section className="mx-auto w-full max-w-360 px-[3%] py-10 canvas:px-0 lg:py-12">
        <h2 className="text-h4 lg:text-h2 text-black mb-5">앞으로의 기술 확장</h2>
        <p className="text-body mb-10 max-w-2xl text-gray-750 lg:mb-16">
          미세조류를 이용한 바이오 신소재 및 제품의 개발과 확산을 추진합니다.
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {EXPANSION_GOALS.map((group) => (
            <article
              key={group.goal}
              className="border-divider-default rounded-lg border bg-gray-50 p-6 lg:p-8"
            >
              <span className="bg-primary-2 mb-3 inline-block rounded-full px-3 py-1 text-[0.8rem] font-semibold text-white">
                {group.goal}
              </span>
              <p className="text-h5 text-black mb-4 font-bold">{group.title}</p>
              <BulletList items={group.items} />
            </article>
          ))}
        </div>
        {/* docs/gitignore/사진자료/조명을 배치한 수직 배양관.JPG */}
        <p className="text-text-info mt-6 text-[0.85rem] italic">
          시각자료 : 조명을 배치한 수직 배양관 사진으로 차세대 고밀도 배양 이미지를 보여줌
        </p>
      </section>
    </>
  );
}
