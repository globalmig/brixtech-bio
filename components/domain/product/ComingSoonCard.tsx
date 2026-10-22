interface ComingSoonCardProps {
  title?: string;
  description?: string;
  size?: 'default' | 'large';
}

export default function ComingSoonCard({
  title = 'Coming Soon',
  description = '라인업을 준비중입니다.',
  size = 'default',
}: ComingSoonCardProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center lg:py-24">
      <p
        className={`text-primary-2 font-bold ${
          size === 'large' ? 'text-h4 lg:text-h2' : 'text-h5 lg:text-h4'
        }`}
      >
        {title}
      </p>
      <p className="text-small lg:text-[1rem] text-text-info mt-3">
        {description}
      </p>
    </div>
  );
}
