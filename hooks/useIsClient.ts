import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

/**
 * 서버 렌더(및 하이드레이션 이전 첫 클라이언트 렌더)에서는 false, 하이드레이션이 끝난
 * 이후에는 true를 반환합니다. dnd-kit처럼 내부적으로 렌더마다 달라질 수 있는 값을 쓰는
 * 라이브러리의 속성/스타일을 하이드레이션 비교 대상에서 제외하고 싶을 때 씁니다.
 * useEffect + setState로 "마운트 여부"를 흉내 내는 대신, 이펙트 밖에서 동기적으로
 * 판단할 수 있는 useSyncExternalStore를 씁니다.
 */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
