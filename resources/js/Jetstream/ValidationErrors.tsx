import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default function JetValidationErrors({
  className,
}: {
  className?: string;
}) {
  const { props } = usePage();
  const { errors } = props;
  const hasErrors = Object.keys(errors).length > 0;

  if (!hasErrors) {
    return null;
  }

  return (
    <div className={className}>
      <div className="font-medium text-red-600">
     
      </div>

      <ul className="mt-3 list-disc list-inside text-sm text-red-600 text-center">
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key]}</p>
        ))}
      </ul>
    </div>
  );
}
