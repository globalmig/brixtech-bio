import sanitizeHtml from 'sanitize-html';

/**
 * 에디터(Quill)가 만든 HTML을 저장 전 서버에서 다시 sanitize합니다. 관리자 계정이
 * 탈취되거나 악의적인 입력이 들어와도, 공개 /news/[id] 페이지가 dangerouslySetInnerHTML로
 * 그대로 렌더링하기 때문에 script/on* 속성 등을 여기서 반드시 제거해야 합니다.
 *
 * jsdom 기반 isomorphic-dompurify는 하위 의존성(whatwg-url, cssstyle 등)이 계속
 * ESM 전용 패키지를 끌어와 Vercel 서버리스 런타임에서 ERR_REQUIRE_ESM으로 깨졌기
 * 때문에, 순수 JS 구현체인 sanitize-html로 교체했습니다.
 */
export function sanitizeNewsContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's',
      'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img', 'span',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel', 'style', 'class'],
      img: ['src', 'alt', 'width', 'height', 'style', 'class'],
      '*': ['style', 'class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
}
