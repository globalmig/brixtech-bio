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

const { data: existingBrand } = await supabase
  .from('brands')
  .select('id')
  .eq('slug', 'spione')
  .maybeSingle();

let brandId = existingBrand?.id;

if (!brandId) {
  const { data, error } = await supabase
    .from('brands')
    .insert({
      slug: 'spione',
      name: 'Spione',
      category: 'PET FOOD',
      business_category: '반려동물 푸드',
      logo: '/images/brand/spione-logo-black.png',
      logo_white: '/images/brand/spione-logo-white.png',
      bg_image: '/images/brand/spione-bg.png',
      banner_image: '/images/brand/spione-brand-banner.png',
      tagline: '반려동물의 건강을 위한 프리미엄 기능성 펫푸드',
      card_description: '반려동물의 건강을 위한\n프리미엄 기능성 펫푸드',
      coming_soon_count: 2,
    })
    .select('id')
    .single();

  if (error) {
    console.error('브랜드 생성 실패:', error.message);
    process.exit(1);
  }

  brandId = data.id;
  console.log('브랜드 "Spione" 생성 완료');
} else {
  console.log('브랜드 "Spione"가 이미 존재합니다. (변경 없음)');
}

const { data: existingProduct } = await supabase
  .from('products')
  .select('id')
  .eq('brand_id', brandId)
  .eq('slug', 'dog-oneshot')
  .maybeSingle();

if (existingProduct) {
  console.log('제품 "도그원샷"이 이미 존재합니다. (변경 없음)');
  process.exit(0);
}

const { data: product, error: productError } = await supabase
  .from('products')
  .insert({
    brand_id: brandId,
    slug: 'dog-oneshot',
    name: '도그원샷',
    thumbnail: '/images/brand/spione-dogoneshot.png',
    description: '반려동물의 피부와 피모 건강을 위한 수제 펫푸드입니다.',
    weight: '4kg',
    feeding_target: '12개월 이상',
    recommended_target: '만성장병증 등의 소화기 질환',
    ingredients:
      '쌀, 가수분해대두단백, 가수분해연어, 정제닭기름, 천연항미제, 정제대두유, 아마종실, 정제어유(청어유), 비트펄프, 정제섬유소, 프리바이오틱스(치커리 이눌린, 프락토올리고당), 염화콜린, 인산칼슘, 탄산칼슘, 식염, 뷰티르산, 가수분해카제인(αS-카제인), L-트립토판, L-테아닌, GABA, L-카르니틴, 비타민제합제(비타민A,D3,E,B1,B2,B6,B12,비오틴,엽산,판토텐산,나이아신), 미량광물질류합제(철,구리,망간,아연,코발트,요오드,셀레늄), DL-메치오닌, 비타민C, 단백질분해효소, 탄닌, 클리놉틸로라이트, 금잔화추출물(루테인,지아잔틴), 유카추출물, 페뉴그릭추출물, 베리믹스(마키베리,아사이베리,아로니아), 천연항산화제(로즈마리,비타민E,구연산,플라보노이드) *위 사용 원료는 공장 사정에 따라 배합비율이 변경될 수 있음',
  })
  .select('id')
  .single();

if (productError) {
  console.error('제품 생성 실패:', productError.message);
  process.exit(1);
}

const features = [
  '소화기 안정성을 고려한 7.0%의 저지방 설계로 만성장병증으로 인한 증상 완화에 도움',
  '염증 완화를 돕는 평균 1,000달톤 이하의 가수분해 연어를 사용하여 식이성 알러지로 인한 소화기 및 위장관 건강에 도움',
  '프리바이오틱스 성분 강화로 마이크로바이옴 형성에 도움',
  '증상이 있는 반려견의 스트레스 케어를 돕기 위한 천연 성분인 가수분해 카제인, GABA, L-트립토판, L-테아닌 성분 강화',
];

const nutrients = [
  { label: '조단백질', value: '22.5% 이상' },
  { label: '조지방', value: '7.0% 이상' },
  { label: '조섬유', value: '4.0% 이하' },
  { label: '조회분', value: '8.0% 이하' },
  { label: '칼슘', value: '0.6% 이상' },
  { label: '인', value: '0.4% 이상' },
  { label: '수분', value: '12.0% 이하' },
];

await supabase.from('product_features').insert(
  features.map((label, index) => ({
    product_id: product.id,
    label,
    sort_order: index,
  }))
);

await supabase.from('product_nutrients').insert(
  nutrients.map((nutrient, index) => ({
    product_id: product.id,
    label: nutrient.label,
    value: nutrient.value,
    sort_order: index,
  }))
);

console.log('제품 "도그원샷" 및 특징/성분 데이터 생성 완료');
