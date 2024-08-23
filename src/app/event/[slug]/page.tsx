import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/Button"
import { Icons } from "@/components/Icons"
import { ModeToggle } from "@/components/ModeToggle"

import GetUsers from "@/services/APIGetUser"

interface EventProps {
  params: any; // Replace 'any' with the appropriate type for 'params'
}

export default async function Event({params}: EventProps) {
  let data = await GetUsers();
  data = data.concat(data);

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Icons.logo className="h-16 w-16" />
        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {siteConfig.description}
          <br />
          {params.slug ? `${params.slug}` : "Unknown Slug"}
          <br />
          {(data && data.length > 0) ? `Users: ${data.length}` : "No Users"}
          <br />
          {(data && data.length > 0) ? `First User's Name: ${data[0].name}` : "No Users"}
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
          <ModeToggle />
        </div>
      </div>
    </main>
  )
}