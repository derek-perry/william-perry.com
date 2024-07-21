import type { NextPage } from 'next';
import Page from '../components/Page';

const error404Page: NextPage = () => {
  return (
    <Page
      title='Error 404: Not Found - William Perry'
      description='William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.'
      url='404'
      image=''
    >
      <article
        className='max-w-[680px]'
        id='content-not-found'
      >
        <h1 className='mb-4'>Error 404: Not Found</h1>
        <p className='mt-2 text-2xl'>The content you are looking for has moved, is no longer available, has been archived, or was not valid.</p>
      </article>
    </Page>
  );
};

export default error404Page;