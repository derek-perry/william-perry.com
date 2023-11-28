import type { NextPage } from 'next';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';
import ButtonInternal from '../components/Buttons/ButtonInternal';
import ButtonExternal from '../components/Buttons/ButtonExternal';

const homePage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="William Perry" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="" />

      <main className="bg-wpWhite text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center">
        <section className="py-9 px-9 max-w-[1000px] w-full flex flex-1 flex-col items-center justify-center">
          <section id="info" className="pt-10 text-left">
            <h1 className="mb-4 text-6xl">William Perry</h1>
            <p className="text-xl">William Perry is a Cincinnati based pianist, electronic keyboardist, and teacher who has built his career on performing and teaching a wide range of musical styles.</p>
            <p className="mt-4 text-xl">If you need the perfect solo piano music for your wedding or party, a focused and dependable on-stage performer, or a creative and knowledgeable piano instructor, you’ve come to the right place.</p>
          </section>
          <section id="info" className="pt-16 flex flex-row flex-wrap gap-x-6 gap-y-6">
            <ButtonInternal title="Repertoire" href="repertoire">Explore Repertoire</ButtonInternal>
            <ButtonInternal title="Contact" href="contact">Contact</ButtonInternal>
            <ButtonInternal title="About" href="about">About</ButtonInternal>
          </section>
        </section>

        <section id="links" className="mt-20 mb-32 px-16 max-w-[1500px] w-full flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-row flex-wrap gap-x-10 gap-y-32 items-center justify-center text-center">
            <div>
              <h2 id="user-data" className="mb-4 text-4xl">Looking for piano lessons?</h2>
              <p className="text-xl">Enrolling students of all ages and levels!</p>
              <p className="mt-2 mb-8 text-xl">Learn piano online or in-person in the Cincinnati area.</p>
              <ButtonInternal title="Learn More" href="lessons">Learn More</ButtonInternal>
            </div>
            <div>
              <h2 id="user-data" className="mb-4 text-4xl">See William’s live performances!</h2>
              <p className="text-xl">Piano and keyboard performances across America.</p>
              <p className="mt-2 mb-8 text-xl">Check out upcoming live performances:</p>
              <ButtonInternal title="Calendar" href="calendar">Calendar</ButtonInternal>
            </div>
            <div>
              <h2 id="user-data" className="mb-4 text-4xl">Follow William on Social Media:</h2>
              <div className="flex flex-row flex-wrap gap-x-6 gap-y-6">
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