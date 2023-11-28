import LinkInternal from '../Links/LinkInternal';

const PageFooter = (): JSX.Element => {
  let currentYear: number = new Date().getFullYear();

  return (
    <footer className="border-t border-wpRed bg-wpWhite text-wpBlack text-xl w-full">
      <div className="pt-16 pb-12 px-9 flex flex-col gap-y-10 text-center items-center justify-center">
        <div className="flex flex-row flex-wrap gap-x-[73px] gap-y-7 text-center items-center justify-center">
          <LinkInternal href="" title="Home">Home</LinkInternal>
          <LinkInternal href="lessons" title="Lessons">Lessons</LinkInternal>
          <LinkInternal href="repertoire" title="Repertoire">Repertoire</LinkInternal>
          <LinkInternal href="videos" title="Videos">Videos</LinkInternal>
          <LinkInternal href="calendar" title="Calendar">Calendar</LinkInternal>
          <LinkInternal href="about" title="About">About</LinkInternal>
          <LinkInternal href="contact" title="Contact">Contact</LinkInternal>
        </div>
        <div className="flex flex-row flex-wrap gap-x-[620px] gap-y-4 text-center items-center justify-center">
          <p> © {currentYear} William Perry</p>
          <LinkInternal href="privacy" title="Privacy Policy">Privacy Policy</LinkInternal>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;