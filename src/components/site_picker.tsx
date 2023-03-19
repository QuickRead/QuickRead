import React from 'react';
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import { Site, SiteAdjustmentContext, SiteContext } from '../contexts/sites';

function createSite(url: string) {
  const name = new URL(url).host
  return {
    name: name,
    url: url
  };
}

export function SitePicker() {
  const sites = React.useContext(SiteContext);
  const [newUrl, setNewUrl] = React.useState('');
  const { add: addSite, remove: removeSite } = React.useContext(SiteAdjustmentContext);


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
          if (addSite != null) {
            addSite(createSite(newUrl));
            setNewUrl('');
          }
        }}> Add </Button>
      </InputGroup>
    </div>
  );
}
