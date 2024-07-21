import React from 'react';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import api from '../lib/config';
import { songProps } from '../lib/api';
import Page from '../components/Page';

const repertoirePage: NextPage = () => {
  const [songs, setSongs] = useState<songProps[]>([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);

  useEffect(
    () => {
      const getSongs = async () => {
        try {
          setIsLoadingSongs(true);
          const fetchedData = [];
          const { data } = await api.get(
            `wp-songs?pagination[page]=1&pagination[pageSize]=10&sort[0]=id:desc&populate[Day][fields][4]=StartTime&populate[Day][fields][5]=EndTime&populate[Day][fields][6]=Price&populate[SongArtists][fields][7]=Name&populate[SongGenres][fields][8]=Name&populate[Day][populate][0]=Timezone`
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
                `wp-songs?pagination[page]=${i}&pagination[pageSize]=10&sort[0]=id:desc&populate[Day][fields][4]=StartTime&populate[Day][fields][5]=EndTime&populate[Day][fields][6]=Price&populate[SongArtists][fields][7]=Name&populate[SongGenres][fields][8]=Name&populate[Day][populate][0]=Timezone`
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

  function extractYear(inputString: string) {
    return inputString?.toString().substring(0, 4);
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
              className='bg-wpWhite mt-12 min-h-full w-full max-w-[600px] text-center'
              id='songs-container'
            >
              <div
                className='w-full flex flex-col gap-0 justify-center align-middle items-center text-center'
                id='song-list'
              >
                <div className='bg-wpGrey border border-wpBlack max-md:hidden flex md:flex-row text-left'>
                  <p className='text-2xl md:max-w-[280px] md:min-w-[280px] md:border-r md:border-wpBlack p-2'><strong>Title</strong></p>
                  <p className='text-2xl md:max-w-[180px] md:min-w-[180px] md:border-r md:border-wpBlack p-2'>Artist</p>
                  <p className='text-2xl md:max-w-[85px] md:min-w-[85px] md:border-r md:border-wpBlack p-2'>Year</p>
                  <p className='text-2xl md:max-w-[150px] md:min-w-[150px] p-2'>Genre</p>
                </div>
                {songs.map((song) => (
                  <article
                    className='border-b border-x border-wpGrey max-md:py-4 flex max-md:flex-col md:flex-row text-left odd:bg-white even:bg-wpWhite'
                    key={song.attributes.Name}
                    id={stringWithLineBreaks(song.attributes.Name)}
                  >
                    <p className='text-2xl md:max-w-[280px] md:min-w-[280px] md:border-r md:border-wpGrey px-2'><strong>{song.attributes.Name}</strong></p>
                    <p className='text-2xl md:max-w-[180px] md:min-w-[180px] md:border-r md:border-wpGrey px-2'>{
                      ((song.attributes.SongArtists && song.attributes.SongArtists.data?.length && song.attributes.SongArtists.data?.length > 1) ? (
                        song.attributes.SongArtists.data?.map((artist, index) => (
                          index === (song.attributes.SongArtists.data?.length ?? 0) - 1 ? (
                            <span key={artist.id}>{artist.attributes.Name}</span>
                          ) : (
                            index === (song.attributes.SongArtists.data?.length ?? 0) - 2 ? (
                              <span key={artist.id}>{artist.attributes.Name} and </span>
                            ) : (
                              <span key={artist.id}>{artist.attributes.Name}, </span>
                            )
                          )
                        ))
                      ) : (song.attributes.SongArtists && song.attributes.SongArtists.data?.length) ? (
                        song.attributes.SongArtists.data[0].attributes.Name ?? ''
                      ) : '')
                    }</p>
                    <p className='text-2xl md:max-w-[85px] md:min-w-[85px] md:border-r md:border-wpGrey px-2'>{extractYear(song.attributes.Year)}</p>
                    <p className='text-2xl md:max-w-[150px] md:min-w-[150px] px-2'>{
                      ((song.attributes.SongGenres && song.attributes.SongGenres.data?.length && song.attributes.SongGenres.data?.length > 1) ? (
                        song.attributes.SongGenres.data?.map((genre, index) => (
                          index === (song.attributes.SongGenres.data?.length ?? 0) - 1 ? (
                            <span key={genre.id}>{genre.attributes.Name}</span>
                          ) : (
                            index === (song.attributes.SongGenres.data?.length ?? 0) - 2 ? (
                              <span key={genre.id}>{genre.attributes.Name} and </span>
                            ) : (
                              <span key={genre.id}>{genre.attributes.Name}, </span>
                            )
                          )
                        ))
                      ) : (song.attributes.SongGenres && song.attributes.SongGenres.data?.length) ? (
                        song.attributes.SongGenres.data[0].attributes.Name ?? ''
                      ) : '')
                    }</p>
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

export default repertoirePage;