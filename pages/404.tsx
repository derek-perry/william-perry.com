import type { NextPage } from 'next';
import SiteHead from '../components/SiteHead';
import PageFooter from '../components/PageFooter';

const error404Page: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SiteHead title="Error 404: Content Not Found" description="William-Perry.com is the official website for William Perry - Pianist, Educator, and Conductor" url="404" />

      <main className="bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center">
        <section id="500">
          <div className="px-9 max-md:mt-10 md:mt-20 mb-28 max-w-[1000px] text-left">
            <h1 className="mb-4 text-6xl text-red-600">Error 404: Content Not Found</h1>
            <p className="text-xl">The page/content you are looking for has moved, is no longer available, or has been archived.</p>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default error404Page;