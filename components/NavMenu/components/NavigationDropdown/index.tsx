import { FC, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import LinkInternal from '../../../Links/LinkInternal';
import { useOnEventOutside } from '../../../../hooks/useOnEventOutside';

export interface INavigationItem {
  title: string;
  description?: string;
  icon: any;
  href: string;
  onClick?: (arg?: any) => any;
};

const navLinksMenu = [
  { title: 'Home', href: '' },
  { title: 'Biography', href: 'about' },
  { title: 'Calendar', href: 'calendar' },
  { title: 'Photos', href: 'photos' },
  { title: 'Recordings', href: 'recordings' },
  { title: 'Projects', href: 'projects' },
  { title: 'Teaching Philosophy', href: 'teaching-philosophy' },
  { title: 'Contact', href: 'contact' }
];

interface INavigationDropdownProps {
  onClose: (value: boolean) => void;
  className?: string;
};

export const NavigationDropdown: FC<INavigationDropdownProps> = ({
  onClose,
  className
}): JSX.Element => {
  const ref = useRef(null);

  const handleScrollOutside = (): void => {
    onClose(false);
  };

  useOnClickOutside(ref, handleScrollOutside, 'mousedown');

  useOnEventOutside(ref, handleScrollOutside, 'scroll');

  return (
    <nav
      ref={ref}
      className='absolute z-50 right-7 mx-1 top-[74px] overflow-hidden rounded-lg bg-wpGrey shadow-lg'
    >
      <div className='flex flex-col'>
        <ul className='list-none flex flex-col'>
          {navLinksMenu.map((item) => (
            <li className='grow' key={item.title}>
              <LinkInternal title={item.title} href={item.href} className='py-3 px-3 max-sm:px-2 border-b border-wpGreyLight hover:bg-wpGrey flex text-sm leading-[18px] tracking-[0.01em] transition-all font-bold no-underline'>
                <p>
                  {item.title}
                </p>
              </LinkInternal>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationDropdown;
