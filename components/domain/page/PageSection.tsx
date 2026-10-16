interface PageSectionProps {
  title?: string;
  children: React.ReactNode;
}

export default function PageSection({ title, children }: PageSectionProps) {
  return (
    <section className="border-gray-300 border-t py-10 first:border-t-0 lg:py-12">
      {title ? (
        <h2 className="text-h5 lg:text-h4 text-primary-2 mb-5 font-bold">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}
