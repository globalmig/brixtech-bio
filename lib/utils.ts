import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function htmlToSummary(html: string, maxLength = 200) {
  const text = stripHtml(html);
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

/** 임의 텍스트를 h2/h3 등에 쓸 수 있는 id용 slug로 변환합니다. */
export function slugify(text: string) {
  const slug = stripHtml(text)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '');
  return slug || 'heading';
}

/** 본문 HTML(Quill 등) 안의 h2/h3에 텍스트 기반 id를 부여합니다. 이미 id가 있으면 건너뜁니다. */
export function addHeadingIds(html: string) {
  const counts = new Map<string, number>();

  return html.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, inner) => {
    if (/\sid=/.test(attrs)) return match;

    const base = slugify(inner);
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    const id = count > 1 ? `${base}-${count}` : base;

    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
}
