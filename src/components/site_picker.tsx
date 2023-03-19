import React from 'react';
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import { Site, SiteAdjustmentContext, SiteContext } from '../contexts/sites';

function createSite(url: string) {
  if (!url.startsWith('http')) {
    url = `https://${url}`
  }

  const name = new URL(url).hostname
  return {
    name: name,
    url: url,
    articles: []
  };
}

export function SitePicker() {
  const sites = React.useContext(SiteContext);
  const [newUrl, setNewUrl] = React.useState('');
  const {
    remove: removeSite,
    set: setSites,
  } = React.useContext(SiteAdjustmentContext);


  return (
    <div className="container mt-3">
      <ListGroup>
        {sites.map((site: Site) => {
          return (
            <ListGroupItem key={site.url}>
              <h4>{site.name}</h4>
              <small>{site.url}</small>
              <Button className="float-end" onClick={
                () => removeSite && removeSite(site.url)
              }>
                <FaTrash />
              </Button>
            </ListGroupItem>
          );
        })
        }
      </ListGroup>
      <div className='mb-4' />
      <InputGroup>
        <Form.Control
          type="url"
          placeholder="Source url..."
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />

        <Button variant="primary" onClick={() => {
          if (setSites != null) {
            setSites((sites: Array<Site>) => {
              const newSite = createSite(newUrl);
              if (!sites.some(site => site.url == newSite.url)) {
                return [...sites, newSite];
              }

              return sites;
            });
            setNewUrl('');
          }
        }}> Add </Button>
      </InputGroup>
    </div>
  );
}
