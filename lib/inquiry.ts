'use server';

import { buildContactInquiryEmail, type InquiryType } from '@/lib/email/contact-inquiry';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';
import { getResendClient } from '@/lib/resend';

const INQUIRY_LIMIT = 5;
const INQUIRY_WINDOW_MS = 10 * 60 * 1000;

export interface InquiryFormValues {
  company: string;
  contact: string;
  email: string;
  inquiryType: string;
  title: string;
  content: string;
  privacyAgree: boolean;
}

export interface InquiryFormState {
  error?: string;
  success?: boolean;
  values?: InquiryFormValues;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_PATTERN = /^[0-9]+$/;
const MAX_FIELD_LENGTH = 200;
const MAX_CONTENT_LENGTH = 5000;

function readInquiryForm(formData: FormData): InquiryFormValues {
  return {
    company: String(formData.get('company') ?? '').trim(),
    contact: String(formData.get('contact') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    inquiryType: String(formData.get('inquiryType') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    content: String(formData.get('content') ?? '').trim(),
    privacyAgree: Boolean(formData.get('privacyAgree')),
  };
}

export async function submitInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const values = readInquiryForm(formData);
  const { company, contact, email, inquiryType, title, content, privacyAgree } = values;

  const ip = await getClientIp();
  if (isRateLimited(`inquiry:${ip}`, INQUIRY_LIMIT, INQUIRY_WINDOW_MS)) {
    return { error: '잠시 후 다시 시도해주세요.', values };
  }

  if (!company || !contact || !email || !title || !content) {
    return { error: '필수 항목을 모두 입력해주세요.', values };
  }

  if (!CONTACT_PATTERN.test(contact)) {
    return { error: '연락처는 숫자만 입력해주세요.', values };
  }

  if (inquiryType !== 'product' && inquiryType !== 'partnership') {
    return { error: '문의유형을 선택해주세요.', values };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: '올바른 이메일 형식을 입력해주세요.', values };
  }

  if (
    company.length > MAX_FIELD_LENGTH ||
    contact.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH ||
    title.length > MAX_FIELD_LENGTH
  ) {
    return { error: '입력값의 길이가 깁니다. 다시 확인해주세요.', values };
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    return { error: '문의 내용의 길이가 깁니다. 다시 확인해주세요.', values };
  }

  if (!privacyAgree) {
    return { error: '개인정보 수집 및 이용에 동의해주세요.', values };
  }

  const receiver = process.env.EMAIL_USER;
  if (!receiver) {
    console.error('EMAIL_USER 환경변수가 설정되지 않았습니다.');
    return { error: '메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.', values };
  }

  const { subject, html } = buildContactInquiryEmail({
    company,
    contact,
    email,
    inquiryType: inquiryType as InquiryType,
    title,
    content,
  });

  // TODO: 이메일 생성 후, 브릭스텍 메일 주소 변경
  const { error } = await getResendClient().emails.send({
    from: 'BRIXTECHBIO <onboarding@resend.dev>',
    to: [receiver],
    replyTo: email,
    subject,
    html,
  });

  if (error) {
    console.error('문의 메일 전송 실패:', error);
    return { error: '메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.', values };
  }

  return { success: true };
}
