import { FC } from 'react';
import cn from 'classnames';
import { eventDayProps } from '../../lib/api';

interface IItemDayProps {
  Days: eventDayProps[] | null;
  className?: string;
};

const ItemDay: FC<IItemDayProps> = ({
  Days,
  className
}): JSX.Element => {
  function stringWithLineBreaks(inputString: string) {
    return inputString?.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
  };

  function formatDate(dateTime: string, timezoneOffset?: string) {
    if (!dateTime) return '';

    // Regular expression to match ISO 8601 date format
    const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    const match = dateTime.match(regex);

    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      const hour = match[4];
      const minute = match[5];

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[parseInt(month, 10) - 1];

      const hourInt = parseInt(hour, 10);
      const ampm = hourInt >= 12 ? 'pm' : 'am';
      const hour12 = hourInt % 12 || 12;

      if (timezoneOffset) {
        const timezoneOffsetInt = parseInt(timezoneOffset, 10);
        let adjustedHour = (hourInt + timezoneOffsetInt) % 24;
        let dayFixed = parseInt(day, 10);
        if (adjustedHour < 0) {
          adjustedHour += 24;
          dayFixed -= 1;
        };
        const adjustedHour12 = adjustedHour % 12 || 12;
        const adjustedAMPM = adjustedHour >= 12 ? 'pm' : 'am';

        return `${monthName} ${dayFixed}, ${year} ${adjustedHour12}:${minute}${adjustedAMPM}`;
      } else {
        return `${monthName} ${day}, ${year} ${hour12}:${minute}${ampm}`;
      };
    } else {
      return '';
    };
  };

  return (
    <>
      {Days && Days.length ? (
        <div className='flex flex-col gap-4'>
          {Days.map((DayItem) => (
            (DayItem.StartTime && DayItem.Price && DayItem.Location?.data) ? (
              <div
                className='bg-wpGreyLight rounded shadow py-2'
              >
                <div
                  className={cn('flex flex-row flex-wrap gap-y-0 gap-x-2 px-2 ', className)}
                >
                  <p className='text-2xl'>{formatDate(DayItem.StartTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                  {(DayItem.EndTime ? (
                    <div className='flex flex-row flex-wrap gap-y-0 gap-x-2 justify-center align-middle items-center'>
                      <p className='text-2xl'> - </p>
                      <p className='text-2xl'>{formatDate(DayItem.EndTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                      {(DayItem.Timezone.data ? (
                        <p className='text-2xl'>{DayItem.Timezone.data.attributes.Abbreviation}</p>
                      ) : '')}
                    </div>
                  ) : '')}
                </div>
                <hr className='border-wpGrey !mb-1 !mt-2' />
                <p className='text-2xl px-2' dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(DayItem.Price) }} />
                <hr className='border-wpGrey !mb-1 !mt-2' />
                {DayItem.Location.data?.attributes.Name ? (
                  <p className='text-2xl px-2'>{DayItem.Location.data?.attributes.Name}</p>
                ) : ''}
                <p className='text-2xl px-2'>{DayItem.Location.data?.attributes.StreetAddress}</p>
                <p className={cn('text-2xl px-2 flex flex-row ', className)}>{DayItem.Location.data?.attributes.City ? DayItem.Location.data?.attributes.City : ''}{DayItem.Location.data?.attributes.State ? (', ' + DayItem.Location.data?.attributes.State) : ''}{DayItem.Location.data?.attributes.PostalCode ? (' ' + DayItem.Location.data?.attributes.PostalCode) : ''}</p>
              </div>
            ) : (
              <>
                {DayItem.StartTime ? (
                  <div
                    className={cn('bg-wpGreyLight rounded shadow flex flex-row flex-wrap gap-y-0 gap-x-2 p-2 ', className)}
                  >
                    <p className='text-2xl'>{formatDate(DayItem.StartTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                    {(DayItem.EndTime ? (
                      <div className='flex flex-row flex-wrap gap-y-0 gap-x-2 justify-center align-middle items-center'>
                        <p className='text-2xl'> - </p>
                        <p className='text-2xl'>{formatDate(DayItem.EndTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                        {(DayItem.Timezone.data ? (
                          <p className='text-2xl'>{DayItem.Timezone.data.attributes.Abbreviation}</p>
                        ) : '')}
                      </div>
                    ) : '')}
                  </div>
                ) : ''}
              </>
            )
          ))}
        </div>
      ) : ''}
    </>
  );
};

export default ItemDay;