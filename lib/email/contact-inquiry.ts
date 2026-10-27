export type InquiryType = 'product' | 'partnership';

export interface ContactInquiryData {
  company: string;
  contact: string;
  email: string;
  inquiryType: InquiryType;
  title: string;
  content: string;
}

const INQUIRY_TYPE_LABEL: Record<InquiryType, string> = {
  product: '제품 문의',
  partnership: '사업 제휴 문의',
};

const COLOR_PRIMARY_2 = '#173026';
const COLOR_GRAY_50 = '#fafafa';
const COLOR_GRAY_300 = '#e2e2e2';
const COLOR_TEXT_SUB = '#5f5f5f';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith('02')) {
    if (digits.length === 9) return digits.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    if (digits.length === 10) return digits.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    return value;
  }

  if (digits.length === 10) return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

  return value;
}

function infoRow(label: string, value: string, isLast: boolean) {
  return `
    <tr>
      <td style="width:120px;padding:16px 20px;background:${COLOR_GRAY_50};border-bottom:${isLast ? 'none' : `1px solid ${COLOR_GRAY_300}`};font-weight:600;color:#171717;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:16px 20px;border-bottom:${isLast ? 'none' : `1px solid ${COLOR_GRAY_300}`};color:${COLOR_TEXT_SUB};vertical-align:top;">${escapeHtml(value)}</td>
    </tr>
  `;
}

export function buildContactInquiryEmail(data: ContactInquiryData) {
  const inquiryTypeLabel = INQUIRY_TYPE_LABEL[data.inquiryType] ?? data.inquiryType;
  const subject = `[${inquiryTypeLabel}] ${data.title}`;
  const contentHtml = escapeHtml(data.content).replace(/\n/g, '<br/>');

  const html = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="utf-8" />
    </head>
    <body style="margin:0;padding:32px 16px;background:#f3f3f3;font-family:'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:36px 32px 24px;border-bottom:1px solid ${COLOR_GRAY_300};">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.05em;color:#1e9d70;">CONTACT</p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:${COLOR_PRIMARY_2};">새로운 문의를 확인해주세요.</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid ${COLOR_PRIMARY_2};border-bottom:1px solid ${COLOR_GRAY_300};">
              ${infoRow('문의유형', inquiryTypeLabel, false)}
              ${infoRow('회사명', data.company, false)}
              ${infoRow('연락처', formatPhoneNumber(data.contact), false)}
              ${infoRow('이메일', data.email, false)}
              ${infoRow('제목', data.title, true)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 36px;">
            <p style="margin:0 0 10px;font-size:15px;font-weight:600;color:${COLOR_PRIMARY_2};">문의 내용</p>
            <div style="padding:20px;background:${COLOR_GRAY_50};border:1px solid ${COLOR_GRAY_300};border-radius:12px;font-size:14px;line-height:1.7;color:#171717;white-space:pre-wrap;">${contentHtml}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 28px;border-top:1px solid ${COLOR_GRAY_300};">
            <p style="margin:0;font-size:12px;color:#a0a0a0;">이 메일에 회신하면 고객의 이메일(${escapeHtml(data.email)})로 바로 전송됩니다.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  return { subject, html };
}
