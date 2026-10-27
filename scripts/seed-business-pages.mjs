// business_pages/business_sections 테이블에 카테고리별 상세 블록을 채우는 시드 스크립트
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    '환경변수 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY가 필요합니다.'
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function bulletList(items) {
  return { type: 'bulletList', data: { items } };
}

function infoTable(rows, showDisclaimer = false) {
  return { type: 'infoTable', data: { rows, showDisclaimer } };
}

function customerReviews(reviews) {
  return { type: 'customerReviews', data: { reviews } };
}

function heroBanner(imageAlt) {
  return { type: 'heroBanner', data: { imageAlt } };
}

function imageText(body, imagePosition) {
  return { type: 'imageText', data: { body, imagePosition } };
}

function featureGrid(items) {
  return { type: 'featureGrid', data: { items } };
}

function processSteps(steps) {
  return { type: 'processSteps', data: { steps } };
}

function beforeAfter(items) {
  return { type: 'beforeAfter', data: { items } };
}

const PAGES = [
  {
    category: 'supplements',
    title: '건강기능식품',
    lead: '고순도 스피루리나 원료로 만든, 브릭스텍바이오의 핵심 건강기능식품 사업입니다.',
    sections: [
      {
        title: '하루를 채우는 고순도 스피루리나',
        titleEn: 'SUPPLEMENTS',
        lead: '브릭스텍바이오가 전남 나주 자체 배양시설에서 기른 고순도 마이크로 알지, 스피루리나로 만든 건강기능식품 사업입니다.',
        image: '/images/건강기능식품.png',
        note: null,
        content: heroBanner(),
      },
      {
        title: '배양부터 제품까지, 한 번에 책임지는 구조',
        titleEn: 'OUR APPROACH',
        lead: '원료 수급에 의존하지 않는 건강기능식품 사업을 만들어갑니다.',
        image: '/images/건강기능식품2.png',
        note: null,
        content: imageText(
          '브릭스텍바이오는 특허 기반 배양기술과 폐쇄형 광생물반응기(PBR)로 직접 기른 고순도 스피루리나를 정제해 건강기능식품 원료로 사용합니다. 외부 원료 수급 없이 배양부터 정제, 제품화까지 자체적으로 이어지는 구조라 원료의 순도와 생산 일정을 스스로 통제할 수 있고, 이는 제품 품질로 그대로 이어집니다.',
          'right'
        ),
      },
      {
        title: '건강기능식품 사업의 핵심 경쟁력',
        titleEn: 'STRENGTH',
        lead: '원료부터 제형까지, 세 가지 축으로 품질을 관리합니다.',
        image: null,
        note: null,
        backgroundColor: '#F4F1E9',
        content: featureGrid([
          {
            title: '원료 자립',
            label: 'SELF-SUFFICIENT',
            description: '자체 배양시설에서 수확한 고순도 스피루리나를 사용해 원료 수급과 품질을 동시에 관리합니다.',
          },
          {
            title: '품질관리체계',
            label: 'QUALITY SYSTEM',
            description: '입고부터 출고까지 전 공정에 걸친 품질검사를 통과한 제품만 출고됩니다.',
          },
          {
            title: '제형 다양화',
            label: 'PRODUCT FORM',
            description: '농축액과 스틱, 두 가지 제형으로 생활 방식에 맞춰 선택할 수 있도록 구성했습니다.',
          },
        ]),
      },
      {
        title: '품질관리 공정',
        titleEn: 'QUALITY CONTROL',
        lead: '원료 입고부터 출고까지, 전 과정에 걸친 품질관리로 품질을 지킵니다.',
        image: null,
        note: null,
        content: featureGrid([
          {
            title: '원료 입고',
            label: 'Receiving',
            description: '자체 배양시설에서 수확한 고순도 스피루리나 원료를 입고합니다.',
          },
          {
            title: '정제·혼합',
            label: 'Refining & Blending',
            description: '정제 공정을 거친 원료를 제품별 기준에 맞게 혼합합니다.',
          },
          {
            title: '포장',
            label: 'Packaging',
            description: '농축액과 스틱, 각 제품 형태에 맞춰 포장합니다.',
          },
          {
            title: '품질 검사',
            label: 'Quality Inspection',
            description: '출고 전 전 제품에 대해 품질 검사를 진행합니다.',
          },
          {
            title: '출고',
            label: 'Shipping',
            description: '검사를 통과한 제품만 출고되어 고객에게 전달됩니다.',
          },
        ]),
      },
      {
        title: '고객 후기',
        titleEn: 'REVIEW',
        lead: '실제 섭취자들의 생생한 후기를 소개합니다.',
        image: null,
        note: null,
        content: customerReviews([
          {
            quote:
              '지인 선물용으로 샀는데 제가 먼저 먹게 됐어요. 농축액은 양이 넉넉해서 아침저녁으로 든든하게 챙겨 먹기 좋고, 스틱 타입은 휴대가 간편해서 생각날 때마다 먹기 좋아요. 꾸준히 먹어볼게요!',
            context: '선물용으로 구매 후 직접 섭취',
          },
          {
            quote:
              '처음에는 효과를 잘 못 느꼈는데, 꾸준히 먹다 보니 아침에 속이 편해지고 컨디션이 자연스럽게 좋아지는 느낌이에요. 저한테 잘 맞는 것 같아요.',
            context: '2개월째 섭취',
          },
          {
            quote:
              '농축액만 먹다가 스틱 제품도 같이 먹기 시작했는데, 휴대하기도 편하고 먹기도 편해서 몸이 더 가벼워진 느낌이에요.',
            context: '농축액과 함께 섭취',
          },
          {
            quote:
              '아직은 챙겨줘야 먹지만, 잘 받아먹는 걸 보니 맛이 괜찮은가 봐요. 항상 배송도 빠르고 신선하게 보내주셔서 믿고 먹이고 있습니다.',
            context: '자녀에게 섭취',
          },
          {
            quote:
              '딸 건강 생각해서 먹이기 시작했는데, 꾸준히 챙겨 먹더니 컨디션이 좋아진 것 같다고 하네요. 좋다는 건 알았지만 직접 효과를 보니 더 믿음이 가요.',
            context: '모녀가 함께 섭취',
          },
        ]),
      },
    ],
  },
  {
    category: 'cosmetics',
    title: '화장품',
    lead: '피코시아닌·베타카로틴·클로로필, 미세조류 유래 3대 활성성분을 담은 바이오 스킨케어입니다.',
    sections: [
      {
        title: '피코시아닌이 피부에 닿는 순간부터',
        titleEn: 'BIO SKINCARE',
        lead: '브릭스텍바이오가 기른 마이크로 알지에서 추출한 피코시아닌·베타카로틴·클로로필, 3대 활성성분을 담은 바이오 스킨케어 사업입니다.',
        image: '/images/화장품.png',
        note: null,
        content: heroBanner(),
      },
      {
        title: '화장품 원료가 된 마이크로 알지',
        titleEn: 'OUR APPROACH',
        lead: '건강기능식품에 쓰이는 동일한 고순도 원료가 화장품의 활성성분이 됩니다.',
        image: '/images/화장품2.png',
        note: null,
        content: imageText(
          '브릭스텍바이오는 자체 배양한 고순도 마이크로 알지에서 추출한 피코시아닌·베타카로틴·클로로필을 활성성분으로 사용합니다. 세 성분 모두 항산화와 보습, 세포 재생에 걸쳐 피부 건강에 작용하며, 토너부터 크림까지 이어지는 기초 루틴 라인에 적용해 산뜻하게 흡수되면서도 자극이 적은 사용감을 목표로 개발하고 있습니다.',
          'left'
        ),
      },
      {
        title: '화장품 사업을 이루는 3대 활성성분',
        titleEn: 'ACTIVE INGREDIENT',
        lead: '미세조류에서 추출한 세 가지 성분이 사업의 토대를 이룹니다.',
        image: null,
        note: null,
        backgroundColor: '#F6F9EF',
        content: featureGrid([
          {
            title: '피코시아닌',
            label: 'ANTI-OXIDANT',
            description: '스피루리나에만 들어있는 청색 색소 단백질로, 강력한 항산화 작용과 피부 면역 강화에 작용합니다.',
          },
          {
            title: '베타카로틴',
            label: 'MOISTURE',
            description: '식품의약품안전처가 인정한 건강기능성 원료로, 적은 양으로도 충분한 보습력을 발휘합니다.',
          },
          {
            title: '클로로필',
            label: 'REGENERATION',
            description: '노폐물과 피지를 제거하고 세포 재생을 도와 피부 진정에 작용합니다.',
          },
        ]),
      },
    ],
  },
  {
    category: 'pet-food',
    title: '반려동물 푸드',
    lead: '기능성 미세조류 원료로 만드는 즉석 수제 펫푸드, 도그원샷을 만나보세요.',
    sections: [
      {
        title: '반려동물의 피부 건강을 위한 수제 펫푸드',
        titleEn: 'SPIONE · DOG ONESHOT',
        lead: '기능성 미세조류 원료로 반려동물의 피부와 피모 건강을 관리하는 브릭스텍바이오의 펫푸드 사업, 도그원샷입니다.',
        image: '/images/brand/spione-dogoneshot.png',
        note: null,
        content: heroBanner(),
      },
      {
        title: '왜 피부 건강에 집중하는가',
        titleEn: 'WHY SKIN CARE',
        lead: '반복되는 가려움은 방치할수록 더 큰 문제로 이어집니다.',
        image: '/images/반려동물식품.png',
        note: null,
        content: imageText(
          '반복되는 가려움과 피부 손상은 2차 세균·효모 감염, 만성 외이염으로 이어질 수 있어 보호자에게 꾸준한 관리 부담을 줍니다. 도그원샷은 피부·피모 컨디션 관리를 중심에 둔 고단백 사료를 일상 급여용으로, 저알러지·습식 제품을 보완 선택지로 제공해 반려동물의 피부 건강을 식단에서부터 관리할 수 있도록 합니다.',
          'right'
        ),
      },
      {
        title: '도그원샷이 다른 이유',
        titleEn: 'DIFFERENCE',
        lead: '같은 고순도 원료를 반려동물에게도 적용합니다.',
        image: null,
        note: null,
        content: featureGrid([
          {
            title: '기능성 원료',
            label: 'FUNCTIONAL',
            description: '브릭스텍바이오가 자체 배양한 미세조류 원료를 반려동물 전용 제품에도 동일하게 적용합니다.',
          },
          {
            title: '피부 중심 설계',
            label: 'SKIN FIRST',
            description: '일상 급여용 고단백 사료와 저알러지·습식 보완 제품으로 피부 컨디션 관리를 돕습니다.',
          },
          {
            title: '검증된 원료',
            label: 'TRACEABLE',
            description: '건강기능식품과 동일한 품질관리 체계를 거친 원료만 사용합니다.',
          },
        ]),
      },
      {
        // 실제 급여 사례(1~10일차) 사진 기반 섹션 — 내용/이미지를 변경하지 않고 그대로 유지합니다.
        title: '반려동물 변화 사례',
        titleEn: null,
        lead: '반복되는 가려움과 피부 손상은 반려견과 보호자 모두에게 지속적인 관리가 부담됩니다.\n반려동물의 피부와 피모 컨디션을 고려하여 영양관리를 통해 단기간에 질환을 완화할 수 있습니다.',
        image: null,
        note: null,
        content: processSteps([
          {
            image: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793079127783-e031dc4e-c28a-4e9a-816e-d02876648d5d.png',
            label: '1일차',
            description: '귀 주변 피부 발적과 긁는 행동 관찰',
          },
          {
            image: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793079129792-f081f379-16fb-415e-a901-1f3ac74ebc04.png',
            label: '2~3일차',
            description: '피부 완화 효과와 식욕 증진',
          },
          {
            image: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793079132665-a28392ce-af04-468b-9fc3-c0e82bd15824.png',
            label: '6일차',
            description: '긁는 행동 감소, 80% 개선',
          },
          {
            image: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793079136209-575ec44c-97c0-4ad6-8923-64ba63162583.png',
            label: '8일차',
            description: '긁는 행동 소실',
          },
          {
            image: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793079139483-cda6c3d3-89d5-4f3e-92c0-b264b738217e.png',
            label: '10일차',
            description: '100% 개선 및 완치',
          },
        ]),
      },
    ],
  },
  {
    category: 'smart-farm',
    title: '스마트팜',
    lead: '미세조류 기반 비료로 키운 딸기와 토마토를, 가까운 매장에서 만나보세요.',
    sections: [
      {
        title: '미세조류 비료로 키운 딸기와 토마토',
        titleEn: 'SMART FARM',
        lead: '브릭스텍바이오의 미세조류 기반 비료 기술을 적용한 스마트팜 사업으로, 재배부터 매장 판매까지 직접 관리합니다.',
        image: '/images/스마트팜.png',
        note: null,
        content: heroBanner(),
      },
      {
        title: '재배 경쟁력',
        titleEn: 'CULTIVATION',
        lead: '미세조류 기반 비료가 작물에 가져온 변화를 데이터로 확인했습니다.',
        image: null,
        note: null,
        content: bulletList([
          '딸기·벼 — 비료 공급 시 착과와 꽃봉오리가 늘고, 당도·과즙·식감이 개선되는 것을 확인했습니다.',
          '포도 — 영양 부족으로 시들어가던 포도나무가 비료 공급 약 2주 만에 회복되었습니다.',
          '파프리카 — 발아 수량 2배 이상, 성장 속도 30% 이상 빠른 결과를 확인했습니다.',
        ]),
      },
      {
        title: '재배부터 판매까지, 직접 운영하는 유통',
        titleEn: 'STORE & SUPPLY',
        lead: '작게 시작해 품질을 직접 확인할 수 있는 유통 구조를 만들었습니다.',
        image: null,
        note: null,
        backgroundColor: '#f5f5f5',
        content: featureGrid([
          {
            title: '소형 매장',
            label: 'DIRECT STORE',
            description: '시식 후 소포장·묶음 구매가 가능하며, 예약 주문과 픽업을 운영합니다.',
          },
          {
            title: '카페·베이커리 납품',
            label: 'B2B SUPPLY',
            description: '인근 카페·베이커리·식당에는 발주량에 맞춰 수확·배송합니다.',
          },
          {
            title: '직접 재배·관리',
            label: 'QUALITY CHECK',
            description: '재배부터 수확, 판매까지 전 과정을 직접 관리해 품질을 확인합니다.',
          },
        ]),
      },
      {
        // 실제 비료 적용 전/후 사진 기반 섹션 — 내용/이미지를 변경하지 않고 그대로 유지합니다.
        title: '변화 사례',
        titleEn: null,
        lead: null,
        image: null,
        note: null,
        content: beforeAfter([
          {
            beforeImage: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793081144089-592be55d-4d6c-45f8-9e85-698ac91f26d2.png',
            afterImage: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793081147349-a1efc524-2d21-4dee-8516-dc6495b35da0.png',
          },
          {
            beforeImage: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793081149813-5544f401-cd55-4770-b140-4bb564ad392f.png',
            afterImage: 'https://bjmmyfzwyweabdmynist.supabase.co/storage/v1/object/public/admin-uploads/business/1793081152313-16d5900c-0b1d-4fa8-ae9f-3e804e74a216.png',
          },
        ]),
      },
    ],
  },
  {
    category: 'air-purification',
    title: '공기정화기',
    lead: '미세조류 기반 친환경 탄소 저감 및 바이오 공기정화 시스템을 구현합니다.',
    sections: [
      {
        title: '미세조류로 공기를 정화하는 다음 단계',
        titleEn: 'AIR PURIFICATION',
        lead: '살아있는 미세조류의 탄소 흡수 능력을 활용한 친환경 공기정화 시스템을 준비하고 있습니다.',
        image: '/images/공기정화기.png',
        note: null,
        content: heroBanner(),
      },
      {
        title: '필터가 아닌, 살아있는 미세조류로',
        titleEn: 'CONCEPT',
        lead: '광합성이라는 자연의 원리를 공기정화에 그대로 옮겨옵니다.',
        image: '/images/공기정화기2.png',
        note: null,
        content: imageText(
          '일반적인 필터 방식의 공기청정기와 달리, 살아있는 미세조류가 이산화탄소를 흡수하고 산소를 배출하는 광합성 과정을 실내 공기정화에 응용하는 방향을 검토하고 있습니다. 브릭스텍바이오가 건강기능식품·화장품 사업에서 쌓은 미세조류 배양 기술을 그대로 적용할 수 있다는 점이 이 사업의 출발점입니다.',
          'right'
        ),
      },
      {
        title: '미세조류 공기정화가 향하는 곳',
        titleEn: 'WHERE TO USE',
        lead: '실내 공기 질 관리와 탄소 저감, 두 방향을 함께 바라봅니다.',
        image: null,
        note: null,
        content: featureGrid([
          {
            title: '실내 공간',
            label: 'INDOOR',
            description: '사무실, 매장 등 실내 공간의 공기 질 관리를 목표로 합니다.',
          },
          {
            title: '탄소 저감',
            label: 'CARBON',
            description: '미세조류의 탄소 흡수 능력을 활용한 친환경 저감을 목표로 합니다.',
          },
        ]),
      },
      {
        title: '친환경 공기정화 사업을 바라보는 방향',
        titleEn: 'DIRECTION',
        lead: '같은 기술, 다른 쓰임을 고민합니다.',
        image: null,
        note: null,
        content: featureGrid([
          {
            title: '배양 기술의 확장',
            label: 'CORE TECH',
            description: '건강기능식품·화장품 사업에서 쌓은 미세조류 배양 기술을 공기정화 영역으로 확장합니다.',
          },
          {
            title: '지속가능성',
            label: 'SUSTAINABILITY',
            description: '필터 교체 없이 생물학적으로 작동하는 정화 방식을 지향합니다.',
          },
        ]),
      },
    ],
  },
];

for (const pageData of PAGES) {
  const { data: page, error: upsertError } = await supabase
    .from('business_pages')
    .upsert(
      {
        category: pageData.category,
        title: pageData.title,
        lead: pageData.lead,
      },
      { onConflict: 'category' }
    )
    .select('id')
    .single();

  if (upsertError || !page) {
    console.error(`[${pageData.category}] 페이지 저장 실패:`, upsertError?.message);
    continue;
  }

  await supabase.from('business_sections').delete().eq('business_page_id', page.id);

  const { error: insertError } = await supabase.from('business_sections').insert(
    pageData.sections.map((section, index) => ({
      business_page_id: page.id,
      title: section.title,
      title_en: section.titleEn,
      image: section.image,
      note: section.note,
      lead: section.lead,
      background_color: section.backgroundColor ?? null,
      block_type: section.content.type,
      sort_order: index,
      content: section.content.data,
    }))
  );

  if (insertError) {
    console.error(`[${pageData.category}] 섹션 저장 실패:`, insertError.message);
    continue;
  }

  console.log(`[${pageData.category}] ${pageData.sections.length}개 섹션 저장 완료`);
}
