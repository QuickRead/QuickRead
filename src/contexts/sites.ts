import * as React from "react"

export interface Site {
  name: string,
  url: string,
}

export const SiteContext = React.createContext<Array<Site>>([]);

