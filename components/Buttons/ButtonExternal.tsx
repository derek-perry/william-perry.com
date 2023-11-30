import { FC } from 'react';
import Link from 'next/link';

interface IButtonExternalProps {
  href: string;
  title: string;
  children?: JSX.Element[] | JSX.Element | string;
  className?: string;
};

const ButtonExternal: FC<IButtonExternalProps> = ({
  href,
  title,
  children,
  className
}): JSX.Element => {
  return (
    <Link href={href} title={title} target="_blank" rel="noopener noreferrer" className={"w-max m-auto rounded text-wpWhite focus:text-wpWhite hover:text-wpWhite bg-wpRed focus:bg-wpRedDark hover:bg-wpRedLight py-4 px-6 text-2xl transition-all motion-reduce:transition-none motion-reduce:hover:transform-none " + className}>
      {children}
    </Link>
  );
};

export default ButtonExternal;