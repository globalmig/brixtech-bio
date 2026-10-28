'use client';

import { useActionState, useState } from 'react';

import { Button } from '@/components/common/Button';
import { CheckBox } from '@/components/common/CheckBox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/common/Dialog';
import { Input } from '@/components/common/Input';
import { Radio, RadioGroup } from '@/components/common/RadioGroup';
import { Textarea } from '@/components/common/Textarea';

import { submitInquiry, type InquiryFormState } from '@/lib/inquiry';

const fieldClassName =
  'h-auto rounded-[10px] border border-transparent bg-gray-50 p-5 text-base placeholder:text-gray-750 focus-visible:border-primary';

const labelClassName = 'text-text-default text-2xl font-semibold';

function RequiredMark() {
  return <span className="text-primary">*</span>;
}

const initialState: InquiryFormState = {};

export default function InquiryForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const [dismissedState, setDismissedState] = useState<InquiryFormState | null>(null);
  const resultDialogOpen = Boolean(state.success || state.error) && state !== dismissedState;

  return (
    <form action={formAction} className="mx-auto flex w-full max-w-240 flex-col gap-10">
      <div className="flex flex-col gap-2">
        <label htmlFor="company" className={labelClassName}>
          회사명 <RequiredMark />
        </label>
        <Input
          id="company"
          name="company"
          placeholder="회사명을 입력해주세요."
          defaultValue={state.values?.company}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact" className={labelClassName}>
          연락처 <RequiredMark />
        </label>
        <Input
          id="contact"
          name="contact"
          inputMode="numeric"
          placeholder="연락처를 입력해주세요. (숫자만)"
          defaultValue={state.values?.contact}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
          }}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClassName}>
          이메일 <RequiredMark />
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          defaultValue={state.values?.email}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className={labelClassName}>
          문의유형 <RequiredMark />
        </span>
        <RadioGroup
          name="inquiryType"
          defaultValue={state.values?.inquiryType || 'product'}
          size="medium"
          className="flex-row gap-6"
        >
          <Radio value="product" label="제품 문의" />
          <Radio value="partnership" label="사업 제휴 문의" />
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className={labelClassName}>
          제목 <RequiredMark />
        </label>
        <Input
          id="title"
          name="title"
          placeholder="제목을 입력해주세요."
          defaultValue={state.values?.title}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className={labelClassName}>
          내용 <RequiredMark />
        </label>
        <Textarea
          id="content"
          name="content"
          placeholder="내용을 입력해주세요."
          defaultValue={state.values?.content}
          className={`min-h-42 ${fieldClassName}`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="attachment" className={labelClassName}>
          첨부파일
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          className="text-text-sub w-full rounded-[10px] bg-gray-50 p-5 text-base file:mr-4 file:cursor-pointer file:rounded-lg file:border file:border-border-default file:bg-white file:px-4 file:py-1.5 file:text-base file:font-medium file:text-text-default"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="privacy-agree" className={labelClassName}>
          개인정보 수집 및 이용 동의 <RequiredMark />
        </label>
        <div className="text-text-sub rounded-[10px] bg-gray-50 px-5 py-4 text-base leading-6">
          <p>[개인정보 수집 및 이용 동의]</p>
          <p className="mt-3">
            브릭스텍바이오는 홈페이지 문의 접수 및 처리를 위하여 다음과 같이 개인정보를 수집 및
            이용합니다.
          </p>
          <ul className="mt-3 list-disc pl-5">
            <li>수집 및 이용 목적 : 제품 문의 접수 및 답변, 고객 상담 등</li>
            <li>필수 항목 : 연락처, 이메일, 문의 제목, 문의 내용</li>
            <li>선택항목 : 첨부파일</li>
            <li>보유 및 이용 기간 : 개인정보 처리방침에서 정한 기간</li>
          </ul>
          <p className="mt-3">
            정보주체는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
            <br />
            다만 필수항목에 대한 동의를 거부하는 경우, 홈페이지를 통한 문의 접수가 제한될 수
            있습니다.
          </p>
        </div>
        <CheckBox
          id="privacy-agree"
          name="privacyAgree"
          size="medium"
          defaultChecked={state.values?.privacyAgree}
          label="[필수] 개인정보 수집 및 이용에 동의합니다."
        />
      </div>

      <Button
        type="submit"
        size="medium"
        disabled={isPending}
        className="self-end rounded-full px-7.5"
      >
        {isPending ? '발송 중...' : '문의하기'}
      </Button>

      <Dialog
        open={resultDialogOpen}
        onOpenChange={(open) => {
          if (!open) setDismissedState(state);
        }}
      >
        <DialogContent className="w-100">
          <DialogHeader
            title={state.success ? '문의가 정상적으로 접수되었습니다. 빠르게 답변드리겠습니다.' : state.error}
          />
          <DialogFooter>
            <Button type="button" onClick={() => setDismissedState(state)}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
