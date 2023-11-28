import { FC } from 'react';
import Link from 'next/link';

interface IButtonInternalProps {
  href: string;
  title: string;
  children?: JSX.Element[] | JSX.Element | string;
  className?: string;
};

const ButtonInternal: FC<IButtonInternalProps> = ({
  href,
  title,
  children,
  className
}): JSX.Element => {
  const linkBase = process.env.NEXT_PUBLIC_SITE_URL || ""

  return (
    <Link href={linkBase + '/' + href || './' + href} title={title} className={"w-max m-auto rounded text-wpWhite bg-wpRed focus:bg-wpRedDark hover:bg-wpRedLight py-4 px-6 text-2xl transition-all motion-reduce:transition-none motion-reduce:hover:transform-none " + className}>
      {children}
    </Link>
  );
};

export default ButtonInternal;