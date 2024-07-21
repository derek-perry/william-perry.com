import { FC, useState } from 'react';
import NavigationDropdown from './components/NavigationDropdown';

interface INavMenuProps {
  className?: string;
}

const NavMenu: FC<INavMenuProps> = ({ className }): JSX.Element => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : 'https://william-perry.com';
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => setDropdown(!dropdown);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      toggleDropdown();
    };
  };
  return (
    <div className='order-2 flex gap-x-2 shrink-0'>
      <a
        title='Menu'
        tabIndex={0}
        aria-hidden='true'
        className='relative flex align-middle justify-center items-middle text-wpRed hover:text-wpRedLight no-underline hover:underline focus:no-underline cursor-pointer'
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <span
          className='max-[365px]:hidden mr-2 mt-0.5 inline font-extrabold'
        >
          Menu
        </span>
        <img src={(siteUrl + '/menu.svg')} alt='' aria-hidden='true' height={34} width={34} />
      </a>
      {dropdown && <NavigationDropdown onClose={setDropdown} />}
    </div>
  );
};

export default NavMenu;