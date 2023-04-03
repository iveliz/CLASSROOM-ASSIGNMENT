import React, { PropsWithChildren } from 'react';

export default function JetAuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="min-w-full sm:justify-center items-center sm:pt-0 bg-gray-100 mx-4">

      <div className="w-full mt-6 px-8 py-4 bg-white shadow-md sm:rounded-lg">
        <div className='sm:justify-center items-center flex flex-col mb-6'>
        </div>

        {children}
      </div>
    </div>
  );
}
