import { Button, type ButtonProps } from '@/components/common/Button';
import { cn } from '@/lib/utils';

export function AdminButton({
  className,
  render,
  variant,
  ...props
}: ButtonProps) {
  const isPrimary = !variant || variant === 'primary';

  return (
    <Button
      render={render}
      variant={variant}
      nativeButton={render ? false : undefined}
      className={cn(isPrimary && 'bg-primary-2 hover:brightness-110', className)}
      {...props}
    />
  );
}
