import React from 'react';

interface LinkPickerState {
}

interface LinkPickerProps {
}

export class LinkPicker extends React.Component {
    state: LinkPickerState;

    constructor(props: LinkPickerProps) {
        super(props);
        this.state = {} as LinkPickerState;
    }

    render() {
        // render list of links with buttons to add and remove
        return (
            <ul>
                <li>
                    <div className="">
                        <h4>Seznam zpravy</h4>
                        <ul>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="checkbox1"></input>
                                    <label className="form-check-label" htmlFor="checkbox1">Neuverite vlastnim ocim, doktori ho nenavidi</label>
                                </div>

                            </li>
                        </ul>
                    </div>

                </li>
            </ul>
        );
    }
}