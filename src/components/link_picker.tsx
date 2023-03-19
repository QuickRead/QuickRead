import React from 'react';
import { Accordion, Card, AccordionButton, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { Site } from '../contexts/sites';


interface LinkPickerState {
    articles: Array<SiteArticles>;
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
}

export default class LinkPicker extends React.Component {
    state: LinkPickerState;

    constructor(props: LinkPickerProps) {
        super(props);
        this.state = {
            articles: [
                { site: { name: 'Seznam', url: 'https://www.seznam.cz' }, articles: [{ url: 'https://www.seznam.cz/1' }, { url: 'https://www.seznam.cz/2' }] },
                { site: { name: 'BBC', url: 'https://www.bbc.co.uk' }, articles: [{ url: 'https://www.bbc.co.uk/1' }, { url: 'https://www.bbc.co.uk/2' }] },
            ]
        } as LinkPickerState;
    }


    render() {
        return (
            <>
                <h1>Links to summarize</h1>
                <Accordion defaultActiveKey={[]} alwaysOpen>
                    {this.state.articles.map((siteArticles, i) => {
                        return (
                            <Accordion.Item eventKey={`${i}`}>
                                <Accordion.Header><h4>{siteArticles.site.name}</h4></Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        {siteArticles.articles.map((article) => {
                                            return (
                                                <ListGroupItem key={article.url}>
                                                    <Form>
                                                        <Form.Check
                                                            type="checkbox"
                                                            checked={true}
                                                            onChange={(e) => { }}
                                                        />
                                                    </Form>
                                                    <h5>{article.url}</h5>
                                                </ListGroupItem>
                                            );
                                        })}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            </>
        );
    }
}