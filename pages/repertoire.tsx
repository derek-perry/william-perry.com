import React from 'react';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import api from '../lib/config';
import { songProps } from '../lib/api';
import Page from '../components/Page';

const RepertoirePage: NextPage = () => {
  const [songs, setSongs] = useState<songProps[]>([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);

  useEffect(
    () => {
      const getSongs = async () => {
        try {
          setIsLoadingSongs(true);
          const fetchedData = [];
          const { data } = await api.get(
            'wp-songs?pagination[page]=1&pagination[pageSize]=10&sort[0]=Name:asc&sort[1]=Year:asc'
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
                `wp-songs?pagination[page]=${i}&pagination[pageSize]=10&sort[0]=Name:asc&sort[1]=Year:asc`
              );
              fetchedData.push(...response.data.data);
            };
          };
          fetchedData.filter((item, index, self) =>
            index === self.findIndex((t) => (
              t.id === item.id
            ))
          );
          setSongs(fetchedData);
        } catch (error: any) {
          if (error?.response?.data) {
            console.error(error?.response?.data.error?.message);
          };
        } finally {
          setIsLoadingSongs(false);
        };
      };

      getSongs();
    }, []
  );

  function stringWithLineBreaks(inputString: string) {
    return inputString?.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
  };

  return (
    <Page
      title='Repertoire - William Perry'
      description='William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.'
      url='repertoire'
      image=''
      classNameMain='!px-0'
    >
      <>
        <h1 className='px-8'>Repertoire</h1>
        {isLoadingSongs ? (
          <h2 id='loading-songs' className='mt-12 px-8'>Loading Songs...</h2>
        ) : (
          (songs && songs.length ? (
            <section
              className='bg-wpWhite mt-12 min-h-full w-full max-lg:max-w-[600px] min-lg:max-w-[990px] text-center'
              id='songs-container'
            >
              <div
                className='w-full flex flex-col gap-0 justify-center align-middle items-center text-center'
                id='song-list'
              >
                <div className='bg-wpGrey border border-wpBlack max-lg:hidden flex lg:flex-row text-left'>
                  <p className='text-2xl lg:min-w-[300px] lg:border-r lg:border-wpBlack p-2'><strong>Title</strong></p>
                  <p className='text-2xl lg:min-w-[300px] lg:border-r lg:border-wpBlack p-2'>Artist</p>
                  <p className='text-2xl lg:min-w-[190px] lg:border-r lg:border-wpBlack p-2'>Year</p>
                  <p className='text-2xl lg:min-w-[200px] p-2'>Genre</p>
                </div>
                {songs.map((song) => (
                  <article
                    className='w-full border-b max-lg:border-t border-x border-wpGrey max-lg:py-4 flex gap-y-2 max-lg:flex-col lg:flex-row max-sm:text-left text-center lg:text-left odd:bg-white even:bg-wpWhite'
                    key={song.attributes.Name}
                    id={stringWithLineBreaks(song.attributes.Name)}
                  >
                    <p className='max-lg:text-3xl text-2xl lg:min-w-[300px] lg:border-r lg:border-wpGrey px-2'><strong>{song.attributes.Name}</strong></p>
                    <p className='text-2xl lg:min-w-[300px] lg:border-r lg:border-wpGrey px-2'>{song.attributes.Artist}</p>
                    <p className='text-2xl lg:min-w-[190px] lg:border-r lg:border-wpGrey px-2'>{song.attributes.Year}</p>
                    <p className='text-2xl lg:min-w-[200px] px-2'>{song.attributes.Genre}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <section
              className='bg-wpWhite mt-12 min-h-full w-full max-w-[600px] text-center'
              id='no-songs-container'
            >
              <hr className='hrFancy max-w-[600px] !mt-0' />
              <h2 className='mb-4' id='no-songs'>No Songs Found</h2>
              <div className='mb-4 flex flex-row flex-wrap gap-y-0 gap-x-2 justify-center align-middle items-center text-center'>
                <p>There are currently no songs available.</p>
                <p>Try again later.</p>
              </div>
            </section>
          ))
        )}
      </>
    </Page>
  );
};

export default RepertoirePage;