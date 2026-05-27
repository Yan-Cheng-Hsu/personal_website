import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Simple visitor tracking
export function trackVisitor() {
  if (typeof window !== 'undefined') {
    // Get visitor info
    const visitorInfo = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: `${screen.width}x${screen.height}`,
      referrer: document.referrer,
      url: window.location.href,
      // You can add IP tracking via backend API
    }

    // Store in localStorage for now (you'd want to send to backend)
    const visitors = JSON.parse(localStorage.getItem('siteVisitors') || '[]')
    visitors.push(visitorInfo)
    localStorage.setItem('siteVisitors', JSON.stringify(visitors))

    // Log for development
    console.log('Visitor tracked:', visitorInfo)

    // Send to your analytics endpoint
    // fetch('/api/track', { method: 'POST', body: JSON.stringify(visitorInfo) })
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function Analytics() {
  const router = useRouter()

  useEffect(() => {
    // Track initial page load
    trackVisitor()

    // Track route changes (only when GA is configured)
    const handleRouteChange = (url: string) => {
      if (!GA_ID) return
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_ID, {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Skip GA scripts entirely in dev / when not configured
  if (!GA_ID) return null

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            custom_map: {
              'dimension1': 'visitor_company',
              'dimension2': 'visitor_role'
            }
          });
        `}
      </Script>

      {/* Vercel Analytics (automatically works when deployed) */}
    </>
  )
}