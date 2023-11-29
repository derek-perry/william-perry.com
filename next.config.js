/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  crossOrigin: 'anonymous',
  images: {
    domains: ['localhost', 'william-perry.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        "source": "/index",
        "destination": "/",
        "permanent": true
      },
      {
        "source": "/home",
        "destination": "/",
        "permanent": true
      },
      {
        "source": "/homepage",
        "destination": "/",
        "permanent": true
      },
      {
        "source": "/piano-lessons",
        "destination": "/lessons",
        "permanent": true
      },
      {
        "source": "/piano-lesson",
        "destination": "/lessons",
        "permanent": true
      },
      {
        "source": "/pianolessons",
        "destination": "/lessons",
        "permanent": true
      },
      {
        "source": "/pianolesson",
        "destination": "/lessons",
        "permanent": true
      },
      {
        "source": "/songs",
        "destination": "/repertoire",
        "permanent": true
      },
      {
        "source": "/music",
        "destination": "/repertoire",
        "permanent": true
      },
      {
        "source": "/pieces",
        "destination": "/repertoire",
        "permanent": true
      },
      {
        "source": "/recordings",
        "destination": "/videos",
        "permanent": true
      },
      {
        "source": "/recording",
        "destination": "/videos",
        "permanent": true
      },
      {
        "source": "/video",
        "destination": "/videos",
        "permanent": true
      },
      {
        "source": "/events",
        "destination": "/calendar",
        "permanent": true
      },
      {
        "source": "/schedule",
        "destination": "/calendar",
        "permanent": true
      },
      {
        "source": "/bio",
        "destination": "/about",
        "permanent": true
      },
      {
        "source": "/biography",
        "destination": "/about",
        "permanent": true
      },
      {
        "source": "/privacypolicy",
        "destination": "/privacy",
        "permanent": true
      },
      {
        "source": "/privacy-policy",
        "destination": "/privacy",
        "permanent": true
      },
      {
        "source": "/cookie",
        "destination": "/privacy",
        "permanent": true
      },
      {
        "source": "/cookies",
        "destination": "/privacy",
        "permanent": true
      },
      {
        "source": "/cookiepolicy",
        "destination": "/privacy",
        "permanent": true
      },
      {
        "source": "/cookie-policy",
        "destination": "/privacy",
        "permanent": true
      }
    ]
  }
}

module.exports = nextConfig
