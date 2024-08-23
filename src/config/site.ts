import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "William Perry",
  author: "William Perry",
  description:
    "William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.",
  keywords: ["piano", "pianist", "electronic keyboardist", "teacher", "educator", "william", "will", "perry", "will perry", "william perry", "cincinnati", "cincinnati ohio", "ohio"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://william-perry.com",
  },
  links: {
    home: "/",
    about: "/about",
    github: "https://github.com/derek-perry/william-perry.com",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
  ogImageWidth: 1920,
  ogImageHeight: 1080,
  ogImageAlt: 'William Perry',
}
