import { FC } from 'react';
import cn from 'classnames';
import { eventDayProps } from '../../lib/api';
import LinkExternal from '../Links/LinkExternal';

interface IItemDayProps {
  Days: eventDayProps[] | null;
  centered: boolean;
  linkedAddress: boolean;
  className?: string;
};

const ItemDay: FC<IItemDayProps> = ({
  Days,
  centered,
  linkedAddress,
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
      {Days ? (
        Days && Days.length > 1 ? (
          <div className='flex flex-col gap-4'>
            {Days.map((DayItem) => (
              <>
                {DayItem.StartTime ? (
                  <div
                    className={cn('bg-wpGreyLight rounded shadow flex flex-col gap-y-0 gap-x-2 py-2 ',
                      {
                        'text-center justify-center items-center': centered
                      },
                      {
                        'text-left justify-left items-left': !centered
                      }
                    )}
                  >
                    <div
                      className={cn('flex flex-row flex-wrap gap-y-0 gap-x-2 px-2 ',
                        {
                          'text-center justify-center items-center': centered
                        },
                        {
                          'text-left justify-left items-left': !centered
                        }
                      )}
                    >
                      <p className='text-2xl'>{formatDate(DayItem.StartTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                      {(DayItem.EndTime ? (
                        <div
                          className={cn('flex flex-row flex-wrap gap-y-0 gap-x-2 ',
                            {
                              'text-center justify-center items-center': centered
                            },
                            {
                              'text-left justify-left items-left': !centered
                            }
                          )}
                        >
                          <p className='text-2xl'> - </p>
                          <p className='text-2xl'>{formatDate(DayItem.EndTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                        </div>
                      ) : '')}
                          {(DayItem.Timezone.data ? (
                            <p className='text-2xl'>{DayItem.Timezone.data.attributes.Abbreviation}</p>
                          ) : '')}
                    </div>
                    {(DayItem.Price ? (
                      <div
                        className={cn('flex flex-col gap-y-0 gap-x-2 border-t border-wpGrey w-full mt-2 pt-2 ',
                          {
                            'text-center justify-center items-center': centered
                          },
                          {
                            'text-left justify-left items-left': !centered
                          }
                        )}
                      >
                        <p className='text-2xl px-2' dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(DayItem.Price) }} />
                      </div>
                    ) : '')}
                    {(DayItem.Location.data ? (
                      <div
                        className={cn('flex flex-col gap-y-0 gap-x-2 border-t border-wpGrey w-full mt-2 pt-2 ',
                          {
                            'text-center justify-center items-center': centered
                          },
                          {
                            'text-left justify-left items-left': !centered
                          }
                        )}
                      >
                        {DayItem.Location.data?.attributes.Name ? (
                          (linkedAddress && DayItem.Location.data?.attributes.Website ? (
                            <LinkExternal
                              href={DayItem.Location.data?.attributes.Website}
                              title={DayItem.Location.data?.attributes.Name}
                            ><p className='text-2xl px-2'>{DayItem.Location.data?.attributes.Name}</p></LinkExternal>
                          ) : (
                            <p className='text-2xl px-2'>{DayItem.Location.data?.attributes.Name}</p>
                          ))
                        ) : ''}
                        <p className='text-2xl px-2'>{DayItem.Location.data?.attributes.StreetAddress}</p>
                        <p className={cn('text-2xl px-2 flex flex-row ', className)}>{DayItem.Location.data?.attributes.City ? DayItem.Location.data?.attributes.City : ''}{DayItem.Location.data?.attributes.State ? (', ' + DayItem.Location.data?.attributes.State) : ''}{DayItem.Location.data?.attributes.PostalCode ? (' ' + DayItem.Location.data?.attributes.PostalCode) : ''}</p>
                      </div>
                    ) : '')}
                  </div>
                ) : ''}
              </>
            ))}
          </div>
        ) : (
          <>
            {Days[0] ? (
              <div
                className={cn('bg-wpGreyLight rounded shadow flex flex-col gap-y-0 gap-x-2 py-2 ',
                  {
                    'text-center justify-center items-center': centered
                  },
                  {
                    'text-left justify-left items-left': !centered
                  }
                )}
              >
                <div
                  className={cn('flex flex-row flex-wrap gap-y-0 gap-x-2 px-2 ',
                    {
                      'text-center justify-center items-center': centered
                    },
                    {
                      'text-left justify-left items-left': !centered
                    }
                  )}
                >
                  <p className='text-2xl'>{formatDate(Days[0].StartTime, Days[0].Timezone.data?.attributes.Offset)}</p>
                  {(Days[0].EndTime ? (
                    <div
                      className={cn('flex flex-row flex-wrap gap-y-0 gap-x-2 ',
                        {
                          'text-center justify-center items-center': centered
                        },
                        {
                          'text-left justify-left items-left': !centered
                        }
                      )}
                    >
                      <p className='text-2xl'> - </p>
                      <p className='text-2xl'>{formatDate(Days[0].EndTime, Days[0].Timezone.data?.attributes.Offset)}</p>
                    </div>
                  ) : '')}
                      {(Days[0].Timezone.data ? (
                        <p className='text-2xl'>{Days[0].Timezone.data.attributes.Abbreviation}</p>
                      ) : '')}
                </div>
                {(Days[0].Price ? (
                  <div
                    className={cn('flex flex-col gap-y-0 gap-x-2 border-t border-wpGrey w-full mt-2 pt-2 ',
                      {
                        'text-center justify-center items-center': centered
                      },
                      {
                        'text-left justify-left items-left': !centered
                      }
                    )}
                  >
                    <p className='text-2xl px-2' dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(Days[0].Price) }} />
                  </div>
                ) : '')}
                {(Days[0].Location.data ? (
                  <div
                    className={cn('flex flex-col gap-y-0 gap-x-2 border-t border-wpGrey w-full mt-2 pt-2 ',
                      {
                        'text-center justify-center items-center': centered
                      },
                      {
                        'text-left justify-left items-left': !centered
                      }
                    )}
                  >
                    {Days[0].Location.data?.attributes.Name ? (
                      (linkedAddress && Days[0].Location.data?.attributes.Website ? (
                        <LinkExternal
                          href={Days[0].Location.data?.attributes.Website}
                          title={Days[0].Location.data?.attributes.Name}
                        ><p className='text-2xl px-2'>{Days[0].Location.data?.attributes.Name}</p></LinkExternal>
                      ) : (
                        <p className='text-2xl px-2'>{Days[0].Location.data?.attributes.Name}</p>
                      ))
                    ) : ''}
                    <p className='text-2xl px-2'>{Days[0].Location.data?.attributes.StreetAddress}</p>
                    <p className={cn('text-2xl px-2 flex flex-row ', className)}>{Days[0].Location.data?.attributes.City ? Days[0].Location.data?.attributes.City : ''}{Days[0].Location.data?.attributes.State ? (', ' + Days[0].Location.data?.attributes.State) : ''}{Days[0].Location.data?.attributes.PostalCode ? (' ' + Days[0].Location.data?.attributes.PostalCode) : ''}</p>
                  </div>
                ) : '')}
              </div>
            ) : ''}
          </>
        )
      ) : ''}
    </>
  );
};

export default ItemDay;