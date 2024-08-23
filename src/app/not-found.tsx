import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/Button"
import { Icons } from "@/components/Icons"
import { ModeToggle } from "@/components/ModeToggle"

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Icons.logo className="h-16 w-16" />
        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          Content Not Found
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          The content you are looking for has moved, is no longer available, has been archived, or was not valid.
        </p>
        <div className="flex gap-2">
          <Link
            href={siteConfig.links.home}
            className={cn(buttonVariants({ size: "default" }))}
          >
            Home
          </Link>
          <Link
            href={siteConfig.links.about}
            className={cn(buttonVariants({ size: "default" }))}
          >
            About
          </Link>
          <Link
            href="/event/test?id=1"
            className={cn(buttonVariants({ size: "default" }))}
          >
            Event 1
          </Link>
          <ModeToggle />
        </div>
      </div>
    </main>
  )
}
