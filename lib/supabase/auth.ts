import { cache } from 'react';

import { createClient } from './server';

/**
 * admin/layout.tsx와 각 Server Action의 requireAdminUser()가 요청 1건 안에서
 * 중복으로 getUser()를 호출하지 않도록 React cache()로 감쌉니다.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
