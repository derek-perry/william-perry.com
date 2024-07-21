import React from 'react';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import api from '../lib/config';
import { eventProps } from '../lib/api';
import Page from '../components/Page';
import ItemEvent from '../components/Items/ItemEvent';

const calendarPage: NextPage = () => {
  let currentDateTime: Date = new Date();
  const timezoneOffset = new Date().getTimezoneOffset()
  const offset = Math.abs(timezoneOffset)
  const offsetHours = Math.floor(offset / 60).toString().padStart(2, '0')
  currentDateTime.setHours((timezoneOffset < 0 ? (currentDateTime.getHours() + parseInt(offsetHours)) : (currentDateTime.getHours() - 4)));
  if (currentDateTime.getHours() < 0) {
    currentDateTime.setHours(currentDateTime.getHours() + 24);
    currentDateTime.setDate(currentDateTime.getDate() - 1);
  };
  const currentDateTimeISO = currentDateTime.toISOString().split('T')[0];
  const [upcomingEvents, setUpcomingEvents] = useState<eventProps[]>([]);
  const [pastEvents, setPastEvents] = useState<eventProps[]>([]);
  const [isLoadingUpcomingEvents, setIsLoadingUpcomingEvents] = useState(false);
  const [isLoadingPastEvents, setIsLoadingPastEvents] = useState(false);

  useEffect(
    () => {
      const getUpcomingEvents = async () => {
        try {
          setIsLoadingUpcomingEvents(true);
          const fetchedData = [];
          const { data } = await api.get(
            `wp-eventsw?pagination[page]=1&pagination[pageSize]=10&filters[Day][StartTime][$gte]=${currentDateTimeISO}&sort[0]=id:desc&populate[Day][fields][4]=StartTime&populate[Day][fields][5]=EndTime&populate[Day][fields][6]=Price&populate[Day][populate][0]=Timezone`
          );
          fetchedData.push(...data?.data);
          if (
            data?.meta?.pagination &&
            fetchedData.length > 0 &&
            data?.meta?.pagination.page < data?.meta?.pagination.pageCount
          ) {
            const { page, pageCount } = data?.meta?.pagination;
            for (let i = page + 1; i <= pageCount; i++) {
              let response = await api.get(
                `wp-events?pagination[page]=${i}&pagination[pageSize]=10&filters[Day][StartTime][$gte]=${currentDateTimeISO}&sort[0]=id:desc&populate[Day][fields][4]=StartTime&populate[Day][fields][5]=EndTime&populate[Day][fields][6]=Price&populate[Day][populate][0]=Timezone`
              );
              fetchedData.push(...response.data.data);
            };
          };
          fetchedData.filter((item, index, self) =>
            index === self.findIndex((t) => (
              t.id === item.id
            ))
          );
          fetchedData.forEach((event: eventProps) => {
            if (event.attributes.Day) {
              event.attributes.Day = event.attributes.Day.filter((day: any) => {
                const dayStartTime = new Date(day.StartTime).getTime();
                return dayStartTime >= new Date(currentDateTimeISO).getTime();
              });
            };
          });
          fetchedData.forEach((event: eventProps) => {
            if (event.attributes.Day && event.attributes.Day.length) {
              event.attributes.Day.sort((a, b) => {
                const aStartTime = new Date(a.StartTime).getTime();
                const bStartTime = new Date(b.StartTime).getTime();
                return aStartTime - bStartTime;
              });
            };
          });
          fetchedData.sort((a, b) => {
            if ((a.attributes.Day && a.attributes.Day.length) || (b.attributes.Day && b.attributes.Day.length)) {
              const aStartTime = new Date(a.attributes.Day[0]?.StartTime).getTime();
              const bStartTime = new Date(b.attributes.Day[0]?.StartTime).getTime();
              return aStartTime - bStartTime;
            }
            return 0;
          });
          setUpcomingEvents(fetchedData);
        } catch (error: any) {
          if (error?.response?.data) {
            console.error(error?.response?.data.error?.message);
          };
        } finally {
          setIsLoadingUpcomingEvents(false);
        };
      };

      const getPastEvents = async () => {
        try {
          setIsLoadingPastEvents(true);
          const fetchedData = [];
          const { data } = await api.get(
            `wp-events?pagination[page]=1&pagination[pageSize]=10&sort[0]=id:desc&populate[Day][fields][4]=StartTime&populate[Day][fields][5]=EndTime&populate[Day][fields][6]=Price&populate[Day][populate][0]=Timezone`
          );
          fetchedData.push(...data?.data);
          if (
            data?.meta?.pagination &&
            fetchedData.length > 0 &&
            data?.meta?.pagination.page < data?.meta?.pagination.pageCount
          ) {
            const { page, pageCount } = data?.meta?.pagination;
            for (let i = page + 1; i <= pageCount; i++) {
              let response = await api.get(
                `wp-events?pagination[page]=${i}&pagination[pageSize]=10&sort[0]=id:desc&populate[Day][fields][4]=StartTime&populate[Day][fields][5]=EndTime&populate[Day][fields][6]=Price&populate[Day][populate][0]=Timezone`
              );
              fetchedData.push(...response.data.data);
            };
          };
          fetchedData.filter((item, index, self) =>
            index === self.findIndex((t) => (
              t.id === item.id
            ))
          );
          const fetchedDataClean = fetchedData.filter((event: eventProps) => {
            if (event.attributes.Day && event.attributes.Day.length) {
              return event.attributes.Day.every((day: any) => {
                return new Date(day.StartTime).getTime() < new Date(currentDateTimeISO).getTime();
              });
            };
            return false;
          });
          fetchedDataClean.forEach((event: eventProps) => {
            if (event.attributes.Day && event.attributes.Day.length) {
              event.attributes.Day.sort((a, b) => {
                const aStartTime = new Date(a.StartTime).getTime();
                const bStartTime = new Date(b.StartTime).getTime();
                return aStartTime - bStartTime;
              });
            };
          });
          fetchedDataClean.sort((a, b) => {
            if ((a.attributes.Day && a.attributes.Day.length) || (b.attributes.Day && b.attributes.Day.length)) {
              const aStartTime = new Date(a.attributes.Day[0]?.StartTime).getTime();
              const bStartTime = new Date(b.attributes.Day[0]?.StartTime).getTime();
              return bStartTime - aStartTime;
            }
            return 0;
          });
          setPastEvents(fetchedDataClean);
        } catch (error: any) {
          if (error?.response?.data) {
            console.error(error?.response?.data.error?.message);
          };
        } finally {
          setIsLoadingPastEvents(false);
        };
      };

      getUpcomingEvents();
      getPastEvents();
    }, []
  );

  return (
    <Page
      title='Calendar - William Perry'
      description='William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.'
      url='calendar'
      image=''
      classNameMain='!px-0'
    >
      <>
        <h1 className='px-8'>Calendar</h1>
        {isLoadingUpcomingEvents ? (
          <h2 id='loading-upcoming-events' className='mt-12 px-8'>Loading Upcoming Events...</h2>
        ) : (
          (upcomingEvents && upcomingEvents.length ? (
            <section
              className='bg-wpWhite mt-12 min-h-full w-full max-w-[600px] text-center'
              id='upcoming-events-container'
            >
              <hr className='hrFancy max-w-[600px] !mt-0' />
              {(upcomingEvents.length > 1 ? (
                <h2 className='mb-4' id='upcoming-events'>Upcoming Events</h2>
              ) : (
                <h2 className='mb-4' id='upcoming-event'>Upcoming Event</h2>
              ))}
              <div
                className='w-full flex flex-col gap-6 justify-center align-middle items-center text-center'
                id='upcoming-events-list'
              >
                {upcomingEvents.map((upcomingEvent) => (
                  <ItemEvent
                    key={upcomingEvent.attributes.Name}
                    id={upcomingEvent.id.toString()}
                    Name={upcomingEvent.attributes.Name}
                    Day={upcomingEvent.attributes.Day}
                    Description={upcomingEvent.attributes.Description}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section
              className='bg-wpWhite mt-12 min-h-full w-full max-w-[600px] text-center'
              id='no-upcoming-events-container'
            >
              <hr className='hrFancy max-w-[600px] !mt-0' />
              <h2 className='mb-4' id='no-upcoming-events'>No Upcoming Events</h2>
              <div className='mb-4 flex flex-row flex-wrap gap-y-0 gap-x-2 justify-center align-middle items-center text-center'>
                <p>There are currently no upcoming events.</p>
                <p>Below are previous events.</p>
              </div>
            </section>
          ))
        )}
        {isLoadingPastEvents ? (
          <h2 id='loading-past-events' className='mt-12 px-8'>Loading Past Events...</h2>
        ) : (
          (pastEvents && pastEvents.length ? (
            <section
              className='bg-wpWhite mt-12 min-h-full w-full max-w-[600px] text-center'
              id='past-events-container'
            >
              <hr className='hrFancy max-w-[600px] !mt-0' />
              {(pastEvents.length > 1 ? (
                <h2 className='mb-4' id='past-events'>Past Events</h2>
              ) : (
                <h2 className='mb-4' id='past-event'>Past Event</h2>
              ))}
              <div
                className='w-full flex flex-col gap-6 justify-center align-middle items-center text-center'
                id='past-events-list'
              >
                {pastEvents.map((pastEvent) => (
                  <ItemEvent
                    key={pastEvent.attributes.Name}
                    id={pastEvent.id.toString()}
                    Name={pastEvent.attributes.Name}
                    Day={pastEvent.attributes.Day}
                    Description={pastEvent.attributes.Description}
                  />
                ))}
              </div>
            </section>
          ) : '')
        )}
      </>
    </Page>
  );
};

export default calendarPage;