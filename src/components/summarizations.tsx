import * as React from 'react';
import { Accordion, AccordionContext, Button, Collapse, useAccordionButton } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Site } from '../contexts/sites';

interface ArticleSummary {
  url: string,
  text: string
}

export function ArticleSummarization(props: ArticleSummary) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{props.url}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.url}</Card.Subtitle>
        <Card.Text>{props.text}</Card.Text>
        <Card.Link style={{ 'float': 'right' }} href={props.url}>
          Visit source
        </Card.Link>
      </Card.Body>
    </Card>
  );
}


interface SiteSummarizationProps {
  site: Site,
  articles: Array<ArticleSummary>,
}

const siteSummaryHeader = {
  display: 'grid',
  gridTemplateColumns: '9fr 1fr',
  alignItems: 'end',
  cursor: 'pointer',
}

export function SiteSummarization(props: SiteSummarizationProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <h1
        className="display-4 border-bottom pb-2"
        style={siteSummaryHeader}
        onClick={() => setOpen(open => !open)}
      >
        {props.site.name}
        <span style={{fontSize: '2rem'}}>
          {open ? <FaArrowUp /> : <FaArrowDown />}
        </span>
      </h1>
      <div className='mb-3' />
      <Collapse in={open}>
        <div>
          {props.articles.map(a => <ArticleSummarization key={a.url} {...a} />)}
        </div>
      </Collapse>
    </>
  )
}

interface MetaSummarizationProps {
  text: string,
}

export function MetaSummarization(props: MetaSummarizationProps) {
  return (
    <div className="mb-5">
        <h1 className='display-1'>
          Summarization
        </h1>
      <p style={{width: '90%'}}>
        {props.text}
      </p>
    </div>
  );

}

