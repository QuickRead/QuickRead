interface SiteArticles {
    url: string;
    articles: Array<Article>;
}

interface Article {
    site: string;
    url: string;
    title: string;
    icon: string;
}

function getCurrentNews(sites: Array<string>): Array<SiteArticles> {
    // TODO: call the server

    // mock implementation:
    let result: Array<SiteArticles> = []
    for (const site of sites) {
        let articles: Array<Article> = []
        for (let i = 0; i < 3; i++) {
            articles.push({
                site,
                title: "Clanek " + i,
                url: site + "/clanek/" + i 
            } as Article)
        }
        result.push({
            url: site,
            articles
        })
    }
    return result;
}


export { getCurrentNews, Article }