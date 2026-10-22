import type { Metadata } from 'next';
import Image from 'next/image';

import BulletList from '@/components/domain/page/BulletList';
import FaqAccordion, { type FaqItem } from '@/components/domain/page/FaqAccordion';
import MediaTextRow from '@/components/domain/page/MediaTextRow';
import PageIntro from '@/components/domain/page/PageIntro';
import RoadmapGrid from '@/components/domain/page/RoadmapGrid';
import HeroBanner from '@/components/domain/page/HeroBanner';

export const metadata: Metadata = {
  title: '스피루리나 소개 | BRIXTECHBIO',
};

const FAQ_CATEGORIES = [
  { value: 'supplements', label: '건강기능식품' },
  { value: 'cosmetics', label: '화장품' },
  { value: 'pet-food', label: '반려동물 푸드' },
  { value: 'smart-farm', label: '스마트팜' },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    category: 'supplements',
    num: 1,
    q: '스피루리나는 어떤 식품인가요?',
    a: '1927년 독일 과학자가 명명한 청록색 다세포 조류로, 알칼리성 염호에서 자생하는 자연 그대로의 식품입니다.',
  },
  {
    id: 2,
    category: 'supplements',
    num: 2,
    q: '스피루리나가 특별한 이유는 무엇인가요?',
    a: '소화가 쉬운 단백질과 베타카로틴, 비타민 B12, 엽산, 필수지방산을 고루 함유해 다른 식품과 차별화됩니다.',
  },
  {
    id: 3,
    category: 'supplements',
    num: 3,
    q: '학술적으로 연구된 자료가 있나요?',
    a: '지난 40여 년간 전 세계 4,000명이 넘는 과학자가 스피루리나를 연구해왔습니다.',
  },
  {
    id: 4,
    category: 'supplements',
    num: 4,
    q: '안전하게 섭취할 수 있나요?',
    a: '고순도 원료로 반복 섭취해도 부작용이 없는 것으로 보고되어 있으며, 꾸준히 섭취했을 때 건강 개선에 도움이 된다는 연구 결과가 있습니다.',
  },
  {
    id: 5,
    category: 'supplements',
    num: 5,
    q: '몸에 남는 독성 성분이 있나요?',
    a: '독성 잔류물이나 찌꺼기가 없는 것으로 알려져 있습니다.',
  },
  {
    id: 6,
    category: 'supplements',
    num: 6,
    q: '다른 천연 영양 식품과는 어떻게 다른가요?',
    a: '일부 천연 식품은 섭취에 제한이 따르지만, 스피루리나는 특별한 제한 없이 섭취할 수 있는 천연 식품으로 소개됩니다.',
  },
  {
    id: 33,
    category: 'supplements',
    num: 33,
    q: '모든 연령대가 섭취해도 괜찮은가요?',
    a: '네, 어린이부터 어르신까지 폭넓게 섭취하고 있으며, 연령대별로 필요한 영양을 보충하는 데 활용됩니다.',
  },
  {
    id: 34,
    category: 'supplements',
    num: 34,
    q: '국제적으로도 인정받았나요?',
    a: '네, UN·FAO·WHO·미국 FDA 등 국제기구가 스피루리나를 안전하고 영양가 높은 식품으로 소개해왔습니다. 자세한 연혁은 위 "국제 공인 연혁"을 참고해주세요.',
  },
  {
    id: 40,
    category: 'supplements',
    num: 40,
    q: '건강기능식품과 의약품은 어떻게 다른가요?',
    a: '의약품은 질병의 진단·치료·예방을 목적으로 하는 반면, 건강기능식품은 부족한 영양을 보충하고 건강을 유지하도록 돕는 식품입니다. 스피루리나는 건강기능식품으로, 의약품을 대신하지 않습니다.',
  },
  {
    id: 7,
    category: 'supplements',
    num: 7,
    q: '스피루리나는 어떤 면에서 유익한가요?',
    a: '전 세계 과학자들의 40년 이상 연구를 바탕으로, 면역 반응 강화와 심장 건강, 소화 기능, 자연스러운 해독 작용, 항산화 작용에 도움을 줄 수 있다고 알려져 있습니다.',
  },
  {
    id: 8,
    category: 'supplements',
    num: 8,
    q: '어떤 영양소가 들어있나요?',
    a: '단백질, 필수·비필수 아미노산, 비타민, 미네랄, 지방산, 색소 등 다양한 영양 성분으로 구성되어 있습니다.',
  },
  {
    id: 9,
    category: 'supplements',
    num: 9,
    q: '어떤 분들에게 특히 추천하나요?',
    a: '쉽게 피로해지거나 녹황색 채소 섭취가 부족한 분, 식사가 불규칙하거나 체중 관리 중인 분들께 특히 추천드립니다.',
  },
  {
    id: 10,
    category: 'supplements',
    num: 10,
    q: '섭취 후 몸이 반응하는 속도는 사람마다 다른가요?',
    a: '네, 나이와 식습관, 컨디션에 따라 다를 수 있어 꾸준한 섭취와 적절한 운동·휴식을 함께 권해드립니다.',
  },
  {
    id: 11,
    category: 'supplements',
    num: 11,
    q: '하루 적정 섭취량은 얼마인가요?',
    a: '일반적으로 1일 1포를 권장드립니다. 처음 섭취하신다면 아침 2포, 저녁 1포로 시작해보세요.',
  },
  {
    id: 12,
    category: 'supplements',
    num: 12,
    q: '다른 음식과 함께 먹어도 영양이 줄어드나요?',
    a: '아니요, 다른 음식과 함께 섭취해도 영양가는 유지됩니다. 우유나 주스에 타서 드셔도 좋습니다.',
  },
  {
    id: 13,
    category: 'supplements',
    num: 13,
    q: '섭취 후 일시적인 반응이 있을 수 있나요?',
    a: '드물게 일시적인 피부 반응이나 미열이 나타날 수 있으나, 대개 2~3일 내 자연스럽게 가라앉는 것으로 알려져 있습니다.',
  },
  {
    id: 14,
    category: 'supplements',
    num: 14,
    q: '다른 영양제와 함께 먹어도 되나요?',
    a: '천연 식품으로 다른 영양 보조제와 함께 섭취할 수 있습니다. 복용 중인 약이 있다면 전문가와 상의해주세요.',
  },
  {
    id: 15,
    category: 'supplements',
    num: 15,
    q: '컨디션 회복 중에도 섭취할 수 있나요?',
    a: '네, 회복기에 필요한 영양을 보충하는 용도로 활용하실 수 있습니다.',
  },
  {
    id: 16,
    category: 'supplements',
    num: 16,
    q: '채소를 잘 못 먹는데 괜찮을까요?',
    a: '스피루리나에는 채소에 든 비타민·엽록소·베타카로틴이 들어 있어 보완적으로 섭취하실 수 있습니다.',
  },
  {
    id: 17,
    category: 'supplements',
    num: 17,
    q: '아이들도 먹을 수 있나요?',
    a: '네, 성장기 영양 보충에 활용할 수 있으며, 그대로 삼키기 어렵다면 물에 타서 섭취할 수 있습니다.',
  },
  {
    id: 18,
    category: 'supplements',
    num: 18,
    q: '스트레스가 많을 때도 도움이 되나요?',
    a: '비타민 B군과 필수 아미노산이 풍부해 컨디션 관리에 도움을 줄 수 있습니다.',
  },
  {
    id: 19,
    category: 'supplements',
    num: 19,
    q: '속이 예민한 편인데 섭취해도 괜찮을까요?',
    a: '소화가 쉬운 성분으로 구성되어 있어 부담 없이 섭취하실 수 있습니다.',
  },
  {
    id: 20,
    category: 'supplements',
    num: 20,
    q: '연령대가 있으신 분들도 섭취하기 좋은가요?',
    a: '네, 실제 섭취자 중 연령대가 있으신 분들의 비중도 높게 나타난 바 있어 폭넓게 섭취되고 있습니다.',
  },
  {
    id: 23,
    category: 'supplements',
    num: 23,
    q: '활동량이 많은 날에도 도움이 되나요?',
    a: '영양 밀도가 높아 활동량이 많거나 격한 운동을 앞둔 날 섭취하시면 도움이 될 수 있습니다.',
  },
  {
    id: 25,
    category: 'supplements',
    num: 25,
    q: '장 건강 관리에도 도움이 되나요?',
    a: '유산균과 함께 섭취하면 장내 환경 관리에 더욱 도움이 될 수 있습니다.',
  },
  {
    id: 29,
    category: 'supplements',
    num: 29,
    q: '철분이 부족한 분들에게도 좋을까요?',
    a: '철분과 엽산, 비타민 B12가 포함되어 있어 영양 보충에 도움이 될 수 있습니다.',
  },
  {
    id: 31,
    category: 'supplements',
    num: 31,
    q: '소화가 잘 되나요?',
    a: '네, 약 95%가 체내에서 빠르게 소화되는 것으로 알려져 부담이 적습니다.',
  },
  {
    id: 32,
    category: 'supplements',
    num: 32,
    q: '스피루리나만 먹어도 충분한가요?',
    a: '풍부한 영양을 담고 있지만, 균형 잡힌 식단과 함께 보조식품으로 섭취하시는 것을 권해드립니다.',
  },
  {
    id: 35,
    category: 'supplements',
    num: 35,
    q: '어린이와 임산부도 섭취할 수 있나요?',
    a: '어린이는 아침·저녁으로 하루 최소 1포씩 섭취할 수 있으며, 임산부는 섭취 전 담당 의료진과 상의해주세요.',
  },
  {
    id: 36,
    category: 'supplements',
    num: 36,
    q: '식전과 식후 중 언제 먹는 게 좋나요?',
    a: '식전·식후 상관없이 섭취하실 수 있으며, 흡수를 높이려면 식사 30분 전 섭취를 권해드립니다.',
  },
  {
    id: 37,
    category: 'supplements',
    num: 37,
    q: '지병이 있어도 섭취할 수 있나요?',
    a: '처방약을 복용 중이시라면 담당 의료진과 상의 후, 영양 보충 목적의 보조식품으로 섭취하시는 것을 권해드립니다.',
  },
  {
    id: 38,
    category: 'supplements',
    num: 38,
    q: '체중 관리를 목적으로 섭취하려면 어떻게 해야 하나요?',
    a: '공복에 2포, 취침 전 1포 섭취를 권해드리며, 하루 최소 한 끼는 식사를 하시는 것이 좋습니다.',
  },
  {
    id: 100,
    category: 'cosmetics',
    q: '피부에는 어떤 도움이 되나요?',
    a: '피코시아닌·베타카로틴·클로로필 성분이 항산화와 보습, 세포 재생에 도움을 주어 화장품 라인에도 활용됩니다.',
  },
  {
    id: 28,
    category: 'cosmetics',
    num: 28,
    q: '모발 건강에도 도움이 되나요?',
    a: '필수 지방산이 모발과 두피에 영양을 공급하는 데 도움을 줄 수 있습니다.',
  },
  {
    id: 105,
    category: 'cosmetics',
    q: '피코시아닌은 피부에 어떤 효과가 있나요?',
    a: '강력한 항산화 작용으로 노화 신호를 완화하고, 피부 자극이 적어 민감한 피부에도 부담 없이 사용할 수 있습니다.',
  },
  {
    id: 106,
    category: 'cosmetics',
    q: '베타카로틴 성분은 보습력이 어느 정도인가요?',
    a: '적은 양으로도 충분한 보습력을 제공하며, 끈적임 없이 산뜻하게 흡수되는 것이 특징입니다.',
  },
  {
    id: 107,
    category: 'cosmetics',
    q: '클로로필 성분은 어떤 역할을 하나요?',
    a: '노폐물 배출을 돕고 피부 진정과 세포 재생에 도움을 주는 성분입니다.',
  },
  {
    id: 108,
    category: 'cosmetics',
    q: '화장품 라인업은 언제 출시되나요?',
    a: '2~3년차에 고기능성 화장품 및 바디케어 라인을 출시할 계획이며, 4~5년차에는 미세조류 유래 천연 화장품 원료를 자체 개발할 예정입니다.',
  },
  {
    id: 109,
    category: 'cosmetics',
    q: '민감성 피부도 사용할 수 있나요?',
    a: '피코시아닌 성분이 피부 자극이 적어 민감한 피부도 부담 없이 사용할 수 있도록 개발하고 있습니다.',
  },
  {
    id: 110,
    category: 'cosmetics',
    q: '고객 후기는 어디서 확인할 수 있나요?',
    a: '화장품 페이지의 고객 후기 섹션에서 실제 사용 후기를 확인하실 수 있습니다.',
  },
  {
    id: 101,
    category: 'pet-food',
    q: '반려동물도 섭취할 수 있나요?',
    a: '네, 반려동물 푸드 라인에도 동일한 고순도 스피루리나 원료를 사용합니다.',
  },
  {
    id: 111,
    category: 'pet-food',
    q: '도그원샷은 어떤 제품인가요?',
    a: '반려동물의 피부와 피모 건강을 위한 수제 펫푸드로, 기능성 미세조류 원료를 사용합니다.',
  },
  {
    id: 112,
    category: 'pet-food',
    q: '왜 피부 건강에 집중하나요?',
    a: '반복되는 가려움과 피부 손상은 2차 세균·효모 감염, 만성 외이염으로 이어질 수 있어 꾸준한 관리가 필요하기 때문입니다.',
  },
  {
    id: 113,
    category: 'pet-food',
    q: '제품 라인업은 어떻게 구성되나요?',
    a: '일상 급여용 고단백 사료와 저알러지·습식 보완 제품, 기능성 미세조류 원료로 만드는 즉석 수제 펫푸드 3종(츄르·소시지·육포)으로 구성됩니다.',
  },
  {
    id: 114,
    category: 'pet-food',
    q: '실제로 효과가 있었나요?',
    a: '섭취 2일차부터 완화 효과와 식욕 증진이 나타났고, 10일차에는 가려움 증상이 100% 개선된 사례가 있습니다. 개체에 따라 차이가 있을 수 있습니다.',
  },
  {
    id: 115,
    category: 'pet-food',
    q: '도그원샷은 언제 출시되나요?',
    a: '출시를 앞두고 있으며, 자세한 제품 정보는 출시와 함께 공개됩니다.',
  },
  {
    id: 116,
    category: 'pet-food',
    q: '앞으로 어떤 계획이 있나요?',
    a: 'AI 연동 펫푸드 시스템 개발과 프랜차이즈 확장을 준비하고 있습니다.',
  },
  {
    id: 102,
    category: 'smart-farm',
    q: '스마트팜에서 재배한 작물은 일반 농산물과 어떻게 다른가요?',
    a: '미세조류 기반 비료로 재배해 착과와 꽃봉오리가 늘고, 당도·과즙·식감이 개선되는 결과를 확인했습니다.',
  },
  {
    id: 117,
    category: 'smart-farm',
    q: '미세조류 기반 비료는 무엇인가요?',
    a: '비농지에서도 자생하는 미세조류 배양 기술을 농업에 적용한 비료로, 환경 관리와 함께 당도와 식감까지 관리합니다.',
  },
  {
    id: 118,
    category: 'smart-farm',
    q: '일반 스마트팜과는 어떤 차이가 있나요?',
    a: '일반 스마트팜이 온도·습도 등 환경 관리에 집중한다면, 여기에 미세조류 기반 비료를 더해 작물의 당도와 식감까지 끌어올립니다.',
  },
  {
    id: 119,
    category: 'smart-farm',
    q: '딸기·토마토 외에 다른 작물에도 효과가 있나요?',
    a: '포도는 비료 공급 약 2주 만에 회복되었고, 파프리카는 발아 수량 2배 이상, 성장 속도 30% 이상 빠른 결과를 확인했습니다.',
  },
  {
    id: 103,
    category: 'smart-farm',
    q: '스마트팜 농산물은 어디서 구매할 수 있나요?',
    a: '소형 매장에서 시식 후 소포장·묶음 구매가 가능하며, 예약 주문과 픽업을 운영합니다. 인근 카페·베이커리·식당에는 발주량에 맞춰 수확·배송합니다.',
  },
  {
    id: 120,
    category: 'smart-farm',
    q: '매장은 어떤 규모로 운영되나요?',
    a: '약 6평 소형 매장에서 시식 후 소포장·묶음 구매가 가능하도록 운영합니다.',
  },
  {
    id: 104,
    category: 'smart-farm',
    q: '스마트팜 매장은 앞으로 확대되나요?',
    a: '시범 운영 성과에 따라 지역별 매장을 확대할 계획입니다.',
  },
  {
    id: 121,
    category: 'smart-farm',
    q: '앞으로의 추진 계획은 무엇인가요?',
    a: '2~3년차에 도시 스마트팜 테스트베드 구축과 딸기·토마토 직거래 매장 시범 운영을, 4~5년차에는 바이오스티뮬런트 농법 기반 스마트팜 확장을 계획하고 있습니다.',
  },
];

