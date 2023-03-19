import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import { SiteContext } from "../contexts/sites";
import LinkPicker from "../components/link_picker";
import { BurgerMenu } from "../components/burger_menu";


const defaultSites = [
  {
    name: 'Seznam',
    url: 'https://www.seznam.cz'
  },
  {
    name: 'Novinky',
    url: 'https://www.novinky.cz'
  },
  {
    name: 'idnes',
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
        <BurgerMenu sites={sites} addSite={addSite} removeSite={removeSite} />
      </SiteContext.Provider>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
