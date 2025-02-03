import Link from 'next/link';
import React, { ReactNode } from 'react';
import s from './app-link.module.scss';
import { UrlObject } from 'url';

export function AppLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string | UrlObject;
}) {
  return (
    <Link className={s.root} href={href}>
      {children}
    </Link>
  );
}
