import React from 'react';
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";

interface BurgerMenuState {
    partialUrlInput: string;
}

interface BurgerMenuProps {
    sites: Array<string>;
    addLinkCbk: (link: string) => void;
    removeLinkCbk: (link: string) => void;
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
                            <ListGroupItem>
                                <div>{site}</div>
                                <Button className="float-end" onClick={() => this.removeUrl(site)}><FaTrash /></Button>
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
        this.props.addLinkCbk(this.state.partialUrlInput);
        this.setState({ partialUrlInput: "" } as BurgerMenuState);
    }

    removeUrl(url: string) {
    }

    setInput(newInput: string) {
        this.setState({ partialUrlInput: newInput } as BurgerMenuState);
    }
}