const ACTIVE_INGREDIENTS = [
  {
    title: '피코시아닌',
    label: '항산화 · 면역',
    description:
      '스피루리나에만 들어있는 청색 색소 단백질로, 피부 위에 미세한 수분막을 형성해 강력한 항산화 효능으로 노화를 방지합니다. 환경적 스트레스로 인한 자극을 막아주고 피부 면역 시스템 향상에 도움을 주며, 부작용 없이 민감한 피부에도 자극적이지 않습니다. 또한 세포분열에 필요한 단백질을 공급하고 임파구(림프구) 생성을 촉진해 면역 세포 활성화에도 관여합니다.',
  },
  {
    title: '베타카로틴',
    label: '보습 · 세포 강화',
    description:
      '식품의약품안전처가 인정한 건강기능성 원료로, 항산화 작용과 세포 강화·면역력 증강에 효과적입니다. 소량으로도 충분한 보습력을 발휘하며 끈적임 없이 쾌적한 사용감을 줍니다. 유해산소를 제거하는 산화방지제 역할을 해 자외선으로 인한 손상을 방지하고, 피부 면역력 관리와 유지에도 도움을 줍니다.',
  },
  {
    title: '클로로필',
    label: '노폐물 제거 · 세포 재생',
    description:
      '활성산소를 제거하는 녹색 광합성 항산화 물질로, 피부에 축적된 중금속·노폐물과 피지를 제거하고 항염 작용으로 염증 생성을 억제합니다. 적혈구 생성을 도와 세포 재생을 촉진하며, 혈액 정화와 산소 운반 능력 향상에도 기여합니다.',
  },
];

