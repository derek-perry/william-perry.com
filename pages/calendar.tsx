import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getEvents } from '../lib/api';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';

interface itemProps {
  events: eventInnerProps[]
};

interface eventInnerProps {
  name: string,
  datetime: string,
  price: string,
  description: string
};

const calendarPage: NextPage<itemProps> = ({ events }) => {
  function stringWithLineBreaks(inputString: string) {
    var outputString = inputString.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
    return outputString;
  };
  function stringWithUrlSupport(inputString: string) {
    var outputString = inputString.trim().toString().toLowerCase().replace(/\s+/g, '-').replace(/ - /g, "-").replace(/---/g, "-").replace(/\&/g, "and").replace(/;/g, "%3B").replace(/:/g, "%3A").replace(/"/g, "%22").replace(/'/g, "%27").replace(/,/g, "%2C").replace(/\?/g, "%3F").replace(/!/g, "%21").replace(/@/g, "%40").replace(/#/g, "%23").replace(/\$/g, "%24").replace(/&/g, "%26").replace(/\*/g, "%2A").replace(/=/g, "%3D").replace(/\+/g, "%2B").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\[/g, "%5B").replace(/\]/g, "%5D").replace(/\\/g, "%5C").replace(/\//g, "%2F");
    return outputString;
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="Calendar - William Perry" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="calendar" image="" />

      <main className="bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center px-9">
        <section id="calendar">
          <section className="max-md:mt-10 md:mt-20 mb-10 max-w-[1000px] text-left">
            <h1 className="mb-4">Calendar</h1>
          </section>
        </section>

        <section id="events">
          <div className="mb-28 max-w-[1080px] w-full overflow-hidden flex flex-row flex-wrap gap-16 items-top justify-center text-center text-xl">
            {!events ? (
              <p className="bg-ariWhite text-ariBlack flex items-center justify-center max-sm:hyphens-auto text-2xl pb-5 px-5">Loading Upcoming Events...</p>
            ) : (events.length > 1 ?
              (events
              .slice(1)
              .map(({ name, datetime, price, description }) => (
                <article
                  className="rounded bg-wpWhite overflow-hidden w-full max-w-full lg:max-w-[500px]"
                  key={name}
                  id={stringWithUrlSupport(name)}
                >
                  <h3 className="bg-wpRedLight text-white min-h-[88px] flex items-center justify-center font-bold text-3xl py-5 px-5 max-sm:hyphens-auto">{name}</h3>
                  {datetime ? (<p className="bg-wpRedLight text-white max-sm:hyphens-auto text-2xl px-5" dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(datetime) }} />) : ''}
                  {price ? (<p className="bg-wpRedLight text-white py-4 max-sm:hyphens-auto text-2xl px-5" dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(price) }} />) : ''}
                  {description ? (<p className="my-4 max-sm:hyphens-auto text-left px-5" dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(description) }} />) : ''}
                </article>
                )))
              : (
                <article className="bg-[#1c1c1a] rounded-t-md overflow-hidden w-full max-w-full" id='no-events'><h3 className="bg-ariWhite text-ariBlack min-h-[88px] flex items-center justify-center font-bold text-3xl px-5 max-sm:hyphens-auto">No Upcoming Events</h3></article>
              )
            )}
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default calendarPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const events = await getEvents();

  return {
    props: {
      events
    }
  };
};