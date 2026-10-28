'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common/Input';
import { loginFormSchema, type LoginFormValues } from '@/lib/admin/schemas/login';

import { AdminButton as Button } from '@/components/domain/admin/shared/AdminButton';

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setSubmitError(data.error ?? '로그인에 실패했습니다.');
      return;
    }

    router.push('/admin/news');
    router.refresh();
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-350 bg-white p-8 sm:p-10"
      >
        <h1 className="text-h4 mb-8 text-center">관리자 로그인</h1>

        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="이메일"
            autoComplete="username"
            state={submitError ? 'error' : 'default'}
            {...register('email')}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            state={submitError ? 'error' : 'default'}
            {...register('password')}
          />
        </div>

        {submitError && (
          <p className="mt-3 text-system-alert">{submitError}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full justify-center"
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </div>
  );
}