// 좌/우 각 3개 원을 잇는 반원 형태의 곡선 + 맨 위 두 원(지방류·일반성분)을 잇는 곡선.
// 중간 노드 위치는 각 곡선의 t=0.5 지점과 정확히 일치시켜 선이 원 중심을 그대로 통과하도록
// 계산했습니다. 좌표는 다이어그램 컨테이너(3:2 비율)와 동일한 비율의 viewBox(0 0 100 66.667)
// 기준이라, 곡선이 타원형으로 눌리지 않고 실제 화면 비율 그대로 그려집니다.
const NUTRITION_ARCS = {
  left: 'M 14 48 Q 16 25.3 34 8',
  right: 'M 86 48 Q 84 25.3 66 8',
  top: 'M 34 8 Q 50 2 66 8',
};

// 5대 영양소 = 진한 배경(강조) · 아미노산 = 5대 영양소와 동일(유지)
// 비타민류 · 미네랄류 = 5대 영양소보다 한 단계 은은한 배경(불투명 — 선이 비쳐 보이지 않도록)
// 지방류 · 일반성분 = 흰색 배경
const NUTRITION_STYLE = {
  strong: 'bg-primary-4 text-white',
  soft: 'bg-[#dde3da] text-primary-2 border border-primary-4/30',
  plain: 'bg-white text-primary-2 border border-primary-4/40',
} as const;

