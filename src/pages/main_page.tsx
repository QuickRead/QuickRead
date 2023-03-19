import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import LinkPicker from "../components/link_picker";
import { Site, SiteAdjustmentContext, SiteContext } from "../contexts/sites";
import { BurgerMenu } from "../components/burger_menu";
import { SitePicker } from "../components/site_picker";

import 'bootstrap/dist/css/bootstrap.min.css';

const defaultSites = [
  {
    name: 'seznma.cz',
    url: 'https://www.seznam.cz'
  },
  {
    name: 'novinky.cz',
    url: 'https://www.novinky.cz'
  },
  {
    name: 'idnes.cz',
    url: 'https://www.idnes.cz'
  },
]

const IndexPage: React.FC<PageProps> = () => {
  const [sites, setSites] = React.useState(defaultSites);

  const addSite = React.useCallback(
    (site: Site) => setSites(sites => [site, ...sites]),
    [setSites]
  );
  const removeSite = React.useCallback(
    (url: string) => setSites(sites => sites.filter(s => s.url != url)),
    [setSites]
  );

  return (
    <main>
      <SiteContext.Provider value={sites} >
        <SiteAdjustmentContext.Provider value={{ add: addSite, remove: removeSite }}>
          <BurgerMenu>
            <SitePicker />
          </BurgerMenu>
        </SiteAdjustmentContext.Provider>
      </SiteContext.Provider>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
