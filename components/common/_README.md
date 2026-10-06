# Common Components

이 폴더의 컴포넌트들은 색상·글자 크기를 직접 하드코딩하지 않고 전부 `app/globals.css`의 CSS 변수(시맨틱 토큰)를 참조합니다. 그래서 새 프로젝트를 시작할 때 아래 체크리스트만 따르면 **컴포넌트 코드는 한 줄도 건드리지 않고** 디자인을 통째로 바꿀 수 있습니다. shadcn/ui 스캐폴딩(card, popover, sidebar, chart 등)은 쓰지 않습니다 — `app/globals.css`에는 우리가 실제로 쓰는 토큰만 남겨뒀습니다.

## 새 프로젝트 시작 체크리스트

`app/globals.css` 한 파일만 수정하면 됩니다.

1. **브랜드 컬러** — `@theme`의 `--color-primary` 값(hex) 하나만 바꾸면 됩니다. 프로젝트마다 브랜드 색이 1개일 수도, 여러 개일 수도 있다고 가정하지 않습니다 — 색이 더 필요하면(hover 톤, 보조 브랜드 색 등) 그때 `--color-primary-2`처럼 직접 변수를 추가하세요. hover/active 표현이나 연한 배경 톤은 `brightness-*`/opacity 모디파이어 등으로 그때그때 처리하면 됩니다.
2. **중립 색(gray)** — `--color-gray-50~900`은 대부분 프로젝트에서 그대로 재사용 가능하지만, 필요하면 값만 교체합니다.
3. **상태 색(system colors)** — `--color-system-alert/success/information/warning`은 에러·성공·경고 등 상태 표시용 flat 색상입니다. Badge의 success/warning variant, Input의 에러/완료 상태, FileUpload 에러 표시가 이 값을 씁니다.
4. **타이포그래피** — `--text-h1`~`--text-h6`, `--text-body`, `--text-small`의 rem·line-height·font-weight 값을 새 프로젝트의 타입 스펙에 맞게 교체합니다. 공통 컴포넌트는 글자 크기를 지정하지 않으므로, 마크업에서 실제 태그 레벨에 맞춰 `className="text-h4"`처럼 직접 붙여 씁니다.
5. **폰트** — `@font-face`와 `--font-sans`를 새 프로젝트 폰트로 교체합니다.
6. **구조값(패딩/간격/radius 등)** — 컴포넌트 안에 남아 있는 padding·gap·rounded·아이콘 크기는 구조적인 값이라 프로젝트가 바뀌어도 대부분 그대로 둬도 됩니다. 필요할 때만 각 컴포넌트 파일에서 직접 수정하세요.

## Button

메인·보조·아웃라인 액션 버튼.

### Props

| prop        | type                                        | default     | 설명                 |
| ----------- | ------------------------------------------- | ----------- | -------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline'`     | `'primary'` |                      |
| `size`      | `'giant' \| 'large' \| 'medium' \| 'small'` \| `{ base?, sm?, md?, lg?: ButtonSize }` | `'large'`   | breakpoint별 객체로 반응형 크기 지정 가능 |
| `leftIcon`  | `ReactNode`                                 | —           | 왼쪽 아이콘 슬롯     |
| `rightIcon` | `ReactNode`                                 | —           | 오른쪽 아이콘 슬롯   |
| `disabled`  | `boolean`                                   | `false`     |                      |
| `className` | `string`                                    | —           | 추가 클래스          |
| …           | `button` attrs                              | —           | `onClick`, `type` 등 |

### 사용 예

```tsx
import { Button } from '@/components/common/Button';

// 기본 (primary, large)
<Button>저장</Button>

// variant / size
<Button variant="secondary" size="small">
  취소
</Button>

// 반응형 size (breakpoint별 다른 크기)
<Button size={{ base: 'small', md: 'medium', lg: 'large' }}>
  저장
</Button>

// 아이콘 (public/icons)
<Button
  leftIcon={<img src="/icons/chevron-left.svg" alt="" aria-hidden />}
  rightIcon={<img src="/icons/chevron-right.svg" alt="" aria-hidden />}
>
  Button
</Button>

// disabled
<Button disabled>비활성</Button>
```

`size`를 breakpoint별 객체로 넘기면 지정하지 않은 breakpoint는 바로 아래 breakpoint 값을 그대로 물려받습니다(반응형 CSS와 동일한 동작). 지원 breakpoint는 프로젝트에서 실제 쓰는 `base`/`sm`/`md`/`lg`만 지원합니다(`xl`/`2xl`은 사용례가 없어 제외, 필요해지면 `Button.tsx`의 `RESPONSIVE_SIZE_CLASSES`에 추가).

