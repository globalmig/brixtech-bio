'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer lg:text-[1.2rem] items-center justify-center whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_img]:pointer-events-none [&_img]:shrink-0',
  {
    variants: {
      variant: {
        primary: 
          'bg-primary [color:var(--color-gray-50)] disabled:bg-gray-200 disabled:[color:var(--color-gray-500)]',
        secondary:
          'bg-white [color:var(--color-primary)] border border-primary disabled:bg-gray-100 disabled:[color:var(--color-gray-500)] disabled:border-gray-300',
        outline:
          'bg-white [color:var(--color-gray-900)] border border-gray-400 hover:border-gray-600 active:bg-gray-300 active:border-gray-600 disabled:bg-gray-200 disabled:[color:var(--color-gray-500)] disabled:border-gray-300',
        blur: 'border-1 border-white bg-white/30 text-white backdrop-blur-xs'
      },
      size: {
        giant: 'gap-3 rounded-[12px] px-5 py-3 [&_svg]:size-6 [&_img]:size-6',
        large: 'gap-2 rounded-[12px] px-10 py-3 [&_svg]:size-6 [&_img]:size-6',
        medium:
          'gap-1.5 rounded-[10px] px-4 py-2.5 [&_svg]:size-5 [&_img]:size-5',
        small:
          'gap-1.5 rounded-[8px] px-2 py-1.5 [&_svg]:size-4 [&_img]:size-4',
      },
    },
    compoundVariants: [
      { variant: 'outline', size: 'giant', class: 'hover:bg-gray-200' },
      { variant: 'outline', size: 'large', class: 'hover:bg-gray-200' },
      { variant: 'outline', size: 'medium', class: 'hover:bg-gray-100' },
      { variant: 'outline', size: 'small', class: 'hover:bg-gray-100' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'large',
    },
  }
);

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;
type ResponsiveBreakpoint = 'base' | 'sm' | 'md' | 'lg';
type ResponsiveSize = Partial<Record<ResponsiveBreakpoint, ButtonSize>>;

const RESPONSIVE_SIZE_CLASSES: Record<ResponsiveBreakpoint, Record<ButtonSize, string>> = {
  base: {
    giant: 'gap-3 rounded-[12px] px-5 py-3 [&_svg]:size-6 [&_img]:size-6',
    large: 'gap-2 rounded-[12px] px-10 py-3 [&_svg]:size-6 [&_img]:size-6',
    medium: 'gap-1.5 rounded-[10px] px-4 py-2.5 [&_svg]:size-5 [&_img]:size-5',
    small: 'gap-1.5 rounded-[8px] px-5 py-2 [&_svg]:size-4 [&_img]:size-4',
  },
  sm: {
    giant: 'sm:gap-3 sm:rounded-[12px] sm:px-5 sm:py-3 sm:[&_svg]:size-6 sm:[&_img]:size-6',
    large: 'sm:gap-2 sm:rounded-[12px] sm:px-10 sm:py-3 sm:[&_svg]:size-6 sm:[&_img]:size-6',
    medium: 'sm:gap-1.5 sm:rounded-[10px] sm:px-4 sm:py-2.5 sm:[&_svg]:size-5 sm:[&_img]:size-5',
    small: 'sm:gap-1.5 sm:rounded-[8px] sm:px-5 sm:py-2 sm:[&_svg]:size-4 sm:[&_img]:size-4',
  },
  md: {
    giant: 'md:gap-3 md:rounded-[12px] md:px-5 md:py-3 md:[&_svg]:size-6 md:[&_img]:size-6',
    large: 'md:gap-2 md:rounded-[12px] md:px-10 md:py-3 md:[&_svg]:size-6 md:[&_img]:size-6',
    medium: 'md:gap-1.5 md:rounded-[10px] md:px-4 md:py-2.5 md:[&_svg]:size-5 md:[&_img]:size-5',
    small: 'md:gap-1.5 md:rounded-[8px] md:px-7 md:py-2.5 md:[&_svg]:size-4 md:[&_img]:size-4',
  },
  lg: {
    giant: 'lg:gap-3 lg:rounded-[12px] lg:px-5 lg:py-3 lg:[&_svg]:size-6 lg:[&_img]:size-6',
    large: 'lg:gap-2 lg:rounded-[12px] lg:px-10 lg:py-3 lg:[&_svg]:size-6 lg:[&_img]:size-6',
    medium: 'lg:gap-1.5 lg:rounded-[10px] lg:px-4 lg:py-2.5 lg:[&_svg]:size-5 lg:[&_img]:size-5',
    small: 'lg:gap-1.5 lg:rounded-[8px] lg:px-7 lg:py-2.5 lg:[&_svg]:size-4 lg:[&_img]:size-4',
  },
};

function resolveResponsiveSizeClassName(size: ResponsiveSize) {
  return (Object.entries(size) as [ResponsiveBreakpoint, ButtonSize][])
    .map(([breakpoint, value]) => RESPONSIVE_SIZE_CLASSES[breakpoint][value])
    .join(' ');
}

type ButtonProps = Omit<ButtonPrimitive.Props, 'size'> &
  Omit<VariantProps<typeof buttonVariants>, 'size'> & {
    size?: ButtonSize | ResponsiveSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

function Button({
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const isResponsiveSize = typeof size === 'object' && size !== null;

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size: isResponsiveSize ? undefined : size }),
        isResponsiveSize && resolveResponsiveSizeClassName(size),
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };