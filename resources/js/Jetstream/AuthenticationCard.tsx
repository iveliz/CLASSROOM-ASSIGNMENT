import React, { PropsWithChildren } from 'react';
import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';

export default function JetAuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md sm:rounded-lg">
        <div className='sm:justify-center items-center flex flex-col mb-6'>
        <JetAuthenticationCardLogo />
        </div>
      
        {children}
      </div>
    </div>
  );
}
