import { FC } from 'react';
import { eventDayProps } from '../../lib/api';
import ItemDay from './ItemDay';
import ButtonInternal from '../Buttons/ButtonInternal';
import LinkInternal from '../Links/LinkInternal';

interface IItemEventProps {
  id: string;
  Name: string;
  Day: eventDayProps[] | null;
  Description: string;
  className?: string;
};

const ItemEvent: FC<IItemEventProps> = ({
  id,
  Name,
  Day,
  Description,
  className
}): JSX.Element => {
  function stringWithLineBreaks(inputString: string) {
    return inputString?.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
  };

  function fixDescription(inputString: string) {
    if (inputString?.split(' ').length >= 30) {
      return stringWithLineBreaks(inputString?.split(' ').slice(0, 30).join(' ') + '...');
    } else {
      return stringWithLineBreaks(inputString);
    };
  };

  return (
    <article
      key={Name}
      id={Name}
      className={'w-full max-w-[600px] flex flex-col gap-4 py-4 px-4 bg-wpGrey shadow ' + className}
    >
      <LinkInternal
        href={`event/${Name}?id=${id}`}
        title={Name}
        className='w-auto min-w-auto'
      ><h3 className='font-bold text-4xl'>{Name}</h3></LinkInternal>
      {Day && Day.length ? (
        <ItemDay
          Days={Day}
          className='text-center justify-center align-middle items-middle'
        />
      ) : ''}
      {Description ? (
        <p className='text-wpBlack text-justify text-xl' dangerouslySetInnerHTML={{ __html: fixDescription(Description) }} />
      ) : ''}
      <ButtonInternal
        href={`event/${Name}?id=${id}`}
        title={Name}
        className='w-full min-w-full text-xl font-bold'
      >
        View Event
      </ButtonInternal>
    </article>
  );
};

export default ItemEvent;