const NUTRITION_FACTS = [
  {
    count: '5대',
    label: '영양소',
    detail: '단백질 · 탄수화물 · 지방 · 비타민 · 미네랄',
    position: { x: 14, y: 72 },
    style: 'strong' as const,
    caption: 'below' as const,
  },
  {
    count: '12종',
    label: '비타민류',
    detail: '비타민 A·B1·B2·B3·B6·C·E·K, 판토텐산·엽산·콜린·카로틴',
    position: { x: 20, y: 40 },
    style: 'soft' as const,
    caption: 'outer-left' as const,
  },
  {
    count: '7종',
    label: '지방류',
    detail: '미리스틴산·팔미틴산·스테아린산·팔미톨레산·올레산·리놀렌산·감마리놀렌산',
    position: { x: 34, y: 12 },
    style: 'plain' as const,
    caption: 'outer-left' as const,
  },
  {
    count: '18종',
    label: '아미노산',
    detail: '필수아미노산 9종 포함',
    position: { x: 86, y: 72 },
    style: 'strong' as const,
    caption: 'below' as const,
  },
  {
    count: '10종',
    label: '미네랄류',
    detail: '칼슘·철·마그네슘·인·칼륨·나트륨·아연·구리·망간·셀레늄',
    position: { x: 80, y: 40 },
    style: 'soft' as const,
    caption: 'outer-right' as const,
  },
  {
    count: '5종',
    label: '일반성분',
    detail: '단백질 · 지방(지질) · 회분 · 탄수화물 · 식이섬유',
    position: { x: 66, y: 12 },
    style: 'plain' as const,
    caption: 'outer-right' as const,
  },
];