> `variant="outline"` + 반응형 `size` 조합에서는 size별로 다른 hover 배경색(`compoundVariants`)이 적용되지 않습니다(테두리 hover는 정상 적용). 필요해지면 `Button.tsx`에 보강하세요.

---

## Badge

상태, 분류, 남은 기간 등의 짧은 정보를 표시하는 비상호작용 라벨입니다.

### Props

| prop        | type                                           | default     | 설명                      |
| ----------- | ------------------------------------------------ | ----------- | ------------------------- |
| `variant`   | `'default' \| 'primary' \| 'success' \| 'warning'` | `'default'` | Badge의 색상 종류         |
| `icon`      | `ReactNode`                                  | —           | 텍스트 앞에 표시할 아이콘 |
| `className` | `string`                                     | —           | 추가 클래스               |
| `children`  | `ReactNode`                                  | —           | 표시할 내용               |
| …           | `span` attrs                                 | —           | `aria-label` 등           |

### 사용 예

```tsx
import Image from 'next/image';

import { Badge } from '@/components/common/Badge';

<Badge>이미지형</Badge>

<Badge variant="success">D-4</Badge>

<Badge variant="primary">D-2</Badge>

<Badge
  variant="warning"
  icon={
    <Image
      src="/images/acorn.svg"
      alt=""
      width={17}
      height={17}
      aria-hidden
    />
  }
>
  60
</Badge>
```

`Badge`는 클릭이나 선택 기능이 없는 정보 표시용 컴포넌트입니다. 사용자 입력이 필요한 경우에는 `Button`을 사용합니다.

아이콘은 `icon` prop으로 전달합니다. 장식용 아이콘은 `alt=""`와 `aria-hidden`을 지정해 스크린 리더에서 중복으로 읽히지 않도록 합니다.

---

## Dropdown

목록에서 하나의 값을 선택하는 드롭다운입니다. 기본 상태, 선택 상태와 비활성 상태를 지원합니다.

### Props

**Dropdown**

| prop            | type                              | default | 설명               |
| --------------- | ---------------------------------- | ------- | ------------------ |
| `value`         | `string`                          | —       | 제어 선택값        |
| `defaultValue`  | `string`                          | —       | 비제어 초기 선택값 |
| `onValueChange` | `(value: string \| null) => void` | —       | 값 변경 시 호출    |
| `disabled`      | `boolean`                         | `false` | 전체 비활성화      |

**DropdownTrigger** — 현재 값과 열림 상태를 표시하는 버튼입니다.

**DropdownValue** — Trigger에 표시할 텍스트입니다.

**DropdownContent**

| prop         | type                                            | default    | 설명                  |
| ------------ | ------------------------------------------------ | ---------- | --------------------- |
| `side`       | `'top' \| 'bottom' \| 'left' \| 'right' \| ...` | `'bottom'` | 목록이 표시될 방향    |
| `sideOffset` | `number`                                        | `0`        | Trigger와 목록의 간격 |
| `align`      | `'start' \| 'center' \| 'end'`                  | `'start'`  | Trigger 기준 정렬     |
| `className`  | `string`                                        | —          | 추가 클래스           |

**DropdownItem**

| prop       | type        | default | 설명                 |
| ---------- | ----------- | ------- | -------------------- |
| `value`    | `string`    | —       | 선택값 (필수)        |
| `disabled` | `boolean`   | `false` | 해당 옵션 비활성화   |
| `children` | `ReactNode` | —       | 화면에 표시할 텍스트 |

### 사용 예

```tsx
'use client';

import { useState } from 'react';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from '@/components/common/Dropdown';

const [value, setValue] = useState<string | null>(null);

<Dropdown value={value} onValueChange={setValue}>
  <DropdownTrigger>
    <DropdownValue placeholder="선택해주세요" />
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="single">객관식 - 단일선택</DropdownItem>
    <DropdownItem value="multiple">객관식 - 복수선택</DropdownItem>
    <DropdownItem value="subjective">주관식</DropdownItem>
  </DropdownContent>
</Dropdown>

// 전체 비활성
<Dropdown disabled>
  <DropdownTrigger>
    <DropdownValue placeholder="선택해주세요" />
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="single">객관식 - 단일선택</DropdownItem>
  </DropdownContent>
</Dropdown>
```

