-- 테이블 첫 생성
-- 브릭스텍 관리자페이지 스키마. Supabase 대시보드 > SQL Editor에서 1회 실행하세요.
-- 인증은 Supabase Auth(auth.users)를 그대로 사용하므로 별도 관리자 테이블은 두지 않습니다.

create extension if not exists pgcrypto;

-- 기업 소식 ---------------------------------------------------------------
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  thumbnail text,
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 기업 소개 영상 ------------------------------------------------------------
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text not null,
  thumbnail text,
  category text not null default 'company' check (category in ('company', 'product')),
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 브랜드 -------------------------------------------------------------------
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  business_category text not null,
  logo text,
  logo_white text,
  bg_image text,
  banner_image text,
  tagline text,
  card_description text,
  coming_soon_count integer not null default 0,
  sort_order integer not null default 0, -- 관리자 목록 드래그 정렬 순서
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 브랜드별 제품 --------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands (id) on delete cascade,
  slug text not null,
  name text not null,
  thumbnail text,
  description text,
  weight text, -- 중량
  feeding_target text, -- 급여대상
  recommended_target text, -- 권장대상
  ingredients text, -- 원재료명
  sort_order integer not null default 0, -- 관리자 목록 드래그 정렬 순서
  is_active boolean not null default true, -- 실제 사이트 노출 여부
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, slug)
);

-- 제품특징: 콤마(", ")로 구분 입력한 값을 분리해 각 행(= 공개 페이지의 li 한 줄)으로 저장
create table if not exists product_features (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  label text not null,
  sort_order integer not null default 0
);

-- 등록 성분량: label/value 쌍을 반복 입력
create table if not exists product_nutrients (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  label text not null,
  value text not null,
  sort_order integer not null default 0
);

-- BUSINESS 페이지 템플릿 -----------------------------------------------------
create table if not exists business_pages (
  id uuid primary key default gen_random_uuid(),
  -- 카테고리는 더 이상 고정 5종이 아니라, 관리자가 /admin/business에서 자유롭게
  -- 추가/삭제할 수 있는 슬러그입니다. 형식만 영문 소문자/숫자/하이픈으로 제한합니다.
  category text not null unique check (category ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null default '',
  title_en text, -- 제목 위에 표시되는 영문 라벨 (선택, 예: PET FOOD)
  lead text not null default '',
  is_active boolean not null default true, -- 실제 사이트 노출 여부
  lead_hidden boolean not null default false, -- 상단 제목/리드 문구 섹션 노출 여부
  sort_order integer not null default 0, -- 관리자 목록/헤더 BUSINESS 하위 메뉴 노출 순서
  updated_at timestamptz not null default now()
);

-- 카테고리별 섹션(블록) 목록. block_type은 BusinessSectionRenderer가 그리는 블록과 1:1 대응
create table if not exists business_sections (
  id uuid primary key default gen_random_uuid(),
  business_page_id uuid not null references business_pages (id) on delete cascade,
  title text,
  title_en text, -- 블록 영문 라벨 (선택, 예: SMART FARM). 비워두면 블록 타입별 기본값으로 대체됩니다.
  image text,
  note text,
  lead text, -- 블록 리드 문구 (선택). 비워두면 블록 타입별 기본값으로 대체됩니다.
  background_color text check ( -- 블록 배경색 (선택). null/'none'이면 기본 배경(흰색)
    background_color is null or background_color in (
      'none',
      'primary-2',
      '#f5f5f5',
      '#F4F1E9',
      '#F6F9EF'
    )
  ),
  hidden boolean not null default false,
  block_type text not null check (
    block_type in (
      'paragraph',
      'bulletList',
      'roadmapGrid',
      'infoTable',
      'customerReviews',
      'heroBanner',
      'imageText',
      'featureGrid',
      'beforeAfter',
      'processSteps'
    )
  ),
  sort_order integer not null default 0,
  content jsonb not null default '{}'::jsonb
);

-- RLS: 공개 페이지는 익명 키로 읽기만 가능, 쓰기는 서버의 Service Role 클라이언트(관리자 로그인 확인 후)만 수행
alter table news enable row level security;
alter table videos enable row level security;
alter table brands enable row level security;
alter table products enable row level security;
alter table product_features enable row level security;
alter table product_nutrients enable row level security;
alter table business_pages enable row level security;
alter table business_sections enable row level security;

create policy "public read news" on news for select using (true);
create policy "public read videos" on videos for select using (true);
create policy "public read brands" on brands for select using (true);
create policy "public read products" on products for select using (true);
create policy "public read product_features" on product_features for select using (true);
create policy "public read product_nutrients" on product_nutrients for select using (true);
create policy "public read business_pages" on business_pages for select using (true);
create policy "public read business_sections" on business_sections for select using (true);

-- 마이그레이션: 브랜드/제품 목록 드래그 정렬 ----------------------------------
-- 이미 생성된 DB에 아래 컬럼이 없다면 Supabase SQL Editor에서 한 번만 실행하세요.
-- (위 create table 문은 "if not exists"라 기존 테이블에는 영향을 주지 않습니다.)
alter table brands add column if not exists sort_order integer not null default 0;
alter table products add column if not exists sort_order integer not null default 0;

-- 마이그레이션: 제품/BUSINESS 페이지 노출 토글 --------------------------------
-- 이미 생성된 DB라면 Supabase SQL Editor에서 한 번만 실행하세요.
alter table products add column if not exists is_active boolean not null default true;
alter table business_pages add column if not exists is_active boolean not null default true;

-- 마이그레이션: BUSINESS 페이지 영문 타이틀 라벨 ------------------------------
-- 이미 생성된 DB라면 Supabase SQL Editor에서 한 번만 실행하세요.
alter table business_pages add column if not exists title_en text;

-- 마이그레이션: BUSINESS 카테고리 자유 추가 (고정 5종 제약 해제) -----------------
-- 이미 생성된 DB라면 sql/migrations/010_business_pages_dynamic_category.sql을
-- Supabase SQL Editor에서 한 번만 실행하세요. (고정 목록 체크 제약을 형식 체크로 교체)

-- 마이그레이션: BUSINESS 상세 페이지 제목/리드 섹션 노출 토글 -------------------
-- 이미 생성된 DB라면 sql/migrations/011_business_pages_lead_hidden.sql을
-- Supabase SQL Editor에서 한 번만 실행하세요.
alter table business_pages add column if not exists lead_hidden boolean not null default false;
