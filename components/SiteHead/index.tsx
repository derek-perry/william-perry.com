import { FC } from 'react';
import Head from 'next/head';

interface ISiteHeadProps {
  title: string | null;
  description: string | null;
  url: string | null;
  image: string | null;
}

const SiteHead: FC<ISiteHeadProps> = ({
  title,
  description,
  url,
  image
}): JSX.Element => {
  const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : 'https://william-perry.com';
  const titleValid = title ? title : 'William Perry';
  const descriptionValid = description ? description : 'William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.';
  const urlValid = url ? url : '';
  const imageValid = image ? image : (siteUrl + '/banner.png');
  const imageAltValid = image ? titleValid : 'Banner for William-Perry.com with portrait and white text on red background with piano in foreground';
  return (
    <Head>
      <meta charSet='UTF-8' />
      <meta name='robots' content='max-snippet:-1,max-image-preview:standard,max-video-preview:-1' />

      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <title>{titleValid}</title>
      <meta property='og:title' key='title' content={titleValid} />
      <meta property='og:description' content={descriptionValid} />
      <meta name='description' content={descriptionValid} />
      <meta property='og:url' content={siteUrl + '/' + urlValid} />
      <meta property='og:site_name' content='William Perry' />
      <meta property='og:image' content={imageValid} />
      <meta property='og:image:width' content='1920' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:image:alt' content={imageAltValid} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={titleValid} />
      <meta name='twitter:description' content={descriptionValid} />
      <meta name='twitter:image' content={imageValid} />
      <meta name='twitter:image:width' content='1920' />
      <meta name='twitter:image:height' content='1080' />
      <meta name='twitter:image:alt' content={imageAltValid} />

      <link rel='icon' href={siteUrl + '/favicon.ico'} />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#853535' />
      <link rel='manifest' href={siteUrl + '/manifest.webmanifest'} />
      <meta name='apple-mobile-web-app-title' content='William Perry' />
      <meta name='application-name' content='William Perry' />
      <meta name='msapplication-TileColor' content='#853535' />
      <meta name='msapplication-TileImage' content={siteUrl + '/mstile-144x144.png'} />
      <meta name='theme-color' content='#FFFFFF' />
    </Head>
  );
};

export default SiteHead;