폼에서 사용할 때는 `value`와 `onValueChange`를 연결합니다. 옵션의 `value`는 중복되지 않는 안정적인 값으로 지정합니다.

---

## CheckBox

체크박스 + 라벨 + 부가설명. `Radio`와 달리 그룹 없이 각 항목을 독립적으로 사용하며(체크 여부가 서로 영향을 주지 않음), 라벨·부가설명 색상은 체크·비활성 여부와 상관없이 고정입니다.

### Props

| prop              | type                       | default   | 설명                           |
| ----------------- | --------------------------- | --------- | ------------------------------ |
| `size`            | `'large' \| 'medium'`      | `'large'` |                                |
| `checked`         | `boolean`                  | —         | 제어 값                        |
| `defaultChecked`  | `boolean`                  | `false`   | 비제어 초기값                  |
| `onCheckedChange` | `(checked) => void`        | —         |                                |
| `disabled`        | `boolean`                  | `false`   |                                |
| `label`           | `ReactNode`                | —         |                                |
| `description`     | `ReactNode`                | —         | 부가 설명                      |
| `className`       | `string`                   | —         |                                |
| …                 | `Checkbox` primitive attrs | —         | `name`, `value`, `required` 등 |

### 사용 예

```tsx
'use client';

import { useState } from 'react';
import { CheckBox } from '@/components/common/CheckBox';

const [checked, setChecked] = useState(false);

<CheckBox
  checked={checked}
  onCheckedChange={setChecked}
  label="체크박스"
  description="부가적인 설명이 들어갑니다."
/>

// 크기
<CheckBox size="medium" label="체크박스" description="부가적인 설명이 들어갑니다." />

// 비활성
<CheckBox disabled label="체크박스" description="부가적인 설명이 들어갑니다." />
<CheckBox disabled defaultChecked label="체크박스" description="부가적인 설명이 들어갑니다." />

// 라벨 없이 단독 사용
<CheckBox checked={checked} onCheckedChange={setChecked} />
```

---

## Radio

그룹 안에서 하나만 고르는 라디오. 원 + 라벨 + 설명입니다.

### Props

**RadioGroup**

| prop            | type                  | default   | 설명               |
| --------------- | ---------------------- | --------- | ------------------ |
| `size`          | `'large' \| 'medium'` | `'large'` | 그룹 전체에 적용   |
| `value`         | `string`              | —         | 제어 선택값        |
| `defaultValue`  | `string`              | —         | 비제어 초기 선택값 |
| `onValueChange` | `(value) => void`     | —         |                    |
| `disabled`      | `boolean`             | `false`   | 그룹 전체 비활성   |
| `className`     | `string`              | —         |                    |

**Radio**

| prop          | type        | default | 설명                          |
| ------------- | ----------- | ------- | ----------------------------- |
| `value`       | `string`    | —       | 항목 값 (필수)                |
| `label`       | `ReactNode` | —       |                               |
| `description` | `ReactNode` | —       | 부가 설명                     |
| `disabled`    | `boolean`   | `false` | 항목 단위. 선택+비활성도 가능 |
| `className`   | `string`    | —       |                               |

### 사용 예

```tsx
import { Radio, RadioGroup } from '@/components/common/RadioGroup';

<RadioGroup value={value} onValueChange={setValue} size="large">
  <Radio
    value="a"
    label="라디오버튼"
    description="부가적인 설명이 들어갑니다."
  />
  <Radio value="b" label="라디오버튼" description="..." />
  <Radio value="c" label="라디오버튼" description="..." disabled />
</RadioGroup>;
```

선택+비활성은 그룹 `value`를 그 항목에 두고 `disabled`를 줍니다.

---

## Dialog

오버레이 위 패널. 화면 종류(`login` 등)로 나누지 않고 Header / Body / Footer 슬롯만 둡니다. 오버레이 클릭과 ESC로는 닫히지 않고, 푸터 버튼으로만 닫습니다.

### Props

**Dialog**

| prop                      | type             | default | 설명                   |
| ------------------------- | ----------------- | ------- | ---------------------- |
| `open`                    | `boolean`        | —       | 제어 열림              |
| `onOpenChange`            | `(open) => void` | —       |                        |
| `disablePointerDismissal` | `boolean`        | `true`  | 오버레이 클릭으로 닫기 |

**DialogHeader**

