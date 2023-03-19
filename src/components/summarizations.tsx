import * as React from 'react';
import { Collapse } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Site, ArticleSummary, SiteSummary, Summary } from '../contexts/sites';

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


const siteSummaryHeader = {
  display: 'grid',
  gridTemplateColumns: '9fr 1fr',
  alignItems: 'end',
  cursor: 'pointer',
}

export function SiteSummarization(props: SiteSummary) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <h1
        className="display-4 border-bottom pb-2"
        style={siteSummaryHeader}
        onClick={() => setOpen(open => !open)}
      >
        {props.site.name}
        <span style={{ fontSize: '2rem' }}>
          {open ? <BsChevronUp /> : <BsChevronDown />}
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
      <p style={{ width: '90%' }}>
        {props.text}
      </p>
    </div>
  );
}

interface SummarizationProps {
  summary: Summary | null
}

export function Summarization(props: SummarizationProps) {
  if (props.summary == null) {
    return (<></>);
  }
  return (
    <>
      <MetaSummarization text={props.summary.meta_summary} />
      {props.summary.sites.map(s => <SiteSummarization key={s.site.url} {...s} />)}
    </>
  )
}

