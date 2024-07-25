import { GetServerSideProps, NextPage } from 'next';
import { ToWords } from 'to-words';
import { apiGetEvent, eventProps } from '../../lib/api';
import Page from '../../components/Page';
import ItemDay from '../../components/Items/ItemDay';
import { MusicEvent, MusicGroup, WithContext } from 'schema-dts';

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

  if (event && event.attributes.Day && event.attributes.Day.length) {
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

  function markdownToHtml(content: string): string {
    // Convert YouTube links to embedded iFrames
    content = content.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^\s]+)/g, (match, videoId) => {
      return `<div class="videoContainer"><iframe class="videoItem videoItemSized" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    });

    // Convert headers to HTML <h> tags with ids
    content = content.replace(/^(#+)\s+(.*)$/gm, (match, hashes, headerText) => {
      const level = hashes.length;
      const id = headerText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h${level} id='${id}'>${headerText}</h${level}>`;
    });

    // Convert bold text (**text** or __text__)
    content = content.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');

    // Convert italic text (*text* or _text_)
    content = content.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');

    // Convert links ([text](url))
    content = content.replace(/\[([^\]]+)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Convert line breaks to <br> tags
    content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');

    return content;
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

  function createJsonLdEvent<T extends MusicEvent>(json: WithContext<T>): string {
    return JSON.stringify(json);
  };
  function createJsonLdMusicGroup<T extends MusicGroup>(json: WithContext<T>): string {
    return JSON.stringify(json);
  };
  function getJsonLdMusicGroupDays() {
    if (event.attributes.Day) {
      if (event.attributes.Day.length > 1) {
        return event.attributes.Day.map((DayItem) => (
          {
            '@type': 'MusicEvent',
            name: `${event.attributes.Name} - William Perry`,
            description: event.attributes.Description ? fixDescription(event.attributes.Description) : 'William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.',
            url: `${siteUrl}/event/${checkNumberName(event.attributes.Name)}?id=${event.id}`,
            startDate: DayItem.StartTime ? new Date(DayItem.StartTime).toISOString() : '',
            endDate: DayItem.EndTime ? new Date(DayItem.EndTime).toISOString() : '',
            image: event.attributes.Image?.data ? event.attributes.Image.data?.attributes.url : '',
            performer: {
              '@type': 'Person',
              name: 'William Perry',
              sameAs: 'https://william-perry.com'
            },
            location: event.attributes.Day && DayItem.Location.data?.attributes.StreetAddress ? {
              '@type': 'Place',
              name: DayItem.Location.data?.attributes.Name ? DayItem.Location.data?.attributes.Name : '',
              sameAs: DayItem.Location.data?.attributes.Website ? DayItem.Location.data?.attributes.Website : '',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'USA',
                streetAddress: DayItem.Location.data?.attributes.StreetAddress ? DayItem.Location.data?.attributes.StreetAddress : '',
                addressLocality: DayItem.Location.data?.attributes.City ? DayItem.Location.data?.attributes.City : '',
                addressRegion: DayItem.Location.data?.attributes.State ? DayItem.Location.data?.attributes.State : '',
                postalCode: DayItem.Location.data?.attributes.PostalCode ? DayItem.Location.data?.attributes.PostalCode : ''
              }
            } : ''
          }
        ));
      } else {
        return [];
      }
    }
  };
  function getJsonLd() {
    if (event.attributes.Day) {
      if (event.attributes.Day.length > 1) {
        return createJsonLdMusicGroup<MusicGroup>(
          {
            '@context': 'https://schema.org',
            '@type': 'MusicGroup',
            name: 'William Perry',
            sameAs: 'https://william-perry.com',
            event: getJsonLdMusicGroupDays() as []
          }
        )
      } else {
        const lastDayIndex = event.attributes.Day && event.attributes.Day.length ? event.attributes.Day.length - 1 : 0;
        return createJsonLdEvent<MusicEvent>(
          {
            '@context': 'https://schema.org',
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
            },
            location: event.attributes.Day && event.attributes.Day.length && event.attributes.Day[0].Location && event.attributes.Day[0].Location.data?.attributes.StreetAddress ? {
              '@type': 'Place',
              name: event.attributes.Day[0].Location.data?.attributes.Name ? event.attributes.Day[0].Location.data?.attributes.Name : '',
              sameAs: event.attributes.Day[0].Location.data?.attributes.Website ? event.attributes.Day[0].Location.data?.attributes.Website : '',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'USA',
                streetAddress: event.attributes.Day[0].Location.data?.attributes.StreetAddress ? event.attributes.Day[0].Location.data?.attributes.StreetAddress : '',
                addressLocality: event.attributes.Day[0].Location.data?.attributes.City ? event.attributes.Day[0].Location.data?.attributes.City : '',
                addressRegion: event.attributes.Day[0].Location.data?.attributes.State ? event.attributes.Day[0].Location.data?.attributes.State : '',
                postalCode: event.attributes.Day[0].Location.data?.attributes.PostalCode ? event.attributes.Day[0].Location.data?.attributes.PostalCode : ''
              }
            } : ''
          }
        )
      }
    };
  };

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
          <script type='application/ld+json'>{getJsonLd()}</script>
          <article
            className='max-w-[1000px] w-full'
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
              <h3 className='mb-4 font-bold text-5xl max-md:text-4xl max-sm:text-3xl'>{event.attributes.Name}</h3>
            ) : ''}
            {event.attributes.Day && event.attributes.Day.length ? (
              <div className='text-left'>
                <ItemDay
                  Days={event.attributes.Day}
                  centered={false}
                  linkedAddress={true}
                  className='text-left justify-left align-middle items-left'
                />
              </div>
            ) : ''}
            {event.attributes.Content ? (
              <p className='mt-4 text-2xl text-left' dangerouslySetInnerHTML={{ __html: markdownToHtml(event.attributes.Content) }} />
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
