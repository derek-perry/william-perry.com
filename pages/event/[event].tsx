import { GetServerSideProps, NextPage } from 'next';
import { ToWords } from 'to-words';
import { apiGetEvent, eventProps } from '../../lib/api';
import Page from '../../components/Page';
import { MusicEvent, WithContext } from 'schema-dts';

const toWords = new ToWords({
  localeCode: 'en-US',
  converterOptions: {
    currency: false,
    ignoreDecimal: false,
    ignoreZeroCurrency: false
  }
});

interface IEventPageProps {
  event: eventProps;
  prevUrl: string | undefined;
};

const EventPage: NextPage<IEventPageProps> = ({ event, prevUrl }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : 'https://william-perry.com';

  if (event.attributes.Day && event.attributes.Day.length) {
    event.attributes.Day.sort((a, b) => {
      const aStartTime = new Date(a.StartTime).getTime();
      const bStartTime = new Date(b.StartTime).getTime();
      return aStartTime - bStartTime;
    });
  };

  const checkNumberName = (dirtyName: string) => {
    let parsedName = parseInt(dirtyName);
    if (isNaN(parsedName)) {
      return dirtyName;
    } else {
      let words = toWords.convert(parsedName);
      return encodeURIComponent(words);
    };
  };

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
        if (adjustedHour < 0) {
          adjustedHour += 24;
        }
        const adjustedHour12 = adjustedHour % 12 || 12;
        const adjustedAMPM = adjustedHour >= 12 ? 'pm' : 'am';

        return `${monthName} ${day}, ${year} ${adjustedHour12}:${minute}${adjustedAMPM}`;
      } else {
        return `${monthName} ${day}, ${year} ${hour12}:${minute}${ampm}`;
      };
    } else {
      return '';
    };
  };

  const lastDayIndex = event.attributes.Day && event.attributes.Day.length ? event.attributes.Day.length - 1 : 0;
  function JsonLd<T extends MusicEvent>(json: WithContext<T>): string {
    return JSON.stringify(json);
  };
  const eventJSON = JsonLd<MusicEvent>({
    "@context": "https://schema.org",
    '@type': 'MusicEvent',
    name: `${event.attributes.Name} - William Perry`,
    description: event.attributes.Description ? fixDescription(event.attributes.Description) : 'William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.',
    url: `${siteUrl}/event/${checkNumberName(event.attributes.Name)}?id=${event.id}`,
    startDate: event.attributes.Day && event.attributes.Day.length ? new Date(event.attributes.Day[0].StartTime).toISOString() : '',
    endDate: event.attributes.Day && event.attributes.Day.length ? new Date(event.attributes.Day[lastDayIndex].EndTime).toISOString() : '',
    image: event.attributes.Image?.data ? event.attributes.Image.data?.attributes.url : '',
    performer: {
      '@type': 'Person',
      name: 'William Perry',
      sameAs: 'https://william-perry.com'
    }
  });
  // const eventJSON: Event = {
  //   "@context" : "https://schema.org",
  //   '@type': 'MusicEvent',
  //   name: `${event.attributes.Name} - William Perry`,
  //   description: event.attributes.Description ? event.attributes.Description : 'William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.',
  //   url: `${siteUrl}/event/${checkNumberName(event.attributes.Name)}?id=${event.id}`,
  //   startDate: event.attributes.Day && event.attributes.Day.length ? new Date(event.attributes.Day[0].StartTime).toISOString() : '',
  //   endDate: event.attributes.Day && event.attributes.Day.length ? new Date(event.attributes.Day[lastDayIndex].EndTime).toISOString() : '',
  //   image: event.attributes.Image?.data ? event.attributes.Image.data?.attributes.url : '',
  //   performer: {
  //     '@type': 'Person',
  //     name: 'William Perry',
  //     sameAs: 'https://william-perry.com'
  //   }
  // };

  return (
    <>
      {event && event.attributes.Name ? (
        <Page
          title={`${event.attributes.Name} - William Perry`}
          description={event.attributes.Description ? event.attributes.Description : 'William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.'}
          url={`event/${checkNumberName(event.attributes.Name)}`}
          image={event.attributes.Image?.data ? event.attributes.Image.data?.attributes.url : ``}
          prevUrl={prevUrl ? prevUrl : ''}
        >
          <script type='application/ld+json'>{eventJSON}</script>
          <article
            className='max-w-[1000px]'
            id={checkNumberName(event.attributes.Name)}
          >
            {event.attributes.Image?.data ? (
              <div className='mb-8 min-w-auto'>
                <img
                  alt={event.attributes.Image?.data?.attributes.alternativeText}
                  src={event.attributes.Image?.data?.attributes.url ? event.attributes.Image?.data?.attributes.url : ''}
                  height={event.attributes.Image?.data?.attributes.height ? event.attributes.Image?.data?.attributes.height : 0}
                  width={event.attributes.Image?.data?.attributes.width ? event.attributes.Image?.data?.attributes.width : 0}
                />
              </div>
            ) : ''}
            {event.attributes.Name ? (
              <h3 className='font-bold text-5xl max-md:text-4xl'>{event.attributes.Name}</h3>
            ) : ''}
            {event.attributes.Day && event.attributes.Day.length ? (
              <div className='flex flex-col gap-4 mt-6'>
                {event.attributes.Day.map((DayItem) => (
                  (DayItem.StartTime && DayItem.Price) ? (
                    <div
                      className='bg-wpGreyLight rounded shadow py-2'
                    >
                      {DayItem.StartTime ? (
                        <div
                          className='flex flex-row flex-wrap gap-y-0 gap-x-2 px-2'
                        >
                          <p className='text-2xl'>{formatDate(DayItem.StartTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                          {(DayItem.EndTime ? (
                            <div className='flex flex-row flex-wrap gap-y-0 gap-x-2'>
                              <p className='text-2xl'> - </p>
                              <p className='text-2xl'>{formatDate(DayItem.EndTime, DayItem.Timezone.data?.attributes.Offset)}</p>
                              {(DayItem.Timezone.data ? (
                                <p className='text-2xl'>{DayItem.Timezone.data.attributes.Abbreviation}</p>
                              ) : '')}
                            </div>
                          ) : '')}
                        </div>
                      ) : ''}
                      {DayItem.Price ? (
                        <>
                          <hr className='border-wpGrey !mb-1 !mt-2' />
                          <p className='text-2xl px-2' dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(DayItem.Price) }} />
                        </>
                      ) : ''}
                    </div>
                  ) : (
                    <>
                      {DayItem.StartTime ? (
                        <div
                          className='bg-wpGreyLight rounded shadow flex flex-row flex-wrap gap-y-0 gap-x-4 p-2'
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
            {event.attributes.Description ? (
              <p className='mt-4 text-2xl text-left' dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(event.attributes.Description) }} />
            ) : ''}
          </article>
        </Page>
      ) :
        (
          <Page
            title='Event Not Found - William Perry'
            description='William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.'
            url='event/not-found'
            image=''
          >
            <article
              className='max-w-[680px]'
              id='event-not-found'
            >
              <h1 className='mb-4'>Error 404: Event Not Found</h1>
              <p className='mt-2 text-2xl'>The event you are looking for has moved, is no longer available, has been archived, or was not valid.</p>
            </article>
          </Page>
        )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await apiGetEvent.get(
      (context?.query?.id as string) || '0'
    );
    return {
      props: {
        event: response.data.data,
        prevUrl: context.req.headers.referer ?? ''
      }
    };
  } catch (e) {
    return {
      props: {
        event: null,
        prevUrl: context.req.headers.referer ?? ''
      }
    };
  };
};

export default EventPage;
