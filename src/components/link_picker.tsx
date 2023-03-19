import React from 'react';
import { Accordion, Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { Site, Article, SiteContext, SiteAdjustmentContext } from '../contexts/sites';
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
    return (
        <LinkPickerBox summarizeCbk={props.summarizeCbk}></LinkPickerBox>

    );
}

interface LinkPickerBoxProps {
    summarizeCbk: (urls: Array<string>) => void;
}

function LinkPickerBox(props: LinkPickerBoxProps) {
    const sites = React.useContext(SiteContext);
    const { toggleChecked } = React.useContext(SiteAdjustmentContext);
    return (
        <>
            <h1>Links to summarize</h1>
            <Accordion defaultActiveKey={[]} alwaysOpen>
                {sites.map((siteArticles, siteIdx) => {
                    // get number of checked articles on this site
                    const checkedArticles = siteArticles.articles.filter(article => article.checked).length;
                    const checkedArticlesStr = checkedArticles > 0 ? `(${checkedArticles}) ` : '';
                    return (
                        <Accordion.Item eventKey={`${siteIdx}`} key={`${siteIdx}`}>
                            <Accordion.Header><h4>{checkedArticlesStr + siteArticles.name}</h4></Accordion.Header>
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
                onClick={() => props.summarizeCbk(sites.flatMap(site => site.articles).filter(article => article.checked).map(article => article.url))}
            >
                Summarize
            </Button>
        </>
    );
}