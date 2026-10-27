import { cn } from '@/lib/utils';

interface PageSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export default function PageSection({
  eyebrow,
  title,
  description,
  className,
  children,
}: PageSectionProps) {
  return (
    <section
      className={cn('border-gray-300 py-10 lg:py-12', className)}
    >
      {eyebrow || title || description ? (
        <div className="mb-10 lg:mb-20">
          {eyebrow ? (
            <p className="text-small text-black mb-5 font-bold">{eyebrow}</p>
          ) : null}
          {title ? (
            <h2 className={"text-h4 lg:text-h2 text-black mb-5"}>
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="text-body max-w-2xl whitespace-pre-line text-gray-750">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
