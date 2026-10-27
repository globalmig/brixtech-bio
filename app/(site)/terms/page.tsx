import type { Metadata } from 'next';

import PageIntro from '@/components/domain/page/PageIntro';

export const metadata: Metadata = {
  title: '서비스 이용약관 | BRIXTECHBIO',
};

type TermsClause = {
  title: string;
  body: React.ReactNode;
};

const CLAUSES: TermsClause[] = [
  {
    title: '제1조 (목적)',
    body: (
      <p>
        이 약관은 브릭스텍바이오(이하 &apos;회사&apos;)가 운영하는 홈페이지(이하 &apos;사이트&apos;)에서
        제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한
        사항을 규정하는 것을 목적으로 합니다.
      </p>
    ),
  },
  {
    title: '제2조 (용어의 정의)',
    body: (
      <ul className="list-disc pl-5">
        <li>
          &apos;사이트&apos;란 회사가 회사 소개, 제품·브랜드 정보, 기업 소식 등을 제공하기 위하여
          운영하는 웹사이트를 의미합니다.
        </li>
        <li>
          &apos;이용자&apos;란 사이트에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 이용하는
          자를 의미합니다.
        </li>
      </ul>
    ),
  },
  {
    title: '제3조 (약관의 효력 및 변경)',
    body: (
      <>
        <p>
          이 약관은 사이트에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
        </p>
        <p className="mt-3">
          회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있으며, 변경된 약관은 사이트
          내 공지를 통해 적용일자 및 변경사항을 명시하여 게시합니다.
        </p>
      </>
    ),
  },
  {
    title: '제4조 (서비스의 제공 및 변경)',
    body: (
      <>
        <p>회사는 다음과 같은 서비스를 제공합니다.</p>
        <ul className="mt-3 list-disc pl-5">
          <li>회사 소개, 기술 및 제품·브랜드 정보 제공</li>
          <li>기업 소식 등 콘텐츠 제공</li>
          <li>사업 제휴 및 제품 문의 접수 서비스</li>
          <li>기타 회사가 정하는 서비스</li>
        </ul>
        <p className="mt-3">
          회사는 서비스의 내용, 운영상 또는 기술상 필요에 따라 제공하는 서비스의 전부 또는 일부를
          변경할 수 있습니다.
        </p>
      </>
    ),
  },
  {
    title: '제5조 (서비스의 중단)',
    body: (
      <p>
        회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한
        경우에는 서비스의 제공을 일시적으로 중단할 수 있으며, 이 경우 사전 또는 사후에 이를
        공지합니다.
      </p>
    ),
  },
  {
    title: '제6조 (이용자의 의무)',
    body: (
      <>
        <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
        <ul className="mt-3 list-disc pl-5">
          <li>타인의 정보를 도용하거나 허위 정보를 등록하는 행위</li>
          <li>회사가 게시한 정보를 무단으로 변경, 복제, 배포하는 행위</li>
          <li>회사 및 제3자의 저작권 등 지식재산권을 침해하는 행위</li>
          <li>사이트의 정상적인 운영을 방해하는 행위</li>
        </ul>
      </>
    ),
  },
  {
    title: '제7조 (저작권의 귀속 및 이용제한)',
    body: (
      <p>
        사이트 내에서 회사가 작성한 콘텐츠에 대한 저작권 및 기타 지식재산권은 회사에 귀속됩니다.
        이용자는 회사가 제공하는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신,
        출판, 배포, 방송 기타 방법으로 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안
        됩니다.
      </p>
    ),
  },
  {
    title: '제8조 (면책조항)',
    body: (
      <p>
        회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는
        서비스 제공에 관한 책임이 면제됩니다. 또한 회사는 이용자가 사이트에 게재한 정보, 자료,
        사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다.
      </p>
    ),
  },
  {
    title: '제9조 (분쟁해결 및 관할법원)',
    body: (
      <p>
        이 약관과 관련하여 회사와 이용자 간에 분쟁이 발생한 경우, 회사와 이용자는 분쟁의 해결을
        위해 성실히 협의합니다. 협의가 이루어지지 않을 경우 관련 법령이 정한 절차에 따른 관할법원에
        소를 제기할 수 있습니다.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <PageIntro eyebrow="POLICY" title="서비스 이용약관" />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <div className="mx-auto w-full max-w-240">
          <div className="flex flex-col divide-y divide-gray-300">
            {CLAUSES.map((clause) => (
              <section key={clause.title} className="py-8 first:pt-0">
                <h2 className="text-h5 lg:text-h4 mb-4 font-bold text-black">
                  {clause.title}
                </h2>
                <div className="text-[1rem] leading-7 text-gray-750">{clause.body}</div>
              </section>
            ))}
          </div>

          <p className="text-small mt-10 text-gray-500">
            공고일자 : 2026년 00월 00일
            <br />
            시행일자 : 2026년 00월 00일
          </p>
        </div>
      </div>
    </>
  );
}
