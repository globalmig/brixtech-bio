import type { Metadata } from 'next';

import PageIntro from '@/components/domain/page/PageIntro';
import PageSection from '@/components/domain/page/PageSection';

export const metadata: Metadata = {
  title: '오시는길 | BRIXTECHBIO',
};

const SEOUL_OFFICE_ADDRESS = '서울시 강남대로 101안길 13';
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  SEOUL_OFFICE_ADDRESS,
)}&z=16&output=embed`;

function SubwayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V4Z"
        stroke="white"
        strokeWidth="1.8"
      />
      <path d="M5 12h14" stroke="white" strokeWidth="1.8" />
      <circle cx="9" cy="15.5" r="1" fill="white" />
      <circle cx="15" cy="15.5" r="1" fill="white" />
      <path d="M8 21l-1.5 2M16 21l1.5 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="12" rx="2" stroke="white" strokeWidth="1.8" />
      <path d="M3 11h18" stroke="white" strokeWidth="1.8" />
      <circle cx="7.5" cy="19.5" r="1.4" fill="white" />
      <circle cx="16.5" cy="19.5" r="1.4" fill="white" />
    </svg>
  );
}

const DIRECTIONS = [
  { Icon: SubwayIcon, color: '#D4003B', text: '신사역 5번 출구에서 도보 약 3분' },
  {
    Icon: BusIcon,
    color: '#0068B7',
    text: '신사역·푸른저축은행 또는 신사사거리 정류장에서 하차 후, 도보 5분 이내',
  },
];

export default function AboutLocationPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT" title="오시는길" />

      <div className="relative h-80 w-full overflow-hidden bg-gray-100 md:h-112 lg:h-128">
        <iframe
          src={MAP_EMBED_SRC}
          title="브릭스텍바이오 서울 사무소 위치 지도"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>

      <div className="mx-auto w-full max-w-360 px-[3%] pt-10 pb-15 canvas:px-0 canvas:pt-15 canvas:pb-30">
        <PageSection>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            <h2 className="text-[2rem] shrink-0 font-bold lg:w-60">
              브릭스텍바이오
            </h2>

            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <p className="text-[1rem] text-primary-2 shrink-0 font-bold sm:w-28">
                  Address
                </p>
                <div className="flex flex-col gap-4">
                  <p className="text-[1rem] leading-7 text-gray-750">
                    서울 사무소 : 서울시 강남대로 101안길 13, B1~4F
                    <br />
                    Lab. 연구실 : 전남 나주시 빛가람로 737, 203호·303호
                  </p>

                  <div className="flex flex-col gap-3">
                    {DIRECTIONS.map(({ Icon, color, text }) => (
                      <p key={text} className="flex items-center gap-3 text-[1rem] text-gray-750">
                        <span
                          className="flex size-9 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: color }}
                        >
                          <Icon />
                        </span>
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <p className="text-[1rem] text-primary-2 shrink-0 font-bold sm:w-28">Tel</p>
                <p className="text-[1rem] text-gray-750">02-6242-6584</p>
              </div>

              {/* TODO: 이메일은 생성 후에 표시 */}
              {/* <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <p className="text-[1rem] text-primary-2 shrink-0 font-bold sm:w-28">
                  E-mail
                </p>
                <p className="text-[1rem] text-gray-750">이메일 안내는 준비 중입니다.</p>
              </div> */}
            </div>
          </div>
        </PageSection>
      </div>
    </>
  );
}
