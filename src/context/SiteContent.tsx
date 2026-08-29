import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fallbackContent, fetchSiteContent, type SiteContent } from '../data/siteContent'

const SiteContentContext = createContext<SiteContent>(fallbackContent)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(fallbackContent)

  useEffect(() => {
    let cancelled = false
    fetchSiteContent()
      .then((data) => {
        if (cancelled || !data?.contact || !Array.isArray(data.services)) return
        setContent({
          contact: { ...fallbackContent.contact, ...data.contact },
          services: data.services.length ? data.services : fallbackContent.services,
          jobs: Array.isArray(data.jobs) ? data.jobs : fallbackContent.jobs,
          socials: Array.isArray(data.socials) ? data.socials : [],
        })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  return useContext(SiteContentContext)
}
