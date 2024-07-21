import { GetServerSideProps, NextPage } from 'next';
import { apiGetPage, pagesProps, pageProps } from '../lib/api';
import Page from '../components/Page';

interface IPagePageProps {
  pages: pagesProps | null;
  page: pageProps | null;
};

const pagePage: NextPage<IPagePageProps> = ({ pages, page }) => {
  if (pages && pages.data && pages.data.length > 0) {
    page = pages.data[0];
  } else {
    page = null;
  };

  function stringWithLineBreaks(inputString: string) {
    return inputString.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
  };

  return (
    <>
      {page && page.attributes.Title ? (
        <Page
          title={`${page.attributes.Title} - William Perry`}
          description={page.attributes.SEODescription ? page.attributes.SEODescription : 'William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.'}
          url={page.attributes.Slug}
          image={page.attributes.Image?.data ? page.attributes.Image.data?.attributes.url : ``}
        >
          <article
            className='max-w-[1000px]'
            id={page.attributes.Title}
          >
            <h1 className='mb-4'>{page.attributes.Title}</h1>
            <p className='mt-4 text-left' dangerouslySetInnerHTML={{ __html: stringWithLineBreaks(page.attributes.Content) }} />
          </article>
        </Page>
      ) :
        (
          <Page
            title='Page Not Found - William Perry'
            description='William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.'
            url='page-not-found'
            image=''
          >
            <article
              className='max-w-[680px]'
              id='page-not-found'
            >
              <h1 className='mb-4'>Error 404: Page Not Found</h1>
              <p className='mt-2 text-2xl'>The page you are looking for has moved, is no longer available, has been archived, or was not valid.</p>
            </article>
          </Page>
        )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    var urlReq = context.req!.url;
    var url = '';
    if (urlReq) {
      if (urlReq.includes('_next')) {
        const urlREGEXDev = urlReq.match(/\/([^/.]*)\.json/);
        const urlREGEXDevItem = urlREGEXDev?.[1];
        url = `${urlREGEXDevItem}`;
      } else {
        const urlREGEX = urlReq.match(/^\/([^/\?]+)/);
        if (urlREGEX) {
          const urlREGEXLocalItem = urlREGEX[1];
          url = urlREGEXLocalItem;
        } else {
          const urlREGEXWithoutSlash = urlReq.match(/^[^/\?]+/);
          const urlREGEXRemoteItem = urlREGEXWithoutSlash?.[0];
          url = `${urlREGEXRemoteItem}`;
        };
      };
    };
    const response = await apiGetPage.get(
      (url as string) || ''
    );
    return {
      props: {
        pages: response.data
      }
    };
  } catch (e) {
    return {
      props: {
        pages: null
      }
    };
  };
};

export default pagePage;
