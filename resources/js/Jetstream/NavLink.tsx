import { InertiaLink } from '@inertiajs/inertia-react';
import React, { PropsWithChildren } from 'react';

interface Props {
  href: string;
  active?: boolean;
}

export default function JetNavLink({
  active,
  href,
  children,
}: PropsWithChildren<Props>) {
  const classes = active
    ? 'inline-flex items-center px-1 pt-1 border-b-4 border-purple-50 text-sm font-medium leading-5 text-white focus:outline-none focus:border-indigo-700 transition'
    : 'inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-white hover:text-white hover:border-transparent focus:outline-none focus:text-white focus:border-transparent transition';

  return (
    <InertiaLink href={href} className={classes}>
      {children}
    </InertiaLink>
  );
}
