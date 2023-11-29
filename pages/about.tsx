import type { NextPage } from 'next';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';

const aboutPage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="About William Perry" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="about" />

      <main className="bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center">
        <section id="about">
          <div className="px-9 max-md:mt-10 md:mt-20 mb-28 max-w-[1000px] text-left">
            <h1 className="mb-4 text-6xl">About</h1>
            <p className="text-xl">William Perry has built his reputation on dynamic performances of wide ranging repertoire, styles and explorations into new musical territories. He brings to every musical endeavor a unique and fresh perspective, which keeps him in demand as a classical pianist, jazz pianist, electronic keyboardist and educator.</p>
            <p className="mt-4 text-xl">William began studying piano at age nine, after a classmate brought a keyboard to school for show-and-tell. Since then, his studies have led him to degrees from Stetson University, as a student of Michael Rickman and Florida State University, as a student of Joel Hastings. Music has brought William to many different parts of the world to study under great teachers and performers. On three occasions, William traveled to France to study at the summer music festival ‘Music at Ambialet’. William also participated in the Dublin International Piano Festival in Ireland, the Prague Piano Festival in Czech Republic, the Orfeo Music Festival in Italy, the Aloha International Piano Festival in Hawaii, and the Portland International Piano Festival in Oregon.</p>
            <p className="mt-4 text-xl">William has received numerous awards for his performances including 1st Place in the 2015 Competitive Festival at Florida State University, playing the music of J.S. Bach. Previous awards include the Gladys Strong Award, prize winner at the Trula Whelan Concerto Competition and recipient of the William E. Duckwitz Talent Scholarship.</p>
            <p className="mt-4 text-xl">As a jazz musician, William has performed in a number of jazz festivals throughout Florida including the New Smyrna Beach Jazz Festival, the Downtown Music Festival and the Lakeside Jazz Festival, as well as in performances at venues like the Atlantic Center for the Arts, the Harris House, The Hub on Canal, Arts on Douglas and SubCentral at the Iberian Rooster. He started jazz studies with Chris Rottmayer at Daytona State College and continued studies at Stetson University as a member of its Jazz Ensemble.</p>
            <p className="mt-4 text-xl">Recently, William has begun to work in popular music bands and is in demand for large productions. As an electronic keyboardist, William works on the accurate reproduction of the iconic sounds of artists like The Beatles, The Rolling Stones, Toto, Phil Collins, Steely Dan, Michael Jackson and many others. He has performed as a band member for live album shows for The Beatles’ White Album and Abbey Road as well as The Rolling Stones’ Sticky Fingers. Recently, he performed at the Hard Rock Hotel in Daytona Beach, as a member of The Magnificent 12, recreating the music of the “Yacht Rock” era. During that show, he performed Key Largo, with the composer, Bertie Higgins. William also recorded the keyboard parts at Solar Studio in Orlando, for We Are The World 2019, which has surpassed 1 million views on YouTube.</p>
            <p className="mt-4 text-xl">William has been teaching piano for nearly 10 years. He started at the Cuchetti School of Music, where he also led the piano program for their scholarship students. At Florida State University, he was a graduate teaching assistant, teaching private lessons and group classes. After graduation, he worked for two years at New Tampa Piano and Pedagogy Academy, where many of his students received high honors in Royal Conservatory of Music Examinations. He has been an active member of Music Teachers National Association, frequently presenting his pedagogical research at conferences, founding two student chapters, running the Young Artist division of the Florida MTNA competitions and serving as president of Mid-State Music Teachers Association.</p>
          </div>
        </section>
      </main>

      <PageFooter />
    </div >
  );
};

export default aboutPage;