export default function TechPage() {
  return (
    <>
      <PageIntro
        eyebrow="TECH"
        title="스피루리나 소개"
      />

      <HeroBanner
              eyebrow="SPIRULINA"
              title={'스피루리나란?'}
              description="지구상에서 가장 오래된 생명체 중 하나로, 65% 이상의 풍부한 식물성 단백질과 필수 5대
              영양소를 포함한 700여 종의 영양소를 함유하고 있습니다. 청록색 다세포 조류로 맨눈으로는
              보이지 않으며, 알칼리성 염호에서 자생합니다. 1927년 독일 과학자에 의해 처음
              명명되었습니다."
              imageAlt="스피루리나 이미지"
            />

        <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 lg:pt-30">
           <p className="text-small mb-4 font-bold">
              ACTIVE INGREDIENT
            </p>
            <h2 className="text-h4 mb-5 lg:text-h2">
              3대 핵심 활성 성분
            </h2>
            <p className="text-body mb-10 lg:mb-25 text-gray-750">
              스피루리나를 특별하게 만드는 3가지 핵심 활성
              성분이 항산화와 보습, 세포 재생에 이르는 피부 건강을 다각도로 책임집니다.
            </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-15 lg:gap-y-0">
            {ACTIVE_INGREDIENTS.map((ingredient) => (
              <article key={ingredient.title}>
                <p className="text-h5 lg:text-h4 text-black mb-2 font-bold">{ingredient.title}</p>
                <p className="text-base font-semibold text-text-sub mb-6">{ingredient.label}</p>
                <div className="mb-6 border-t border-gray-300 lg:mb-8" />
                <p className="text-body text-text-sub leading-6">{ingredient.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 lg:py-30">
          <p className="text-small mb-4 font-bold">NUTRITION</p>
          <h2 className="text-h4 mb-5 lg:text-h2">영양 성분</h2>
          <p className="text-body mb-10 lg:mb-16 text-gray-750">
            단백질과 필수아미노산, 비타민, 미네랄, 지방산까지.<br/> 스피루리나 한 스푼에 담긴 50여
            종의 영양소를 6가지 카테고리로 체계화하여,<br/> 고순도 원료가 지닌 영양학적 가치를
            과학적 데이터로 증명합니다.
          </p>

          <div className="relative mx-auto hidden aspect-3/2 w-full max-w-340 lg:block">
            <svg
              viewBox="0 0 100 66.667"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d={NUTRITION_ARCS.left}
                fill="none"
                stroke="var(--color-primary-4)"
                strokeWidth="0.35"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={NUTRITION_ARCS.right}
                fill="none"
                stroke="var(--color-primary-4)"
                strokeWidth="0.35"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={NUTRITION_ARCS.top}
                fill="none"
                stroke="var(--color-primary-4)"
                strokeWidth="0.35"
                strokeOpacity="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="absolute top-1/2 left-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/images/tech/영양성분.png"
                alt="스피루리나 영양 성분 제품 이미지"
                fill
                sizes="340px"
                className="object-contain"
              />
            </div>

            {NUTRITION_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${fact.position.y}%`, left: `${fact.position.x}%` }}
              >
                <div
                  className={`relative z-10 flex size-40 shrink-0 flex-col items-center justify-center rounded-full text-center shadow-sm ${NUTRITION_STYLE[fact.style]}`}
                >
                  <span className="text-[1.3rem] leading-tight font-bold">{fact.count}</span>
                  <span className="text-[0.95rem] leading-tight font-semibold">{fact.label}</span>
                </div>

                {fact.caption === 'below' ? (
                  <div className="absolute top-full left-1/2 mt-3 w-44 -translate-x-1/2 text-center">
                    <p className="text-text-sub text-[0.85rem] leading-6">{fact.detail}</p>
                  </div>
                ) : fact.caption === 'outer-left' ? (
                  <div className="absolute top-1/2 right-full mr-3 w-36 -translate-y-1/2 text-right">
                    <p className="text-text-sub text-[0.85rem] leading-6">{fact.detail}</p>
                  </div>
                ) : (
                  <div className="absolute top-1/2 left-full ml-3 w-36 -translate-y-1/2 text-left">
                    <p className="text-text-sub text-[0.85rem] leading-6">{fact.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 모바일/태블릿: 이미지 + 그리드 */}
          <div className="lg:hidden">
            <div className="relative mx-auto mb-10 aspect-square w-full max-w-64">
              <Image
                src="/images/tech/영양성분.png"
                alt="스피루리나 영양 성분 제품 이미지"
                fill
                sizes="256px"
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {NUTRITION_FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`flex size-24 flex-col items-center justify-center rounded-full text-center shadow-sm ${NUTRITION_STYLE[fact.style]}`}
                  >
                    <span className="text-base leading-tight font-bold">{fact.count}</span>
                    <span className="text-small leading-tight font-semibold">{fact.label}</span>
                  </span>
                  <span className="text-text-sub text-[0.78rem] leading-5">{fact.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-[#F6F9EF]">
          <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
              <div className="lg:w-[42%] lg:shrink-0">
                <p className="text-small text-black mb-4 font-bold lg:mb-8">RECOGNITION</p>
                <h2 className="text-h4 lg:text-h2 text-black mb-5">국제 공인 연혁</h2>
                <p className="text-body mb-10 max-w-2xl text-gray-750 lg:mb-16">
                  스피루리나는 한 기업의 주장이 아니라, UN·FAO·미국 FDA·WHO 등 국제기구가 지난
                  수십 년에 걸쳐 안전성과 영양 가치를 공식적으로 인정해온 식품입니다. 1974년,
                  미래 식량으로 지목된 이후 반복적으로 이어진 국제적 공인의 흐름을 통해,
                  스피루리나가 왜 신뢰할 수 있는 원료인지를 보여드립니다.
                </p>
              </div>

              <div className="lg:w-[50%]">
                <RoadmapGrid
                  items={[
                    {
                      year: '1974',
                      description: [
                        'UN, 인류에게 가장 이상적인 음식',
                        'FAO, 미래 최고의 음식',
                      ],
                    },
                    {
                      year: '1981',
                      description: [
                        '미국 FDA, 부작용 없는 건강하고 안전한 제품 인증',
                      ],
                    },
                    {
                      year: '1992',
                      description: [
                        'WHO, 21세기의 건강한 제품',
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </section>
        </div>

        <section className="mx-auto w-full max-w-360 px-[3%] py-15 canvas:px-0 canvas:py-30">
           <p className="text-small mb-4 font-bold">
              FAQ
            </p>
          <h2 className="text-h4 lg:text-h2 text-black mb-5">스피루리나가 더 궁금하신가요?</h2>
          <p className="text-text-sub text-[0.95rem] leading-6 mb-12 lg:mb-20">
            섭취 방법부터 활용 분야까지, 건강기능식품·화장품·반려동물 푸드·스마트팜 분야별 궁금증을 모았습니다.
          </p>
          <FaqAccordion items={FAQ_ITEMS} categories={FAQ_CATEGORIES} itemsPerPage={5} />
        </section>
    </>
  );
}