| prop          | type        | default | 설명                       |
| ------------- | ----------- | ------- | -------------------------- |
| `icon`        | `ReactNode` | —       | 있으면 gray-100 박스에 32px |
| `title`       | `ReactNode` | —       |                            |
| `description` | `ReactNode` | —       |                            |

**DialogBody** / **DialogFooter** — `className`과 children. 푸터 버튼은 가로로 균등 분배됩니다.

**DialogContent** — 너비는 `className`으로 화면마다 지정합니다. 지정하지 않으면 내용 너비(`w-max`)를 따릅니다.

### 사용 예

```tsx
import { Button } from '@/components/common/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/common/Dialog';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="w-100">
    <DialogHeader
      title="로그인 후 참여할 수 있어요"
      description="로그인 후 이용할 수 있어요."
    />
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        둘러보기
      </Button>
      <Button onClick={() => setOpen(false)}>로그인하기</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

---

## Input

아이콘을 옵션으로 붙일 수 있는 텍스트 입력.

### Props

| prop        | type                                  | default     | 설명                                                                                |
| ----------- | --------------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `state`     | `'default' \| 'error' \| 'completed'` | `'default'` | 테두리 색으로 상태 표시                                                             |
| `size`      | `'small' \| 'medium' \| 'large'`      | `'medium'`  |                                                                                     |
| `icon`      | `ReactNode`                           | —           | 오른쪽 안쪽 아이콘                                                                  |
| `disabled`  | `boolean`                             | `false`     |                                                                                     |
| `className` | `string`                              | —           |                                                                                     |
| …           | `input` attrs                         | —           | `value`, `onChange` 등 (단, `size`는 variant 전용이라 HTML `size` 속성으로는 못 씀) |

### 사용 예

```tsx
import { Input } from '@/components/common/Input';

// 기본
<Input placeholder="입력하세요" />

// 상태 / 크기
<Input state="error" size="small" placeholder="에러" />
<Input state="completed" placeholder="완료" />

// 아이콘
<Input icon={<img src="/icons/search.svg" alt="" aria-hidden />} placeholder="검색" />

// disabled
<Input disabled placeholder="비활성" />
```

---

## Toggle

ON/OFF 텍스트가 함께 표시되는 스위치. 제어 컴포넌트이므로 `checked`는 필수입니다.

### Props

| prop              | type                         | default | 설명           |
| ----------------- | ----------------------------- | ------- | -------------- |
| `checked`         | `boolean`                    | —       | 제어 값 (필수) |
| `onCheckedChange` | `(checked: boolean) => void` | —       |                |
| `disabled`        | `boolean`                    | `false` |                |
| `label`           | `string`                     | —       | 오른쪽 라벨    |

### 사용 예

```tsx
'use client';

import { useState } from 'react';
import { Toggle } from '@/components/common/Toggle';

const [checked, setChecked] = useState(false);

<Toggle checked={checked} onCheckedChange={setChecked} label="알림 받기" />

// disabled
<Toggle checked={false} disabled />
```

---

## Textarea

여러 줄 텍스트 입력. 스타일은 `Input`과 같은 `inputVariants`를 씁니다. 높이만 내용에 맞게 늘어나며(`min-h-27`), 사용자 리사이즈는 막아 두었습니다(`resize-none`).

### Props

| prop        | type                                  | default     | 설명                                                                   |
| ----------- | --------------------------------------- | ----------- | ------------------------------------------------------------------------ |
| `state`     | `'default' \| 'error' \| 'completed'` | `'default'` | 테두리 색으로 상태 표시                                                |
| `size`      | `'small' \| 'medium' \| 'large'`      | `'medium'`  | 패딩만 적용 (높이는 `min-h-27`로 고정, `className`으로 변경) |
| `disabled`  | `boolean`                             | `false`     |                                                                        |
| `className` | `string`                              | —           |                                                                        |
| …           | `textarea` attrs                      | —           | `value`, `onChange`, `rows` 등                                         |

### 사용 예

```tsx
import { Textarea } from '@/components/common/Textarea';

<Textarea placeholder="내용을 입력하세요" />

