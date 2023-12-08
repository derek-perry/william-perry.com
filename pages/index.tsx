import type { NextPage } from 'next';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';
import ButtonInternal from '../components/Buttons/ButtonInternal';
import ButtonExternal from '../components/Buttons/ButtonExternal';

const homePage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="William Perry" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="" image="" />

      <main className="bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center px-9">
        <section id="hero">
          <div className="flex flex-col text-center max-w-[810px] m-auto">
            <h1 className="max-md:mt-10 md:mt-20 mb-4">William Perry</h1>
            <p className="text-xl">William Perry is a Cincinnati based pianist, electronic keyboardist, and teacher who has built his career on performing and teaching a wide range of musical styles.</p>
            <p className="mt-4 mb-10">If you need the perfect solo piano music for your wedding or party, a focused and dependable on-stage performer, or a creative and knowledgeable piano instructor, you’ve come to the right place.</p>
          </div>
        </section>

        <section id="info">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <ButtonInternal title="Repertoire" href="repertoire">Explore Repertoire</ButtonInternal>
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-4">
              <ButtonInternal title="Contact" href="contact">Contact</ButtonInternal>
              <ButtonInternal title="About" href="about">About</ButtonInternal>
            </div>
          </div>
        </section>

        <section id="links">
          <div className="my-28 flex flex-row flex-wrap gap-x-16 gap-y-32 items-center justify-center text-center">
            <div>
              <h2 id="user-data" className="mb-4">Looking for piano lessons?</h2>
              <p className="text-xl">Enrolling students of all ages and levels!</p>
              <p className="mt-2 mb-8">Learn piano online or in-person in the Cincinnati area.</p>
              <ButtonInternal title="Learn More" href="lessons">Learn More</ButtonInternal>
            </div>
            <div>
              <h2 id="user-data" className="mb-4">See William’s live performances!</h2>
              <p className="text-xl">Piano and keyboard performances across America.</p>
              <p className="mt-2 mb-8">Check out upcoming live performances:</p>
              <ButtonInternal title="Calendar" href="calendar">Calendar</ButtonInternal>
            </div>
            <div>
              <h2 id="user-data" className="mb-4">Follow William on Social Media:</h2>
              <div className="mb-10 flex flex-row flex-wrap gap-x-6 gap-y-6">
                <ButtonExternal title="LinkedIn" href="https://linkedin.com/in/william-perry-b8b7405a">LinkedIn</ButtonExternal>
                <ButtonExternal title="Instagram" href="https://instagram.com/WPerryMusic">Instagram</ButtonExternal>
                <ButtonExternal title="YouTube" href="https://youtube.com/channel/UCyKOObVbhSWyCQPNAg3NggA">YouTube</ButtonExternal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div >
  );
};

export default homePage;