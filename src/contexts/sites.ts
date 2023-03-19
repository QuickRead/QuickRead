import * as React from "react"

export interface Site {
  name: string;
  url: string;
  articles: Array<Article> | null;
}

export interface Article {
  url: string;
  checked: boolean;
}

export const SiteContext = React.createContext<Array<Site>>([]);

export interface SiteAdjustment {
  add: ((site: Site) => void) | null,
  remove: ((url: string) => void) | null,
  set: React.Dispatch<React.SetStateAction<Array<Site>>> | null,
  toggleChecked: ((article: Article) => void) | null,
}

export const SiteAdjustmentContext = React.createContext<SiteAdjustment>(
  { add: null, remove: null, set: null, toggleChecked: null }
)

