import React from 'react';
import { Accordion, Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { Site } from '../contexts/sites';
import { SiteArticles, Article, ArticlesContext, ArticlesAdjustmentContext } from '../contexts/articles';
import { getCurrentNews } from '../services/server';

    // constructor(props: LinkPickerProps) {
    //     super(props);
    //     const siteArticles = getCurrentNews(props.sites.map(site => site.url));
    //     this.state = {
    //         articles: [],
    //         checkedUrls: new Set<string>(),
    //     } as LinkPickerState;
    //     for (const site of siteArticles) {
    //         this.state.articles.push(
    //             {
    //                 site: props.sites.find(site => site.url == site.url)!,
    //                 articles: site.articles.map(article => { return { url: article.url } }),
    //             }
    //         )
    //     }
    // }



interface LinkPickerProps {
    sites: Array<Site>;
    summarizeCbk: (urls: Array<string>) => void;
}

export function LinkPicker(props: LinkPickerProps) {
    const [articles, setArticles] = React.useState([] as Array<SiteArticles>);

    const toggleChecked = React.useCallback(
        (toggledArticle: Article) => {
            let newArticles = [...articles];
            for (let siteArticles of newArticles) {
                for (let article of siteArticles.articles) {
                    if (article == toggledArticle) {
                        article.checked = !article.checked;
                    }
                }
            }
            setArticles(newArticles);
        },
        [setArticles]
    );

    return (
        <ArticlesContext.Provider value={articles}>
            <ArticlesAdjustmentContext.Provider value={{ toggleChecked }}>
                <LinkPickerBox summarizeCbk={props.summarizeCbk}></LinkPickerBox>
            </ArticlesAdjustmentContext.Provider>
        </ArticlesContext.Provider>

    );
}

interface LinkPickerBoxProps {
    summarizeCbk: (urls: Array<string>) => void;
}

function LinkPickerBox(props: LinkPickerBoxProps) {
    const articles = React.useContext(ArticlesContext);
    const { toggleChecked } = React.useContext(ArticlesAdjustmentContext);
    return (
        <>
            <h1>Links to summarize</h1>
            <Accordion defaultActiveKey={[]} alwaysOpen>
                {articles.map((siteArticles, siteIdx) => {
                    // get number of checked articles on this site
                    const checkedArticles = siteArticles.articles.filter(article => article.checked).length;
                    const checkedArticlesStr = checkedArticles > 0 ? `(${checkedArticles}) ` : '';
                    return (
                        <Accordion.Item eventKey={`${siteIdx}`} key={`${siteIdx}`}>
                            <Accordion.Header><h4>{checkedArticlesStr + siteArticles.site.name}</h4></Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {siteArticles.articles.map((article, articleIdx) => {
                                        const checkbox_id = `article-checkbox-${siteIdx}-${articleIdx}`;
                                        return (
                                            <ListGroupItem key={article.url}>
                                                <Form>
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={article.checked}
                                                        id={checkbox_id}
                                                        onChange={(e) => {
                                                            toggleChecked!(article);
                                                        }}
                                                    />
                                                    <Form.Label htmlFor={checkbox_id}>{article.url}</Form.Label>
                                                </Form>
                                            </ListGroupItem>
                                        );
                                    })}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
            <Button
                variant="primary"
                onClick={() => props.summarizeCbk(articles.flatMap(site => site.articles).filter(article => article.checked).map(article => article.url))}
            >
                Summarize
            </Button>
        </>
    );
}