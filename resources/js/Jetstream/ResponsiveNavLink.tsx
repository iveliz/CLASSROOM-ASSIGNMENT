import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props =
  | {
      as: 'button';
      active?: boolean;
      href?: undefined;
    }
  | {
      active?: boolean;
      href: string;
    };

export default function JetResponsiveNavLink({
  active,
  href,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const classes = active
    ? 'block pl-3 pr-4 py-2 border-l-4 border-sky-900 text-white font-medium text-indigo-700 bg-cyan-600 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition'
    : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-white font-medium text-gray-600 hover:text-gray-800 hover:bg-cyan-600 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:bg-cyan-500 transition';

  return (
    <div>
      {'as' in props && props.as === 'button' ? (
        <button className={classNames('w-full text-left', classes)}>
          {children}
        </button>
      ) : (
        <InertiaLink href={href || ''} className={classes}>
          {children}
        </InertiaLink>
      )}
    </div>
  );
}
