import type { Metadata } from 'next';

import PageIntro from '@/components/domain/page/PageIntro';

export const metadata: Metadata = {
  title: '개인정보처리방침 | BRIXTECHBIO',
};

type PrivacyClause = {
  title: string;
  body: React.ReactNode;
};

const CLAUSES: PrivacyClause[] = [
  {
    title: '1. 수집하는 개인정보의 항목 및 수집방법',
    body: (
      <>
        <p>
          브릭스텍바이오(이하 &apos;회사&apos;)는 홈페이지를 통한 제품·사업 제휴 문의 접수 및 처리를
          위하여 아래와 같이 개인정보를 수집하고 있습니다.
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>필수 항목 : 회사명, 연락처, 이메일, 문의 제목, 문의 내용</li>
          <li>선택 항목 : 첨부파일</li>
          <li>
            수집 방법 : 홈페이지 내 &apos;사업 제휴 및 제품 문의&apos; 게시판을 통한 이용자의 직접
            입력
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '2. 개인정보의 수집 및 이용목적',
    body: (
      <>
        <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
        <ul className="mt-3 list-disc pl-5">
          <li>제품 및 사업 제휴 문의에 대한 접수, 확인, 답변 등 민원 처리</li>
          <li>문의 처리 결과 안내 등 원활한 의사소통 경로의 확보</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. 개인정보의 보유 및 이용기간',
    body: (
      <>
        <p>
          회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이
          파기합니다. 단, 관련 법령에 의해 보존할 필요가 있는 경우 회사는 관계 법령에서 정한 일정한
          기간 동안 회원정보를 보관합니다.
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>문의 접수 및 처리 기록 : 문의 처리 완료 후 1년</li>
          <li>
            전자상거래 등에서의 소비자 보호에 관한 법률에 따른 계약 또는 청약철회 등에 관한 기록 :
            5년(관련 법령이 정하는 경우에 한함)
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '4. 개인정보의 파기절차 및 방법',
    body: (
      <>
        <p>
          회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
          지체 없이 해당 개인정보를 파기합니다.
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            파기절차 : 이용목적이 달성된 개인정보는 별도의 DB로 옮겨져 내부 방침 및 관련 법령에
            따라 일정 기간 저장된 후 혹은 즉시 파기됩니다.
          </li>
          <li>
            파기방법 : 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
            삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '5. 개인정보의 제3자 제공 및 처리 위탁',
    body: (
      <p>
        회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않으며, 별도의 개인정보 처리 위탁을
        진행하지 않습니다. 향후 업무 처리를 위해 제3자 제공 또는 처리 위탁이 필요한 경우, 관련
        법령에 따라 이용자에게 사전에 고지하고 동의를 받도록 하겠습니다.
      </p>
    ),
  },
  {
    title: '6. 정보주체의 권리·의무 및 행사방법',
    body: (
      <>
        <p>
          이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>개인정보 열람, 정정, 삭제, 처리정지 요구</li>
          <li>개인정보 수집 및 이용에 대한 동의 철회</li>
        </ul>
        <p className="mt-3">
          권리 행사는 아래 &apos;9. 개인정보 보호책임자&apos;에 기재된 연락처를 통해 요청하실 수
          있으며, 회사는 이에 대해 지체 없이 필요한 조치를 취합니다.
        </p>
      </>
    ),
  },
  {
    title: '7. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항',
    body: (
      <>
        <p>
          회사는 서비스 이용 편의 제공을 위해 쿠키(cookie)를 사용할 수 있습니다. 쿠키는 웹사이트를
          운영하는 데 이용되는 서버가 이용자의 브라우저에 보내는 소량의 정보이며 이용자의 PC
          컴퓨터 내의 하드디스크에 저장되기도 합니다.
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            쿠키의 사용 목적 : 이용자의 접속 빈도나 방문 시간 등을 분석하여 이용자에게 최적화된
            서비스를 제공하기 위해 활용됩니다.
          </li>
          <li>
            쿠키 설정 거부 방법 : 이용자는 웹브라우저의 옵션을 조정하여 쿠키 저장을 거부할 수
            있으며, 다만 이 경우 서비스 이용에 일부 어려움이 발생할 수 있습니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '8. 개인정보의 안전성 확보조치',
    body: (
      <ul className="list-disc pl-5">
        <li>
          관리적 조치 : 개인정보를 처리하는 인원의 최소화 및 담당자에 대한 교육
        </li>
        <li>
          기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접속기록의 보관, 보안프로그램의
          설치
        </li>
        <li>물리적 조치 : 개인정보가 저장·보관된 공간에 대한 접근 통제</li>
      </ul>
    ),
  },
  {
    title: '9. 개인정보 보호책임자',
    body: (
      <>
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의
          불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>회사명 : 브릭스텍바이오</li>
          <li>연락처 : 02-6242-6584 (평일 09:00~18:00 / 주말 및 공휴일 휴무)</li>
          <li>주소 : 서울시 강남대로 101안길 13, B1~4F</li>
        </ul>
      </>
    ),
  },
  {
    title: '10. 개인정보처리방침의 변경',
    body: (
      <p>
        이 개인정보처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용의 추가, 삭제 및 수정이
        있을 수 있으며, 변경되는 경우 시행일자를 명시하여 변경사항을 본 페이지를 통해 공지합니다.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro eyebrow="POLICY" title="개인정보처리방침" />

      <div className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
        <div className="mx-auto w-full max-w-240">
          <p className="text-[1rem] leading-7 text-gray-750">
            브릭스텍바이오(이하 &apos;회사&apos;)는 이용자의 개인정보를 중요시하며, 「개인정보
            보호법」 등 관련 법령을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 이용자가
            제공하는 개인정보가 어떠한 목적과 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한
            조치가 취해지고 있는지 안내합니다.
          </p>

          <div className="mt-10 flex flex-col divide-y divide-gray-300">
            {CLAUSES.map((clause) => (
              <section key={clause.title} className="py-8">
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
