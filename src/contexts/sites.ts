import * as React from "react"

export interface Site {
  name: string,
  url: string,
}

export const SiteContext = React.createContext<Array<Site>>([]);

export interface SiteAdjustment {
  add: ((site: Site) => void) | null,
  remove: ((url: string) => void) | null,
  set: React.Dispatch<React.SetStateAction<Array<Site>>> | null,
}

export const SiteAdjustmentContext = React.createContext<SiteAdjustment>(
  { add: null, remove: null, set: null }
)

