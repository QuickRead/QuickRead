interface Summary {
  meta_summary: string;
  sites: Array<SiteSummary>;
}

export interface SiteSummary {
  siteUrl: string,
  articles: Array<ArticleSummary>,
}

export interface ArticleSummary {
  url: string,
  title: string,
  text: string,
}

export async function getSummaries(urls: Array<string>): Promise<Summary> {
  return {
    meta_summary: "This is a meta summary",
    sites: [
      {
        siteUrl: "https://www.idnes.cz",
        articles: [
          {
            url: "https://www.cnn.com/2020/05/01/politics/bernie-sanders-endorsements/index.html",
            title: "Bernie Sanders' endorsements: Who has backed the Vermont senator?",
            text: "Bernie Sanders has been endorsed by a number of prominent politicians and activists, including Alexandria Ocasio-Cortez, Ilhan Omar and Elizabeth Warren. Here's a list of who has endorsed the Vermont senator."
          },
        ]
      }
    ]
  }

  //TODO: Hacky, better globally and statically set URL
  const endpoint = window.location.origin + '/api/summarize';

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ urls: urls })
  });

  const summaries = response.json()

  return summaries;
}
