import { FC } from 'react';
import Head from 'next/head';

interface ISiteHeadProps {
  title: string;
  description: string;
  url: string;
};

const SiteHead: FC<ISiteHeadProps> = ({
  title,
  description,
  url
}): JSX.Element => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="robots" content="max-snippet:-1,max-image-preview:standard,max-video-preview:-1" />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <title>{title}</title>
      <meta property="og:title" key="title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL + '/' + url || 'https://william-perry.com'} />
      <meta property="og:site_name" content="William Perry" />
      <meta property="og:image" content={process.env.NEXT_PUBLIC_SITE_URL + '/banner.png' || 'https://william-perry.com/banner.png'} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:alt" content="Banner for william-perry.com with portrait and white text on red background with piano in foreground" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={process.env.NEXT_PUBLIC_SITE_URL + '/banner.png' || 'https://william-perry.com/banner.png'} />
      <meta name="twitter:image:width" content="1920" />
      <meta name="twitter:image:height" content="1080" />
      <meta name="twitter:image:alt" content="Banner for william-perry.com with portrait and white text on red background with piano in foreground" />
      <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://william-perry.com'} />

      <link rel="icon" href={process.env.NEXT_PUBLIC_SITE_URL + '/favicon.ico' || 'https://william-perry.com/favicon.ico'} />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#853535" />
      <link rel="manifest" href={process.env.NEXT_PUBLIC_SITE_URL + '/manifest.webmanifest' || 'https://william-perry.com/manifest.webmanifest'} />
      <meta name="apple-mobile-web-app-title" content="William Perry" />
      <meta name="application-name" content="William Perry" />
      <meta name="msapplication-TileColor" content="#853535" />
      <meta name="msapplication-TileImage" content={process.env.NEXT_PUBLIC_SITE_URL + '/mstile-144x144.png' || 'https://william-perry.com/mstile-144x144.png'} />
      <meta name="theme-color" content="#FFFFFF" />
    </Head>
  );
};

export default SiteHead;