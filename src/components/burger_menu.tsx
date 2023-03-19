import React from 'react';
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import { Site } from '../contexts/sites';

interface BurgerMenuState {
  partialUrlInput: string;
}

interface BurgerMenuProps {
  sites: Array<Site>;
  addSite: (site: Site) => void;
  removeSite: (url: string) => void;
}

export class BurgerMenu extends React.Component<BurgerMenuProps, BurgerMenuState> {
  constructor(props: BurgerMenuProps) {
    super(props);

    this.state = { partialUrlInput: "" } as BurgerMenuState;
  }

  render() {
    // render list of links with buttons to add and remove
    return (
      <div className="container mt-3">
        <h1>Current sources</h1>
        <ListGroup>
          {this.props.sites.map((site) => {
            return (
              <ListGroupItem key={site.url}>
                <h4>{site.name}</h4>
                <small>{site.url}</small>
                <Button className="float-end" onClick={() => this.props.removeSite(site.url)}>
                  <FaTrash />
                </Button>
              </ListGroupItem>
            );
          })
          }
        </ListGroup>
        <InputGroup>
          <Form.Control
            type="url"
            placeholder="New source address"
            value={this.state.partialUrlInput}
            onChange={(e) => this.setInput(e.target.value)}
          />

          <Button variant="primary" onClick={() => this.addUrl()}> Add </Button>
        </InputGroup>
      </div>
    );
  }

  addUrl() {
    const name = new URL(this.state.partialUrlInput).host
    this.props.addSite({ url: this.state.partialUrlInput, name });
    this.setState({ partialUrlInput: "" } as BurgerMenuState);
  }


  setInput(newInput: string) {
    this.setState({ partialUrlInput: newInput } as BurgerMenuState);
  }
}
