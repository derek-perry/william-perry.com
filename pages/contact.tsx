import type { NextPage } from 'next';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';
import LinkExternal from '../components/Links/LinkExternal';
import ButtonExternal from '../components/Buttons/ButtonExternal';

const contactPage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="Contact William Perry" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="contact" image="" />

      <main className="bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center">
        <section id="contact">
          <div className="px-9 max-md:mt-10 md:mt-20 mb-28 max-w-[1000px] text-left">
            <h1 className="mb-4">Get in Contact</h1>
            <p className="text-xl">If you’d like to book William Perry to play for your event, inquire about piano lessons, or have any other questions, send an email to <LinkExternal className="max-sm:break-all" href="mailto:contact@william-perry.com" title="Contact William Perry via Email at Contact@William-Perry.com">Contact@William-Perry.com</LinkExternal></p>
            <h2 id="user-data" className="mt-10 mb-4">Follow William on Social Media:</h2>
            <div className="flex flex-row flex-wrap gap-x-6 gap-y-6">
              <ButtonExternal title="LinkedIn" href="https://linkedin.com/in/william-perry-b8b7405a">LinkedIn</ButtonExternal>
              <ButtonExternal title="Instagram" href="https://instagram.com/WPerryMusic">Instagram</ButtonExternal>
              <ButtonExternal title="YouTube" href="https://youtube.com/channel/UCyKOObVbhSWyCQPNAg3NggA">YouTube</ButtonExternal>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div >
  );
};

export default contactPage;