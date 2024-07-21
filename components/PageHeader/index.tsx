import { FC } from 'react';
import LinkInternal from '../Links/LinkInternal';
import NavMenu from '../NavMenu';

interface IPageHeaderProps {
  prevUrl?: string | null;
}

const PageHeader: FC<IPageHeaderProps> = ({
  prevUrl
}): JSX.Element => {
  return (
    <div className='bg-white w-full'>
      <header id='header' role='banner' className='border-b border-wpRed bg-wpWhite text-white py-3 text-lg w-full'>
        <div className='px-8 w-full max-w-[1076px] m-auto gap-x-4 gap-y-10 flex flex-row justify-between align-middle items-middle text-left'>
          <LinkInternal
            title='William Perry'
            href=''
            className='no-underline hover:!underline'
          >
            <p className='CormorantInfant text-2xl'><strong>William Perry</strong></p>
          </LinkInternal>
          <div className='max-[969px]:hidden mt-1 gap-7 flex flex-row justify-left align-middle items-middle text-left text-base'>
            <LinkInternal href='' title='Home' className='no-underline hover:!underline'>Home</LinkInternal>
            <LinkInternal href='lessons' title='Lessons' className='no-underline hover:!underline'>Lessons</LinkInternal>
            <LinkInternal href='repertoire' title='Repertoire' className='no-underline hover:!underline'>Repertoire</LinkInternal>
            <LinkInternal href='videos' title='Videos' className='no-underline hover:!underline'>Videos</LinkInternal>
            <LinkInternal href='calendar' title='Calendar' className='no-underline hover:!underline'>Calendar</LinkInternal>
            <LinkInternal href='about' title='About' className='no-underline hover:!underline'>About</LinkInternal>
            <LinkInternal href='contact' title='Contact' className='no-underline hover:!underline'>Contact</LinkInternal>
          </div>
          <div className='min-[969px]:hidden flex flex-row justify-left align-middle items-middle'><NavMenu /></div>
        </div>
      </header>
      {prevUrl && (prevUrl === 'http://localhost:3000/calendar' || prevUrl === 'https://william-perry.netlify.app/calendar' || prevUrl === 'https://william-perry.com/calendar') ? (
        <div
          className='pt-4 px-8 bg-white w-full max-w-[1076px] m-auto flex justify-left align-top items-left text-left text-lg'
        >
          <LinkInternal
            title='Back to Calendar'
            href='calendar'
          >
            &larr; Back to Calendar
          </LinkInternal>
        </div>
      ) : (
        (prevUrl && (prevUrl === 'http://localhost:3000/repertoire' || prevUrl === 'https://william-perry.netlify.app/repertoire' || prevUrl === 'https://william-perry.com/repertoire') ? (
          <div
            className='pt-4 px-8 bg-white w-full max-w-[1076px] m-auto flex justify-left align-top items-left text-left text-lg'
          >
            <LinkInternal
              title='Back to Repertoire'
              href='repertoire'
            >
              &larr; Back to Repertoire
            </LinkInternal>
          </div>
        ) : (
          (prevUrl && (prevUrl === 'http://localhost:3000/' || prevUrl === 'https://william-perry.netlify.app/' || prevUrl === 'https://william-perry.com/') ? (
            <div
              className='pt-4 px-8 bg-white w-full max-w-[1076px] m-auto flex justify-left align-top items-left text-left text-lg'
            >
              <LinkInternal
                title='Back'
                href=''
              >
                &larr; Back
              </LinkInternal>
            </div>
          ) : '')
        ))
      )}
    </div>
  );
};

export default PageHeader;