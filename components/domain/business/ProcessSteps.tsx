import Image from 'next/image';

import type { ProcessStep } from '@/types/business';

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5 lg:gap-x-8">
      {steps.map((step, index) => (
        <div key={index}>
          <div className="relative mb-5 aspect-square w-full overflow-hidden bg-gray-100">
            {step.image ? (
              <Image
                src={step.image}
                alt={step.label}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <p className="text-h5 text-black mb-2 font-bold">{step.label}</p>
          <div className="mb-3 border-t border-gray-300" />
          <p className="text-body text-text-sub leading-6">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
