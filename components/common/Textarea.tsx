'use client';

import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';

import { inputVariants } from '@/components/common/Input';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, size, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          inputVariants({ state, size }),
          'h-auto min-h-27 resize-none py-2',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
