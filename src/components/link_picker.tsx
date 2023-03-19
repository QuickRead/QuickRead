import React from 'react';
import { Accordion, Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { Site } from '../contexts/sites';
import { getCurrentNews } from '../services/server';


interface LinkPickerState {
    articles: Array<SiteArticles>;
    checkedUrls: Set<string>;
}

interface SiteArticles {
    site: Site;
    articles: Array<Article>;
}

interface Article {
    url: string;
}

interface LinkPickerProps {
    sites: Array<Site>;
    summarizeCbk: () => void;
}

export default class LinkPicker extends React.Component<LinkPickerProps> {
    state: LinkPickerState;

    constructor(props: LinkPickerProps) {
        super(props);
        const siteArticles = getCurrentNews(props.sites.map(site => site.url));
        this.state = {
            articles: [],
            checkedUrls: new Set<string>(),
        } as LinkPickerState;
        for (const site of siteArticles) {
            this.state.articles.push(
                {
                    site: props.sites.find(site => site.url == site.url)!,
                    articles: site.articles.map(article => { return { url: article.url } }),
                }
            )
        }
    }


    render() {
        return (
            <>
                <h1>Links to summarize</h1>
                <Accordion defaultActiveKey={[]} alwaysOpen>
                    {this.state.articles.map((siteArticles, i) => {
                        return (
                            <Accordion.Item eventKey={`${i}`} key={`${i}`}>
                                <Accordion.Header><h4>{siteArticles.site.name}</h4></Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        {siteArticles.articles.map((article) => {
                                            return (
                                                <ListGroupItem key={article.url}>
                                                    <Form>
                                                        <Form.Check
                                                            type="checkbox"
                                                            checked={this.state.checkedUrls.has(article.url)}
                                                            id={`article-checkbox-${i}`}
                                                            onChange={(e) => {
                                                                this.toggleChecked(article.url);
                                                            }}
                                                        />
                                                        <Form.Label htmlFor={`article-checkbox-${i}`}>{article.url}</Form.Label>
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
                <Button variant="primary" onClick={() => this.props.summarizeCbk()}>
                    Summarize
                </Button>
            </>
        );
    }

    toggleChecked(url: string) {
        this.state.checkedUrls.has(url) ? this.state.checkedUrls.delete(url) : this.state.checkedUrls.add(url)
    }
}