// 상태
<Textarea state="error" placeholder="에러" />
```

---

## FileUpload

파일을 드래그하거나 클릭해서 고르는 점선 영역. 안쪽에 투명한 `<input type="file">`이 영역 전체를 덮고 있어 클릭으로 선택할 수 있고, 드롭은 직접 처리합니다(드래그 중 테두리 강조, 드롭한 파일을 input에 넣고 `change`를 발생시켜 클릭 선택과 같은 `onChange`로 받음. `multiple`이 아니면 첫 파일만). 선택된 파일 표시·형식/용량 검사는 이 컴포넌트가 하지 않고, 사용하는 쪽에서 `onChange`로 처리한 뒤 결과를 `FileUploadItem`으로 보여줍니다.

### Props

| prop                 | type                   | default            | 설명                                                 |
| --------------------- | ------------------------ | -------------------- | ----------------------------------------------------- |
| `title`              | `ReactNode`            | —                  | 안내 문구 (필수)                                     |
| `description`        | `ReactNode`            | —                  | 제목 아래 보조 문구 (지원 형식·용량 등)              |
| `icon`               | `ReactNode`            | 업로드 구름 아이콘 | 상단 아이콘                                          |
| `state`              | `'default' \| 'error'` | `'default'`        | `error`면 점선 테두리가 빨간색                       |
| `accept`             | `string`               | —                  | 허용 형식. 예: `image/png,image/jpeg`                |
| `multiple`           | `boolean`              | `false`            |                                                      |
| `disabled`           | `boolean`              | `false`            |                                                      |
| `containerClassName` | `string`               | —                  | 점선 영역(바깥 `label`) 클래스                       |
| `className`          | `string`               | —                  | 안쪽 `input` 클래스                                  |
| …                    | `input` attrs          | —                  | `id`, `name`, `onChange` 등 (`type`은 `file`로 고정) |

### 사용 예

```tsx
import { FileUpload } from '@/components/common/FileUpload';

<FileUpload
  id="project-image"
  name="image"
  accept="image/png,image/jpeg"
  title="파일을 이곳으로 드래그하거나 클릭하여 업로드하세요"
  description="PNG, JPG 형식 지원 · 파일당 최대 5MB (최대 1개)"
/>;
```

---

## FileUploadItem

`FileUpload`로 고른 파일 한 개를 보여주는 행. 형식·용량 위반처럼 파일 자체가 잘못됐을 때는 `state="error"`와 `errorMessage`로 행 안에 바로 안내합니다. 필수값이 비어 있는 것 같은 필드 단위 에러는 `FileUpload`의 `state`(점선 테두리)만으로 표시합니다.

### Props

| prop           | type                   | default     | 설명                                    |
| -------------- | ------------------------ | ------------- | ----------------------------------------- |
| `label`        | `ReactNode`            | —           | 파일명 등 표시할 내용 (필수)            |
| `state`        | `'default' \| 'error'` | `'default'` | 테두리 색과 안내 문구 표시 여부         |
| `errorMessage` | `ReactNode`            | —           | `state="error"`일 때만 구분선 아래 표시 |
| `onRemove`     | `() => void`           | —           | 삭제 버튼 클릭 시 호출                  |
| `className`    | `string`               | —           |                                         |

### 사용 예

```tsx
import { FileUploadItem } from '@/components/common/FileUpload';

// 정상 선택
<FileUploadItem label="AI-Biz_Logo.png [PNG, 4MB]" onRemove={() => {}} />

// 에러
<FileUploadItem
  label="AI-Biz_Logo.png [PNG, 24MB]"
  state="error"
  errorMessage={
    <>
      등록 가능한 파일 용량을 초과했어요.
      <br />
      이미지는 파일당 최대 5MB까지 등록할 수 있어요.
    </>
  }
  onRemove={() => {}}
/>;
```

---

## Pagination

페이지 번호와 이전/다음 버튼으로 구성된 페이지네이션입니다. (구현 추가 예정)

### Props

| prop           | type                     | default | 설명                       |
| -------------- | -------------------------- | ------- | --------------------------- |
| `page`         | `number`                 | —       | 현재 페이지 (필수)         |
| `totalPages`   | `number`                 | —       | 전체 페이지 수 (필수)      |
| `onPageChange` | `(page: number) => void` | —       | 페이지 변경 시 호출 (필수) |
| `className`    | `string`                 | —       | 추가 클래스                |

### 사용 예

```tsx
'use client';

import { useState } from 'react';
import { Pagination } from '@/components/common/Pagination';

const [page, setPage] = useState(1);
const totalPages = 5;

{
  resultCount > 0 && (
    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
  );
}
```

이전/다음 버튼은 각각 `page`가 1 이하, `totalPages` 이상일 때 자동으로 비활성화됩니다.

---