import type { Metadata } from 'next';

import BulletList from '@/components/domain/page/BulletList';
import CompareTable from '@/components/domain/page/CompareTable';
import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '배양 기술 | BRIXTECHBIO',
};

export default function TechCultivationPage() {
  return (
    <>
      <PageIntro
        eyebrow="TECH"
        title="배양 기술"
      />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <PageSection title="배양 방식 비교">
          <CompareTable
            headers={['', '설비비', '오염 리스크', '품질 안정성']}
            rows={[
              ['개방형 레이스웨이 폰드', '낮음', '높음', '낮음'],
              ['밀폐형 광생물반응기 (브릭스텍바이오)', '높음', '낮음', '높음'],
            ]}
          />
          <p className="text-text-sub mt-4 text-[0.95rem] leading-6">
            전 세계 스피루리나의 83% 이상이 개방형 방식으로 생산되지만, 브릭스텍바이오는
            고순도·고부가가치 원료 생산을 위해 밀폐형 방식을 채택했습니다.
          </p>
          {/* docs/gitignore/사진자료/자체 제작 밀폐형 배양 장치.JPG */}
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 자체 제작 밀폐형 배양 장치 실물 사진을 비교표와 함께 배치
          </p>
        </PageSection>

        <PageSection title="독자 배양 기술">
          <BulletList
            items={[
              '밀폐형 배양으로 외부 오염을 최소화해 고순도 스피루리나를 배양합니다.',
              '장치 구조를 단순화해 초기 설비비를 절감했습니다.',
              '온도·광·순환·가스를 효율적으로 제어해 운영비를 절감했습니다.',
            ]}
          />
          <p className="text-text-sub mt-4 text-[0.95rem] leading-6">
            특허 출원 중인 &apos;에어 포켓형 미세조류 광 배양 시스템&apos;은 액체순환 대신
            에어순환 방식을 적용해 에너지 절감, 운영비 절감, 탄소 저감, 공기정화를 동시에
            구현합니다.
          </p>
          {/* docs/gitignore/사진자료/배양관 탱크 제어 장치를 연결한 설비 전경.JPG,
              보급형 미세조류 생산설비1~8.JPG 중 선택 */}
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 배양관 탱크·제어 장치 설비 전경 사진
          </p>
        </PageSection>

        <PageSection title="보유 지식재산권">
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
        </PageSection>

        <PageSection title="생산 체계">
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
        </PageSection>

        <PageSection title="앞으로의 기술 확장">
          <BulletList
            items={[
              '고밀도 육상 배양 기술과 전용 재배 단지를 개발합니다.',
              '친환경 고부가가치 농산물의 고밀도 재배와 연계합니다.',
              '유용 미세조류 대량 배양설비를 고도화합니다.',
              '미세조류 기반 공기여과·정화시스템을 개발합니다.',
              '친환경 지열 냉난방시스템을 개발합니다.',
              '순환 여과식 수질관리시스템을 개발합니다.',
            ]}
          />
          {/* docs/gitignore/사진자료/조명을 배치한 수직 배양관.JPG */}
          <p className="text-text-info mt-3 text-[0.85rem] italic">
            시각자료 : 조명을 배치한 수직 배양관 사진으로 차세대 고밀도 배양 이미지를 보여줌
          </p>
        </PageSection>
      </div>
    </>
  );
}
