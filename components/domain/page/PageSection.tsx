interface PageSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageSection({ eyebrow, title, description, children }: PageSectionProps) {
  return (
    <section className="border-gray-300 border-t py-10 first:border-t-0 lg:py-12">
      {eyebrow ? (
        <p className="text-small text-black mb-4 font-bold lg:mb-8">{eyebrow}</p>
      ) : null}
      {title ? (
        <h2 className={`text-h4 lg:text-h2 text-black ${description ? 'mb-5' : 'mb-8 lg:mb-10'}`}>
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="text-body mb-10 max-w-2xl whitespace-pre-line text-gray-750 lg:mb-20">
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}
