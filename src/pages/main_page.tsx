import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import { Site, SiteAdjustmentContext, SiteContext } from "../contexts/sites";
import { BurgerMenu } from "../components/burger_menu";
import { SitePicker } from "../components/site_picker";

import 'bootstrap/dist/css/bootstrap.min.css';
import { ArticleSummarization, MetaSummarization, SiteSummarization } from "../components/summarizations";

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


const article_summaries = [
  {
    url: 'https://www.idnes.cz',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed cras ornare arcu dui. Montes nascetur ridiculus mus mauris vitae. Pretium lectus quam id leo in vitae. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Dignissim sodales ut eu sem integer. Pharetra magna ac placerat vestibulum lectus. Ornare lectus sit amet est placerat in egestas erat imperdiet. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Natoque penatibus et magnis dis parturient montes nascetur. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At quis risus sed vulputate odio ut enim blandit. Ultrices neque ornare aenean euismod. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Elit sed vulputate mi sit amet mauris commodo quis. Ut consequat semper viverra nam libero justo laoreet sit. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
  },
  {
    url: 'https://www.idnes.cz/1',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed cras ornare arcu dui. Montes nascetur ridiculus mus mauris vitae. Pretium lectus quam id leo in vitae. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Dignissim sodales ut eu sem integer. Pharetra magna ac placerat vestibulum lectus. Ornare lectus sit amet est placerat in egestas erat imperdiet. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Natoque penatibus et magnis dis parturient montes nascetur. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At quis risus sed vulputate odio ut enim blandit. Ultrices neque ornare aenean euismod. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Elit sed vulputate mi sit amet mauris commodo quis. Ut consequat semper viverra nam libero justo laoreet sit. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
  },
  {
    url: 'https://www.idnes.cz/2',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed cras ornare arcu dui. Montes nascetur ridiculus mus mauris vitae. Pretium lectus quam id leo in vitae. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Dignissim sodales ut eu sem integer. Pharetra magna ac placerat vestibulum lectus. Ornare lectus sit amet est placerat in egestas erat imperdiet. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Natoque penatibus et magnis dis parturient montes nascetur. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At quis risus sed vulputate odio ut enim blandit. Ultrices neque ornare aenean euismod. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Elit sed vulputate mi sit amet mauris commodo quis. Ut consequat semper viverra nam libero justo laoreet sit. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
  },
  {
    url: 'https://www.idnes.cz/3',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed cras ornare arcu dui. Montes nascetur ridiculus mus mauris vitae. Pretium lectus quam id leo in vitae. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Dignissim sodales ut eu sem integer. Pharetra magna ac placerat vestibulum lectus. Ornare lectus sit amet est placerat in egestas erat imperdiet. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Natoque penatibus et magnis dis parturient montes nascetur. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At quis risus sed vulputate odio ut enim blandit. Ultrices neque ornare aenean euismod. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Elit sed vulputate mi sit amet mauris commodo quis. Ut consequat semper viverra nam libero justo laoreet sit. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
  },
  {
    url: 'https://www.idnes.cz/4',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed cras ornare arcu dui. Montes nascetur ridiculus mus mauris vitae. Pretium lectus quam id leo in vitae. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Dignissim sodales ut eu sem integer. Pharetra magna ac placerat vestibulum lectus. Ornare lectus sit amet est placerat in egestas erat imperdiet. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Natoque penatibus et magnis dis parturient montes nascetur. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At quis risus sed vulputate odio ut enim blandit. Ultrices neque ornare aenean euismod. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Elit sed vulputate mi sit amet mauris commodo quis. Ut consequat semper viverra nam libero justo laoreet sit. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.",
  },
]

const site_summaries = defaultSites.map(
  s => ({ site: s, articles: article_summaries })
)

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
        <SiteAdjustmentContext.Provider value={
          { add: addSite, remove: removeSite, set: setSites}
        }>
          <BurgerMenu title="Available source">
            <SitePicker />
          </BurgerMenu>

          <MetaSummarization text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed cras ornare arcu dui. Montes nascetur ridiculus mus mauris vitae. Pretium lectus quam id leo in vitae. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Dignissim sodales ut eu sem integer. Pharetra magna ac placerat vestibulum lectus. Ornare lectus sit amet est placerat in egestas erat imperdiet. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Natoque penatibus et magnis dis parturient montes nascetur. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At quis risus sed vulputate odio ut enim blandit. Ultrices neque ornare aenean euismod. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Elit sed vulputate mi sit amet mauris commodo quis. Ut consequat semper viverra nam libero justo laoreet sit. Elit ullamcorper dignissim cras tincidunt lobortis feugiat." />
          {site_summaries.map(s => <SiteSummarization key={s.site.url} {...s} />)}
        </SiteAdjustmentContext.Provider>
      </SiteContext.Provider>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
