import DOMPurify from 'isomorphic-dompurify';

/**
 * 에디터(Quill)가 만든 HTML을 저장 전 서버에서 다시 sanitize합니다. 관리자 계정이
 * 탈취되거나 악의적인 입력이 들어와도, 공개 /news/[id] 페이지가 dangerouslySetInnerHTML로
 * 그대로 렌더링하기 때문에 script/on* 속성 등을 여기서 반드시 제거해야 합니다.
 */
export function sanitizeNewsContent(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's',
      'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img', 'span',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'width', 'height', 'style', 'class'],
  });
}
