import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getSongs } from '../lib/api';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';

interface itemProps {
  songs: songInnerProps[]
};

interface songInnerProps {
  name: string,
  artist: string,
  year: string,
  genre: string
};

const repertoirePage: NextPage<itemProps> = ({ songs }) => {
  function stringWithUrlSupport(inputString: string) {
    var outputString = inputString.trim().toString().toLowerCase().replace(/\s+/g, '-').replace(/ - /g, "-").replace(/---/g, "-").replace(/\&/g, "and").replace(/;/g, "%3B").replace(/:/g, "%3A").replace(/"/g, "%22").replace(/'/g, "%27").replace(/,/g, "%2C").replace(/\?/g, "%3F").replace(/!/g, "%21").replace(/@/g, "%40").replace(/#/g, "%23").replace(/\$/g, "%24").replace(/&/g, "%26").replace(/\*/g, "%2A").replace(/=/g, "%3D").replace(/\+/g, "%2B").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\[/g, "%5B").replace(/\]/g, "%5D").replace(/\\/g, "%5C").replace(/\//g, "%2F");
    return outputString;
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="Repertoire - William Perry" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="repertoire" />

      <main className="bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center px-9">
        <section id="repertoire">
          <section className="max-md:mt-10 md:mt-20 mb-10 max-w-[1000px] text-left">
            <h1 className="mb-4 max-sm:text-5xl">Repertoire</h1>
          </section>
        </section>

        <section id="songs">
          <div className="mb-28 max-w-[1080px] w-full overflow-hidden flex flex-col gap-16 items-top justify-center text-center">
            {!songs ? (
              <p className="bg-ariWhite text-ariBlack flex items-center justify-center max-sm:hyphens-auto text-2xl pb-5 px-5">Loading Songs...</p>
            ) : (songs.length > 1 ?
              (songs
                .slice(1)
                .map(({ name, artist, year, genre }) => (
                  <article
                    className="p-5 flex max-md:flex-col md:flex-row text-left odd:bg-white even:bg-wpWhite"
                    key={name}
                    id={stringWithUrlSupport(name)}
                  >
                    <p className="text-2xl md:max-w-[280px] md:min-w-[280px] md:border-r px-4"><strong>{name}</strong></p>
                    <p className="text-2xl md:max-w-[180px] md:min-w-[180px] md:border-r px-4">{artist}</p>
                    <p className="text-2xl md:max-w-[85px] md:min-w-[85px] md:border-r px-4">{year}</p>
                    <p className="text-2xl px-4">{genre}</p>
                  </article>
                )))
              : (
                <article className="bg-[#1c1c1a] rounded-t-md overflow-hidden w-full max-w-full" id='no-songs'><h3 className="bg-ariWhite text-ariBlack min-h-[88px] flex items-center justify-center font-bold text-3xl px-5 max-sm:hyphens-auto">No Songs</h3></article>
              )
            )}
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default repertoirePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const songs = await getSongs();

  return {
    props: {
      songs
    }
  };
};