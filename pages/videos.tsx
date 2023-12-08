import type { NextPage } from 'next';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';

const videosPage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="William Perry's Videos" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="videos" image="" />

      <main className="bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center">
        <section id="videos">
          <section className="px-9 max-md:mt-10 md:mt-20 mb-28 max-w-[1000px] text-left">
            <h1 className="text-6xl">Videos</h1>
            <p className="my-4">William plays solo piano versions of his most requested songs.</p>
            <div className="flex max-md:flex-col md:flex-row md:flex-wrap gap-y-2">
              <div className="flex flex-col mx-auto md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/IiV2zidrSaY"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Écossaise, WoO 23 by Beethoven"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
              <div className="flex flex-col mx-auto md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/sLAzWqrIO2Y"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="The Storm by Burgmuller"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
              <div className="flex flex-col mx-auto md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/LpEC-e0tD-M"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="The Sparkling Brook by Margaret Goldston"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
              <div className="flex flex-col mx-auto md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/ysdsLID7pNA"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Reflections by Dennis Alexander"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
              <div className="flex flex-col mx-auto md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/QosFUyTuCq0"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Styx | Fooling Yourself - Synth Solo"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
              <div className="flex flex-col mx-auto md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/ymQlFdhLe_w"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Bruch Violin Concerto No. 1 (excerpt) | Will Perry"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:max-w-[708px]">
              <h2 id="popjazz" className="mt-20">Popular and Jazz</h2>
              <p className="my-4">William plays solo piano versions of his most requested songs.</p>
              <div className="flex flex-col md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/lGsoecbFfPo"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="William Perry plays Bewitched, Bothered and Bewildered"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:max-w-[708px]">
              <h2 id="wedding" className="mt-20">Wedding Songs</h2>
              <p className="my-4">William plays solo piano versions of the most popular wedding songs.</p>
              <div className="flex flex-col md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/URNGY0GMk38"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Wedding Sampler - 2019"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:max-w-[708px]">
              <h2 id="keyboard" className="mt-20">Keyboard</h2>
              <p className="my-4">William demonstrates keyboard parts for a live band setting of the most popular “Yacht Rock” songs.</p>
              <div className="flex flex-col md:max-w-[708px]">
                <iframe
                  src="https://youtube.com/embed/ccRz_CLHpjQ"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Keyboard Demo"
                  className="rounded-md min-h-[198px] min-[450px]:h-[300px] sm:h-[350px] md:h-[382px] md:w-full lg:w-full"
                />
              </div>
            </div>
          </section>
        </section>
      </main>

      <PageFooter />
    </div >
  );
};

export default videosPage;